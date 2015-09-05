$(function() {

    var productModel = Backbone.Model.extend({
        urlRoot: "http://localhost/backbone/testpost.php",
        defaults: function ()
        {
            return {
                title: "новая задача",
                done: false
            };
        }
    });

    var MessageRouter = Backbone.Router.extend({

        routes: {
            "": "displayMessages"
        },

        displayMessages: function() {
            var msg = new productModel();
        }

    });

    var messageRouter = new MessageRouter();
    Backbone.history.start();


    var productCollect = Backbone.Collection.extend({
        model: productModel,
        url: "http://localhost/backbone/backquery.php",
        initialize: function() {

        }
    });
    var myProductCollect = new productCollect();

    var productView = Backbone.View.extend({

        tagName: "li",

        template: _.template($("#item-template").html()),

        events: {
            "click .delete-task"  : "deleteTask",
        },

        initialize: function() {

        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        deleteTask : function(){
            console.log("delete");
        }

    });

    var productsView = Backbone.View.extend({

        el: $("#my-product-block"),

        events: {
            "keypress #new-product":  "createOnEnter",
        },

        initialize: function() {
            this.input = this.$("#new-product");
            this.listenTo(myProductCollect, "add", this.addOne);
            this.listenTo(myProductCollect, 'all', this.render);
            myProductCollect.fetch();
        },

        addOne: function(productModel) {
            var view = new productView({model: productModel});
            $("#todo-list").append(view.render().el);
        },

        createOnEnter: function(e) {
            console.log("add ok2");
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;
            myProductCollect.add({title: this.input.val()});
            this.input.val("");
            var task = new productModel();
            var taskDetails = {
                title: this.input.val(),
            };
            task.save(taskDetails);
        },
    });

    var views = new productsView;

    myProductCollect.add([
        {title: "Задача 4"}
    ]);


});

var myTest = {
    get: function(){
        $.ajax({
            url:'http://localhost/backbone/backquery.php',
            type    : 'post',
            dataType: 'json',
            success: function(json){

                return json;
            }
        })
    },
    getF: function(){
        return 'test'
    }
}
