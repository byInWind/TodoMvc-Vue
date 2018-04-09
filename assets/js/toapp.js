var tasklist = [
    {
        id: 1,
        name: '吃饭',
        isFinish: false,
        isEditing: true
    },
    {
        id: 2,
        name: '洗澡',
        isFinish: true,
        isEditing: false
    },
    {
        id: 3,
        name: '刷牙',
        isFinish: true,
        isEditing: false
    }
];

new Vue({
    el: "#app",
    data: {
        task: '',
        status: true,
        isSelected: 'all',
        tasklist:tasklist
    },
    computed: {},
    methods: {
        getData: function () {
            if (localStorage.getItem('tasklist')) {
                this.tasklist = angular.fromJson(localStorage.getItem('tasklist'))
            }
        },
        addTask: function () {
            //敲击了回车
            if (this.task) {
                this.tasklist.push({
                    id: this.tasklist + 1,
                    name: this.task.trim(),
                    isFinish: false,
                    isEditing: false
                })
            }
            this.task = ""
        },
        destroy: function (index) {
            //传入当前项
            this.tasklist.splice(index, 1);
        },
        unCompletedTasks: function () {
            var num = 0;
            angular.forEach(this.tasklist, function (item, index) {
                if (!item.isFinish) {
                    num++
                }
            })
            return num;
        },
        ctrlShow: function () {
            for (var i = 0; i < this.tasklist.length; i++) {
                if (this.tasklist[i].isFinish) {
                    return true;
                }
            }
        }, changeAllStatus: function () {
            for (var i = 0; i < this.tasklist.length; i++) {
                this.tasklist[i].isFinish = this.status;
            }
        }, updateStatus: function (index) {
            this.tasklist[index].isFinish = !this.tasklist[index].isFinish;
            for (var i = 0; i < this.tasklist.length; i++) {
                //有false 即true,每一项都是true,则false
                if (!this.tasklist[i].isFinish) {
                    this.status = true;
                } else {
                    this.status = false;
                }
            }
        }, edit: function (item) {
            item.isEditing = true
        }, cancelModify: function (item) {
            item.isEditing = false;
        }, filterTask: function (task) {
            switch (task) {
                case 'all':
                    this.isSelected = task;
                    this.condition = '';
                    break;
                case 'active':
                    this.isSelected = task;
                    this.condition = false;
                    break;
                case 'completed':
                    this.isSelected = task;
                    this.condition = true;
                    break;
            }
        }, clear: function () {
            for (var i = 0; i < this.tasklist.length; i++) {
                if (this.tasklist[i].isFinish) {
                    this.tasklist.splice(i, 1);
                    i--;
                }
            }
        }
    }
});