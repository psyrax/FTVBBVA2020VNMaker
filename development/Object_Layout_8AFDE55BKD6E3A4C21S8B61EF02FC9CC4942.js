// Generated by CoffeeScript 1.12.7
(function() {
  var Object_Layout,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Object_Layout = (function(superClass) {
    extend(Object_Layout, superClass);


    /**
    * A layout object defines a new UI layout game scene. A UI layout scene
    * displays in-game UI and let the user interact with it. For example: The
    * title screen, the game menu, etc. 
    *
    * @module gs
    * @class Object_Layout
    * @extends gs.Object_Base
    * @memberof gs
    * @constructor
     */

    function Object_Layout(layoutName) {
      var ref;
      Object_Layout.__super__.constructor.call(this);

      /**
      * Indicates that the UI layout is still in prepare-state and not ready.
      * @property preparing
      * @type boolean
       */
      this.preparing = true;

      /**
      * The layout descriptor.
      * @property layoutData
      * @type Object
       */
      this.layoutName = layoutName;
      this.layoutData = ui.UiFactory.layouts[layoutName];

      /**
      * The behavior-component for the UI layour specific behavior.
      * @property behavior
      * @type gs.Component_LayoutSceneBehavior
       */
      if ((ref = this.layoutData) != null ? ref.component : void 0) {
        this.behavior = new window[this.layoutData.component.ns || "gs"][this.layoutData.component.className];
      } else {
        this.behavior = new gs.Component_LayoutSceneBehavior();
      }

      /**
      * Indicates if the UI layout is visible.
      * @property visible
      * @type boolean
       */
      this.visible = true;

      /**
      * An event-emitter to emit events.
      * @property events
      * @type gs.Component_EventEmitter
       */
      this.events = new gs.Component_EventEmitter();
      this.addComponent(new gs.Component_InputHandler());
      this.addComponent(this.behavior);
    }

    return Object_Layout;

  })(gs.Object_Base);

  gs.Object_Layout = Object_Layout;

}).call(this);
