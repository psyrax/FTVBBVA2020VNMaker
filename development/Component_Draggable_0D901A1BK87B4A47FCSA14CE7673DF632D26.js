var Component_Draggable,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component_Draggable = (function(superClass) {
  extend(Component_Draggable, superClass);


  /**
  * Called if this object instance is restored from a data-bundle. It can be used
  * re-assign event-handler, anonymous functions, etc.
  *
  * @method onDataBundleRestore.
  * @param Object data - The data-bundle
  * @param gs.ObjectCodecContext context - The codec-context.
   */

  Component_Draggable.prototype.onDataBundleRestore = function(data, context) {
    return this.setupEventHandlers();
  };


  /**
  * Makes a game object draggable using mouse/touch. The dragging can be
  * vertical, horizontal or both. It can be configured as pixel-wise or
  * step-wise dragging. For example: To create a slider for UI with
  * fixed steps, step-wise is useful while a pixel-wise dragging could
  * be used for a volume-slider.
  *
  * @module gs
  * @class Component_Draggable
  * @extends gs.Component
  * @memberof gs
  * @constructor
   */

  function Component_Draggable() {

    /**
    * Mouse/Pointer x coordinate
    * @property mx
    * @type number
     */
    this.mx = 0;

    /**
    * Mouse/Pointer y coordinate
    * @property my
    * @type number
     */
    this.my = 0;

    /**
    * Stepping in pixels.
    * @property stepSize
    * @type gs.Point
     */
    this.stepSize = {
      x: 0,
      y: 0
    };

    /**
    * Drag Area
    * @property rect
    * @type gs.Rect
     */
    this.rect = null;
  }


  /**
  * Adds event-handler for mouse/touch events to update the component only if
  * a user-action happened.
  *
  * @method setupEventHandlers
   */

  Component_Draggable.prototype.setupEventHandlers = function() {
    gs.GlobalEventManager.on("mouseMoved", ((function(_this) {
      return function(e) {
        var rect, ref, x, y;
        rect = (ref = _this.object.draggable) != null ? ref.rect : void 0;
        x = Input.Mouse.x - _this.object.origin.x;
        y = Input.Mouse.y - _this.object.origin.y;
        if (_this.object.dragging || rect.contains(x, y)) {
          _this.object.needsUpdate = true;
          return e.breakChain = true;
        }
      };
    })(this)), null, this.object);
    gs.GlobalEventManager.on("mouseDown", ((function(_this) {
      return function(e) {
        var rect, ref, x, y;
        rect = _this.object.dstRect;
        x = Input.Mouse.x - _this.object.origin.x;
        y = Input.Mouse.y - _this.object.origin.y;
        if (rect.contains(x, y)) {
          _this.object.dragging = true;
          _this.object.needsUpdate = true;
          if ((ref = _this.object.events) != null) {
            ref.emit("dragStart", _this.object);
          }
          return e.breakChain = true;
        }
      };
    })(this)), null, this.object);
    return gs.GlobalEventManager.on("mouseUp", ((function(_this) {
      return function(e) {
        if (_this.object.dragging) {
          _this.object.needsUpdate = true;
          return e.breakChain = true;
        }
      };
    })(this)), null, this.object);
  };


  /**
  * Initializes the component. Adds event-handler for mouse/touch events to
  * update the component only if a user-action happened.
  *
  * @method setup
   */

  Component_Draggable.prototype.setup = function() {
    return this.setupEventHandlers();
  };


  /**
  * Disposes the component.
  *
  * @method dispose
   */

  Component_Draggable.prototype.dispose = function() {
    Component_Draggable.__super__.dispose.apply(this, arguments);
    gs.GlobalEventManager.offByOwner("mouseDown", this.object);
    return gs.GlobalEventManager.offByOwner("mouseMoved", this.object);
  };


  /**
  * Updates the dragging-process on x-axis if configured.
  *
  * @method updateAxisX
  * @protected
   */

  Component_Draggable.prototype.updateAxisX = function() {
    var ref;
    if ((ref = this.object.draggable.axisX) != null ? ref : true) {
      if (this.object.dragging) {
        this.object.draggable.step = Math.round(Math.max(this.rect.x, Math.min(this.mx - this.object.dstRect.width / 2, this.rect.x + this.rect.width - this.object.dstRect.width)) / this.stepSize.x);
        return this.object.dstRect.x = this.object.draggable.step * this.stepSize.x;
      } else if (this.object.draggable.steps != null) {
        return this.object.dstRect.x = this.object.draggable.step * this.stepSize.x;
      }
    }
  };


  /**
  * Updates the dragging-process on y-axis if configured.
  *
  * @method updateAxisY
  * @protected
   */

  Component_Draggable.prototype.updateAxisY = function() {
    var ref;
    if ((ref = this.object.draggable.axisY) != null ? ref : true) {
      if (this.object.dragging) {
        this.object.draggable.step = Math.round(Math.max(this.rect.y, Math.min(this.my - this.object.dstRect.height / 2, this.rect.y + this.rect.height - this.object.dstRect.height)) / this.stepSize.y);
        return this.object.dstRect.y = this.object.draggable.step * this.stepSize.y;
      } else if (this.object.draggable.steps != null) {
        return this.object.dstRect.y = this.object.draggable.step * this.stepSize.y;
      }
    }
  };


  /**
  * Calculates the size of a single step if steps are configured for this
  * component. Otherwise the step-size 1-pixel.
  *
  * @method updateDragging
  * @protected
   */

  Component_Draggable.prototype.updateStepSize = function() {
    if (this.object.draggable.steps != null) {
      this.stepSize.x = (this.rect.width - this.object.dstRect.width) / (this.object.draggable.steps - 1);
      return this.stepSize.y = (this.rect.height - this.object.dstRect.height) / (this.object.draggable.steps - 1);
    } else {
      this.stepSize.x = 1;
      return this.stepSize.y = 1;
    }
  };


  /**
  * Updates the game object's dragging-state and fires a dragged-event
  * if necessary.
  *
  * @method updateDragging
  * @protected
   */

  Component_Draggable.prototype.updateDragging = function() {
    var ref, x, y;
    if (this.object.focusable && !this.object.ui.focused) {
      return;
    }
    x = Input.Mouse.x - this.object.origin.x;
    y = Input.Mouse.y - this.object.origin.y;
    if (this.object.dragging) {
      if (this.mx !== x || this.my !== y) {
        this.object.events.emit("drag", this.object);
      }
      if (Input.Mouse.buttons[Input.Mouse.LEFT] === 2 || Input.Mouse.buttons[Input.Mouse.LEFT] === 0) {
        this.object.dragging = false;
        if ((ref = this.object.events) != null) {
          ref.emit("dragEnd", this.object);
        }
      }
    }
    this.mx = x;
    return this.my = y;
  };


  /**
  * Updates the dragging-logic.
  *
  * @method update
   */

  Component_Draggable.prototype.update = function() {
    var ref;
    this.rect = ((ref = this.object.draggable) != null ? ref.rect : void 0) || this.object.dstRect;
    this.updateStepSize();
    this.updateDragging();
    this.updateAxisX();
    return this.updateAxisY();
  };

  return Component_Draggable;

})(gs.Component);

