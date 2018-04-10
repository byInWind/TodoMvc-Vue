var tasklist = [
    {
        id: 1,
        name: '吃饭',
        isFinish: false,
        isEditing: false
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
        isSelected: 'all',
        tasklist: JSON.parse(window.localStorage.getItem('tasklist') || '[]')
    },
    methods: {
        addTask: function () {
            if (this.task.trim()) {
                this.tasklist.push({
                    id: this.tasklist.length + 1,
                    name: this.task.trim(),
                    isFinish: false,
                    isEditing: false
                });
            }
            this.task = ""
        },
        destroy: function (index) {
            //传入当前项
            this.tasklist.splice(index, 1);
            window.localStorage.setItem('tasklist',JSON.stringify(tasklist));

        }, changeAllStatus: function (e) {
            this.tasklist.forEach(item => item.isFinish = e.target.checked)
        }, edit: function (item) {
            this.tasklist.forEach(item => item.isEditing = false)
            ;
            item.isEditing = true;
        }, saveEdit: function (item, index, e) {
            if (!(item.name).trim()) {
                this.tasklist.splice(index, 1);
            }
            item.name = e.target.value
            item.isEditing = false;
        }, cancelEdit: function (item) {
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
            //清空已完成 foreach会报错
            //1
            for (var i=0;i<this.tasklist.length;i++){
                if(this.tasklist[i].isFinish){
                    this.tasklist.splice(i,1);
                    i--
                }
            }
            //2
            // this.tasklist = this.tasklist.filter(item => !item.isFinish)
        }
    },
    computed:{
        showOrhide: {
            get: function () {
                return  this.tasklist.filter(item => !item.isFinish).length;
            },
            set: function(){

            }
        },
        toggleAllStatus:function () {
            return this.tasklist.every( item => item.isFinish )
        }
    },
    created:function () {
        console.log('the Vue have created')
    },
    watch:{
        tasklist: {
            handler: function () {
                window.localStorage.setItem('tasklist',JSON.stringify(this.tasklist));
            },
            deep: true   //对象需要深度监视
        }
    }
});