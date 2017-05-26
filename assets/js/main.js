import Vue from 'vue'
var demo = new Vue({
    el: '#main',
    data: {
        numbers: [],
        target: 0,
        length: 0,
        result: []
    },
    methods: {
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
                    var temp = "";
                    for (var j = 0; j < len; j++) {
                        if (choices[j] == 1) {
                            temp += demo.numbers[j].income;
                            temp += " ";
                        }
                    }
                    demo.result.push(temp);
                }
            }
        }
    }

})