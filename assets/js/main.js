import Vue from 'vue'
Vue.directive('focus', {
    // When the bound element is inserted into the DOM...
    inserted: function(el) {
        // Focus the element
        el.focus()
        el.select()
    }
});

var demo = new Vue({
    el: '#main',
    data: {
        numbers: [{
            id: 0,
            income: 0
        }],
        target: 0,
        length: 0,
        focus: 0,
        result: [],
        finished: false
    },
    methods: {
        nextNumber: function(income) {
            if (income.income == 0) {
                demo.numbers.pop()
                demo.finished = true
            } else {
                demo.numbers.push({
                    id: income.id + 1,
                    income: 0
                })
            }
        },
        createNumbers: function(len) {
            console.log(len);
            demo.numbers = []
            for (var i = 0; i < len; i++) {
                demo.numbers.push({
                    id: i,
                    income: 0
                });
            }
            console.log(demo.numbers);
        },
        permutation: function() {
            var len = demo.numbers.length;
            while (demo.result.length > 0) {
                demo.result.pop()
            }
            console.log(demo.numbers);
            var margin = (2 << (len - 1)) - 1;
            var choices = [];
            for (var perm = 0; perm <= margin; perm++) {
                while (choices.length > 0) {
                    choices.pop();
                }
                for (var j = 0; j < len; j++) {
                    choices.push(0);
                }
                var j = 0;
                var i = parseInt(perm);
                while (i >= 1) {
                    if (i % 2 == 1) {
                        choices[j] = 1;
                    }
                    if (i == 1) {
                        break;
                    }
                    i = parseInt(i / 2);
                    j++;
                }
                var sum = 0;
                for (var j = 0; j < len; j++) {
                    if (choices[j] == 1) {
                        sum += parseInt(demo.numbers[j].income);
                    }
                }
                if (sum == demo.target) {
                    var temp = sum.toString() + "=";
                    var choices_filtered = choices.filter(function(element) {
                        return element == 1;
                    })
                    var plusNumber = choices_filtered.length - 1;
                    for (var j = 0; j < len; j++) {
                        if (choices[j] == 1) {
                            temp += demo.numbers[j].income;
                            if (plusNumber > 0) {
                                temp += "+";
                                plusNumber--;
                            }
                        }
                    }
                    demo.result.push(temp);
                }
            }
            if (demo.result.length == 0) {
                demo.result.push("没有找到结果!");
            }
        }
    }

})