ui.Draggable = Component_Draggable;

ui.Component_Draggable = Component_Draggable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUEsbUJBQUE7RUFBQTs7O0FBQU07Ozs7QUFDRjs7Ozs7Ozs7O2dDQVFBLG1CQUFBLEdBQXFCLFNBQUMsSUFBRCxFQUFPLE9BQVA7V0FDakIsSUFBQyxDQUFBLGtCQUFELENBQUE7RUFEaUI7OztBQUdyQjs7Ozs7Ozs7Ozs7Ozs7RUFhYSw2QkFBQTs7QUFDVDs7Ozs7SUFLQSxJQUFDLENBQUEsRUFBRCxHQUFNOztBQUVOOzs7OztJQUtBLElBQUMsQ0FBQSxFQUFELEdBQU07O0FBRU47Ozs7O0lBS0EsSUFBQyxDQUFBLFFBQUQsR0FBWTtNQUFFLENBQUEsRUFBRyxDQUFMO01BQVEsQ0FBQSxFQUFHLENBQVg7OztBQUVaOzs7OztJQUtBLElBQUMsQ0FBQSxJQUFELEdBQVE7RUEzQkM7OztBQTZCYjs7Ozs7OztnQ0FNQSxrQkFBQSxHQUFvQixTQUFBO0lBQ2hCLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUF0QixDQUF5QixZQUF6QixFQUF1QyxDQUFFLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxDQUFEO0FBQ3JDLFlBQUE7UUFBQSxJQUFBLCtDQUF3QixDQUFFO1FBQzFCLENBQUEsR0FBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQVosR0FBZ0IsS0FBQyxDQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbkMsQ0FBQSxHQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBWixHQUFnQixLQUFDLENBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFHLEtBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUixJQUFvQixJQUFJLENBQUMsUUFBTCxDQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBdkI7VUFDSSxLQUFDLENBQUEsTUFBTSxDQUFDLFdBQVIsR0FBc0I7aUJBQ3RCLENBQUMsQ0FBQyxVQUFGLEdBQWUsS0FGbkI7O01BSnFDO0lBQUEsQ0FBQSxDQUFBLENB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Q0FBcEIsS0FBeUMsQ0FBekMsSUFBOEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFRLENBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFaLENBQXBCLEtBQXlDLENBQTFGO1FBQ0ksSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLEdBQW1COzthQUNMLENBQUUsSUFBaEIsQ0FBcUIsU0FBckIsRUFBZ0MsSUFBQyxDQUFBLE1BQWpDO1NBRko7T0FISjs7SUFPQSxJQUFDLENBQUEsRUFBRCxHQUFNO1dBQ04sSUFBQyxDQUFBLEVBQUQsR0FBTTtFQWRNOzs7QUFnQmhCOzs7Ozs7Z0NBS0EsTUFBQSxHQUFRLFNBQUE7QUFDSixRQUFBO0lBQUEsSUFBQyxDQUFBLElBQUQsK0NBQXlCLENBQUUsY0FBbkIsSUFBMkIsSUFBQyxDQUFBLE1BQU0sQ0FBQztJQUMzQyxJQUFDLENBQUEsY0FBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGNBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxXQUFELENBQUE7V0FDQSxJQUFDLENBQUEsV0FBRCxDQUFBO0VBTEk7Ozs7R0F0THNCLEVBQUUsQ0FBQzs7QUFrTXJDLEVBQUUsQ0FBQyxTQUFILEdBQWU7O0FBQ2YsRUFBRSxDQUFDLG1CQUFILEdBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jXG4jICAgU2NyaXB0OiBDb21wb25lbnRfRHJhZ2dhYmxlXG4jXG4jICAgJCRDT1BZUklHSFQkJFxuI1xuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5jbGFzcyBDb21wb25lbnRfRHJhZ2dhYmxlIGV4dGVuZHMgZ3MuQ29tcG9uZW50XG4gICAgIyMjKlxuICAgICogQ2FsbGVkIGlmIHRoaXMgb2JqZWN0IGluc3RhbmNlIGlzIHJlc3RvcmVkIGZyb20gYSBkYXRhLWJ1bmRsZS4gSXQgY2FuIGJlIHVzZWRcbiAgICAqIHJlLWFzc2lnbiBldmVudC1oYW5kbGVyLCBhbm9ueW1vdXMgZnVuY3Rpb25zLCBldGMuXG4gICAgKlxuICAgICogQG1ldGhvZCBvbkRhdGFCdW5kbGVSZXN0b3JlLlxuICAgICogQHBhcmFtIE9iamVjdCBkYXRhIC0gVGhlIGRhdGEtYnVuZGxlXG4gICAgKiBAcGFyYW0gZ3MuT2JqZWN0Q29kZWNDb250ZXh0IGNvbnRleHQgLSBUaGUgY29kZWMtY29udGV4dC5cbiAgICAjIyNcbiAgICBvbkRhdGFCdW5kbGVSZXN0b3JlOiAoZGF0YSwgY29udGV4dCkgLT5cbiAgICAgICAgQHNldHVwRXZlbnRIYW5kbGVycygpXG5cbiAgICAjIyMqXG4gICAgKiBNYWtlcyBhIGdhbWUgb2JqZWN0IGRyYWdnYWJsZSB1c2luZyBtb3VzZS90b3VjaC4gVGhlIGRyYWdnaW5nIGNhbiBiZVxuICAgICogdmVydGljYWwsIGhvcml6b250YWwgb3IgYm90aC4gSXQgY2FuIGJlIGNvbmZpZ3VyZWQgYXMgcGl4ZWwtd2lzZSBvclxuICAgICogc3RlcC13aXNlIGRyYWdnaW5nLiBGb3IgZXhhbXBsZTogVG8gY3JlYXRlIGEgc2xpZGVyIGZvciBVSSB3aXRoXG4gICAgKiBmaXhlZCBzdGVwcywgc3RlcC13aXNlIGlzIHVzZWZ1bCB3aGlsZSBhIHBpeGVsLXdpc2UgZHJhZ2dpbmcgY291bGRcbiAgICAqIGJlIHVzZWQgZm9yIGEgdm9sdW1lLXNsaWRlci5cbiAgICAqXG4gICAgKiBAbW9kdWxlIGdzXG4gICAgKiBAY2xhc3MgQ29tcG9uZW50X0RyYWdnYWJsZVxuICAgICogQGV4dGVuZHMgZ3MuQ29tcG9uZW50XG4gICAgKiBAbWVtYmVyb2YgZ3NcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICMjI1xuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICAjIyMqXG4gICAgICAgICogTW91c2UvUG9pbnRlciB4IGNvb3JkaW5hdGVcbiAgICAgICAgKiBAcHJvcGVydHkgbXhcbiAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgIyMjXG4gICAgICAgIEBteCA9IDBcblxuICAgICAgICAjIyMqXG4gICAgICAgICogTW91c2UvUG9pbnRlciB5IGNvb3JkaW5hdGVcbiAgICAgICAgKiBAcHJvcGVydHkgbXlcbiAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgIyMjXG4gICAgICAgIEBteSA9IDBcblxuICAgICAgICAjIyMqXG4gICAgICAgICogU3RlcHBpbmcgaW4gcGl4ZWxzLlxuICAgICAgICAqIEBwcm9wZXJ0eSBzdGVwU2l6ZVxuICAgICAgICAqIEB0eXBlIGdzLlBvaW50XG4gICAgICAgICMjI1xuICAgICAgICBAc3RlcFNpemUgPSB7IHg6IDAsIHk6IDAgfVxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBEcmFnIEFyZWFcbiAgICAgICAgKiBAcHJvcGVydHkgcmVjdFxuICAgICAgICAqIEB0eXBlIGdzLlJlY3RcbiAgICAgICAgIyMjXG4gICAgICAgIEByZWN0ID0gbnVsbFxuXG4gICAgIyMjKlxuICAgICogQWRkcyBldmVudC1oYW5kbGVyIGZvciBtb3VzZS90b3VjaCBldmVudHMgdG8gdXBkYXRlIHRoZSBjb21wb25lbnQgb25seSBpZlxuICAgICogYSB1c2VyLWFjdGlvbiBoYXBwZW5lZC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNldHVwRXZlbnRIYW5kbGVyc1xuICAgICMjI1xuICAgIHNldHVwRXZlbnRIYW5kbGVyczogLT5cbiAgICAgICAgZ3MuR2xvYmFsRXZlbnRNYW5hZ2VyLm9uIFwibW91c2VNb3ZlZFwiLCAoIChlKSA9PlxuICAgICAgICAgICAgcmVjdCA9IEBvYmplY3QuZHJhZ2dhYmxlPy5yZWN0XG4gICAgICAgICAgICB4ID0gSW5wdXQuTW91c2UueCAtIEBvYmplY3Qub3JpZ2luLnhcbiAgICAgICAgICAgIHkgPSBJbnB1dC5Nb3VzZS55IC0gQG9iamVjdC5vcmlnaW4ueVxuICAgICAgICAgICAgaWYgQG9iamVjdC5kcmFnZ2luZyBvciByZWN0LmNvbnRhaW5zKHgsIHkpXG4gICAgICAgICAgICAgICAgQG9iamVjdC5uZWVkc1VwZGF0ZSA9IHllc1xuICAgICAgICAgICAgICAgIGUuYnJlYWtDaGFpbiA9IHllc1xuXG4gICAgICAgICksIG51bGwsIEBvYmplY3RcblxuICAgICAgICBncy5HbG9iYWxFdmVudE1hbmFnZXIub24gXCJtb3VzZURvd25cIiwoIChlKSA9PlxuICAgICAgICAgICAgcmVjdCA9IEBvYmplY3QuZHN0UmVjdFxuICAgICAgICAgICAgeCA9IElucHV0Lk1vdXNlLnggLSBAb2JqZWN0Lm9yaWdpbi54XG4gICAgICAgICAgICB5ID0gSW5wdXQuTW91c2UueSAtIEBvYmplY3Qub3JpZ2luLnlcbiAgICAgICAgICAgIGlmIHJlY3QuY29udGFpbnMoeCwgeSlcbiAgICAgICAgICAgICAgICBAb2JqZWN0LmRyYWdnaW5nID0geWVzXG4gICAgICAgICAgICAgICAgQG9iamVjdC5uZWVkc1VwZGF0ZSA9IHllc1xuICAgICAgICAgICAgICAgIEBvYmplY3QuZXZlbnRzPy5lbWl0KFwiZHJhZ1N0YXJ0XCIsIEBvYmplY3QpXG4gICAgICAgICAgICAgICAgZS5icmVha0NoYWluID0geWVzXG5cblxuICAgICAgICApLCBudWxsLCBAb2JqZWN0XG5cbiAgICAgICAgZ3MuR2xvYmFsRXZlbnRNYW5hZ2VyLm9uIFwibW91c2VVcFwiLCggKGUpID0+XG4gICAgICAgICAgICBpZiBAb2JqZWN0LmRyYWdnaW5nXG4gICAgICAgICAgICAgICAgQG9iamVjdC5uZWVkc1VwZGF0ZSA9IHllc1xuICAgICAgICAgICAgICAgIGUuYnJlYWtDaGFpbiA9IHllc1xuXG4gICAgICAgICksIG51bGwsIEBvYmplY3RcblxuICAgICMjIypcbiAgICAqIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQuIEFkZHMgZXZlbnQtaGFuZGxlciBmb3IgbW91c2UvdG91Y2ggZXZlbnRzIHRvXG4gICAgKiB1cGRhdGUgdGhlIGNvbXBvbmVudCBvbmx5IGlmIGEgdXNlci1hY3Rpb24gaGFwcGVuZWQuXG4gICAgKlxuICAgICogQG1ldGhvZCBzZXR1cFxuICAgICMjI1xuICAgIHNldHVwOiAtPlxuICAgICAgICBAc2V0dXBFdmVudEhhbmRsZXJzKClcblxuICAgICMjIypcbiAgICAqIERpc3Bvc2VzIHRoZSBjb21wb25lbnQuXG4gICAgKlxuICAgICogQG1ldGhvZCBkaXNwb3NlXG4gICAgIyMjXG4gICAgZGlzcG9zZTogLT5cbiAgICAgICAgc3VwZXJcblxuICAgICAgICBncy5HbG9iYWxFdmVudE1hbmFnZXIub2ZmQnlPd25lcihcIm1vdXNlRG93blwiLCBAb2JqZWN0KVxuICAgICAgICBncy5HbG9iYWxFdmVudE1hbmFnZXIub2ZmQnlPd25lcihcIm1vdXNlTW92ZWRcIiwgQG9iamVjdClcblxuICAgICMjIypcbiAgICAqIFVwZGF0ZXMgdGhlIGRyYWdnaW5nLXByb2Nlc3Mgb24geC1heGlzIGlmIGNvbmZpZ3VyZWQuXG4gICAgKlxuICAgICogQG1ldGhvZCB1cGRhdGVBeGlzWFxuICAgICogQHByb3RlY3RlZFxuICAgICMjI1xuICAgIHVwZGF0ZUF4aXNYOiAtPlxuICAgICAgICBpZiAoQG9iamVjdC5kcmFnZ2FibGUuYXhpc1ggPyB5ZXMpXG4gICAgICAgICAgICBpZiBAb2JqZWN0LmRyYWdnaW5nXG4gICAgICAgICAgICAgICAgQG9iamVjdC5kcmFnZ2FibGUuc3RlcCA9IE1hdGgucm91bmQoTWF0aC5tYXgoQHJlY3QueCwgTWF0aC5taW4oKEBteCAtIEBvYmplY3QuZHN0UmVjdC53aWR0aCAvIDIpLCBAcmVjdC54K0ByZWN0LndpZHRoLUBvYmplY3QuZHN0UmVjdC53aWR0aCkpIC8gQHN0ZXBTaXplLngpXG4gICAgICAgICAgICAgICAgQG9iamVjdC5kc3RSZWN0LnggPSBAb2JqZWN0LmRyYWdnYWJsZS5zdGVwICogQHN0ZXBTaXplLnhcbiAgICAgICAgICAgIGVsc2UgaWYgQG9iamVjdC5kcmFnZ2FibGUuc3RlcHM/XG4gICAgICAgICAgICAgICAgQG9iamVjdC5kc3RSZWN0LnggPSBAb2JqZWN0LmRyYWdnYWJsZS5zdGVwICogQHN0ZXBTaXplLnhcblxuICAgICMjIypcbiAgICAqIFVwZGF0ZXMgdGhlIGRyYWdnaW5nLXByb2Nlc3Mgb24geS1heGlzIGlmIGNvbmZpZ3VyZWQuXG4gICAgKlxuICAgICogQG1ldGhvZCB1cGRhdGVBeGlzWVxuICAgICogQHByb3RlY3RlZFxuICAgICMjI1xuICAgIHVwZGF0ZUF4aXNZOiAtPlxuICAgICAgICBpZiAoQG9iamVjdC5kcmFnZ2FibGUuYXhpc1kgPyB5ZXMpXG4gICAgICAgICAgICBpZiBAb2JqZWN0LmRyYWdnaW5nXG4gICAgICAgICAgICAgICAgQG9iamVjdC5kcmFnZ2FibGUuc3RlcCA9IE1hdGgucm91bmQoTWF0aC5tYXgoQHJlY3QueSwgTWF0aC5taW4oKEBteSAtIEBvYmplY3QuZHN0UmVjdC5oZWlnaHQgLyAyKSwgQHJlY3QueStAcmVjdC5oZWlnaHQtQG9iamVjdC5kc3RSZWN0LmhlaWdodCkpIC8gQHN0ZXBTaXplLnkpXG4gICAgICAgICAgICAgICAgQG9iamVjdC5kc3RSZWN0LnkgPSBAb2JqZWN0LmRyYWdnYWJsZS5zdGVwICogQHN0ZXBTaXplLnlcbiAgICAgICAgICAgIGVsc2UgaWYgQG9iamVjdC5kcmFnZ2FibGUuc3RlcHM/XG4gICAgICAgICAgICAgICAgQG9iamVjdC5kc3RSZWN0LnkgPSBAb2JqZWN0LmRyYWdnYWJsZS5zdGVwICogQHN0ZXBTaXplLnlcblxuICAgICMjIypcbiAgICAqIENhbGN1bGF0ZXMgdGhlIHNpemUgb2YgYSBzaW5nbGUgc3RlcCBpZiBzdGVwcyBhcmUgY29uZmlndXJlZCBmb3IgdGhpc1xuICAgICogY29tcG9uZW50LiBPdGhlcndpc2UgdGhlIHN0ZXAtc2l6ZSAxLXBpeGVsLlxuICAgICpcbiAgICAqIEBtZXRob2QgdXBkYXRlRHJhZ2dpbmdcbiAgICAqIEBwcm90ZWN0ZWRcbiAgICAjIyNcbiAgICB1cGRhdGVTdGVwU2l6ZTogLT5cbiAgICAgICAgaWYgQG9iamVjdC5kcmFnZ2FibGUuc3RlcHM/XG4gICAgICAgICAgICBAc3RlcFNpemUueCA9IChAcmVjdC53aWR0aC1Ab2JqZWN0LmRzdFJlY3Qud2lkdGgpIC8gKEBvYmplY3QuZHJhZ2dhYmxlLnN0ZXBzLTEpXG4gICAgICAgICAgICBAc3RlcFNpemUueSA9IChAcmVjdC5oZWlnaHQtQG9iamVjdC5kc3RSZWN0LmhlaWdodCkgLyAoQG9iamVjdC5kcmFnZ2FibGUuc3RlcHMtMSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQHN0ZXBTaXplLnggPSAxXG4gICAgICAgICAgICBAc3RlcFNpemUueSA9IDFcblxuICAgICMjIypcbiAgICAqIFVwZGF0ZXMgdGhlIGdhbWUgb2JqZWN0J3MgZHJhZ2dpbmctc3RhdGUgYW5kIGZpcmVzIGEgZHJhZ2dlZC1ldmVudFxuICAgICogaWYgbmVjZXNzYXJ5LlxuICAgICpcbiAgICAqIEBtZXRob2QgdXBkYXRlRHJhZ2dpbmdcbiAgICAqIEBwcm90ZWN0ZWRcbiAgICAjIyNcbiAgICB1cGRhdGVEcmFnZ2luZzogLT5cbiAgICAgICAgaWYgQG9iamVjdC5mb2N1c2FibGUgYW5kICFAb2JqZWN0LnVpLmZvY3VzZWQgdGhlbiByZXR1cm5cblxuICAgICAgICB4ID0gSW5wdXQuTW91c2UueCAtIEBvYmplY3Qub3JpZ2luLnhcbiAgICAgICAgeSA9IElucHV0Lk1vdXNlLnkgLSBAb2JqZWN0Lm9yaWdpbi55XG5cbiAgICAgICAgaWYgQG9iamVjdC5kcmFnZ2luZ1xuICAgICAgICAgICAgaWYgKEBteCAhPSB4IG9yIEBteSAhPSB5KVxuICAgICAgICAgICAgICAgIEBvYmplY3QuZXZlbnRzLmVtaXQoXCJkcmFnXCIsIEBvYmplY3QpXG4gICAgICAgICAgICBpZiBJbnB1dC5Nb3VzZS5idXR0b25zW0lucHV0Lk1vdXNlLkxFRlRdID09IDIgb3IgSW5wdXQuTW91c2UuYnV0dG9uc1tJbnB1dC5Nb3VzZS5MRUZUXSA9PSAwXG4gICAgICAgICAgICAgICAgQG9iamVjdC5kcmFnZ2luZyA9IG5vXG4gICAgICAgICAgICAgICAgQG9iamVjdC5ldmVudHM/LmVtaXQoXCJkcmFnRW5kXCIsIEBvYmplY3QpXG5cbiAgICAgICAgQG14ID0geFxuICAgICAgICBAbXkgPSB5XG5cbiAgICAjIyMqXG4gICAgKiBVcGRhdGVzIHRoZSBkcmFnZ2luZy1sb2dpYy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICMjI1xuICAgIHVwZGF0ZTogLT5cbiAgICAgICAgQHJlY3QgPSBAb2JqZWN0LmRyYWdnYWJsZT8ucmVjdCB8fCBAb2JqZWN0LmRzdFJlY3RcbiAgICAgICAgQHVwZGF0ZVN0ZXBTaXplKClcbiAgICAgICAgQHVwZGF0ZURyYWdnaW5nKClcbiAgICAgICAgQHVwZGF0ZUF4aXNYKClcbiAgICAgICAgQHVwZGF0ZUF4aXNZKClcblxuXG5cblxuXG5cbnVpLkRyYWdnYWJsZSA9IENvbXBvbmVudF9EcmFnZ2FibGVcbnVpLkNvbXBvbmVudF9EcmFnZ2FibGUgPSBDb21wb25lbnRfRHJhZ2dhYmxlIl19
//# sourceURL=Component_Draggable_44.js