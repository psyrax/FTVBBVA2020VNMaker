var Component_HotspotBehavior, HotspotShape,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

HotspotShape = (function() {
  function HotspotShape() {}

  HotspotShape.RECTANGLE = "rect";

  HotspotShape.PIXEL = "pixel";

  return HotspotShape;

})();

gs.HotspotShape = HotspotShape;

Component_HotspotBehavior = (function(superClass) {
  extend(Component_HotspotBehavior, superClass);


  /**
  * Called if this object instance is restored from a data-bundle. It can be used
  * re-assign event-handler, anonymous functions, etc.
  *
  * @method onDataBundleRestore.
  * @param Object data - The data-bundle
  * @param gs.ObjectCodecContext context - The codec-context.
   */

  Component_HotspotBehavior.prototype.onDataBundleRestore = function(data, context) {
    return this.setupEventHandlers();
  };


  /**
  * Adds a hotspot-behavior to a game object. That allows a game object
  * to respond to mouse/touch actions by firing an action-event or changing
  * the game object's image.
  *
  * @module gs
  * @class Component_HotspotBehavior
  * @extends gs.Component
  * @memberof gs
  * @constructor
   */

  function Component_HotspotBehavior(params) {

    /**
    * The shape used to detect if a hotspot is clicked, hovered, etc.
    * @property shape
    * @type boolean
     */
    var ref;
    this.shape = gs.HotspotShape.RECTANGLE;

    /**
    * Indicates if the hotspot is selected.
    * @property selected
    * @type boolean
     */
    this.selected = false;

    /**
    * Indicates if the hotspot is enabled.
    * @property enabled
    * @type boolean
     */
    this.enabled = true;

    /**
    * @property imageHandling
    * @type number
    * @protected
     */
    this.imageHandling = 0;

    /**
    * Indicates if the mouse/touch pointer is inside the hotspot bounds.
    * @property contains
    * @type boolean
    * @protected
     */
    this.containsPointer = false;

    /**
    * Indicates if the action-button was pressed before.
    * @property buttonUp
    * @type boolean
    * @protected
     */
    this.buttonUp = false;

    /**
    * Indicates if the action-button is pressed.
    * @property buttonDown
    * @type boolean
    * @protected
     */
    this.buttonDown = false;

    /**
    * @property actionButtons
    * @type Object
    * @protected
     */
    this.actionButtons = {
      "left": Input.Mouse.BUTTON_LEFT,
      "right": Input.Mouse.BUTTON_RIGHT,
      "middle": Input.Mouse.BUTTON_MIDDLE
    };

    /**
    * The default action-button. By default the left-button is used.
    *
    * @property actionButton
    * @type number
     */
    this.actionButton = this.actionButtons[(ref = params != null ? params.actionButton : void 0) != null ? ref : "left"];

    /**
    * The sound played if the hotspot action is executed.
    * @property sound
    * @type Object
     */
    this.sound = params != null ? params.sound : void 0;

    /**
    * <p>The sounds played depending on the hotspot state.</p>
    * <ul>
    * <li>0 = Select Sound</li>
    * <li>1 = Unselect Sound</li>
    * </ul>
    * @property sounds
    * @type Object[]
     */
    this.sounds = (params != null ? params.sounds : void 0) || [];
  }


  /**
  * Gets the render-index of the object associated with the hotspot component. This
  * implementation is necessary to be able to act as an owner for gs.EventEmitter.on
  * event registration.
  *
  * @property rIndex
  * @type number
   */

  Component_HotspotBehavior.accessors("rIndex", {
    get: function() {
      var ref;
      return ((ref = this.object.target) != null ? ref.rIndex : void 0) || this.object.rIndex;
    }
  });


  /**
  * Sets up event handlers.
  *
  * @method setupEventHandlers
   */

  Component_HotspotBehavior.prototype.setupEventHandlers = function() {
    gs.GlobalEventManager.offByOwner("mouseUp", this);
    gs.GlobalEventManager.offByOwner("mouseMoved", this);
    gs.GlobalEventManager.on("hotspotDrop", ((function(_this) {
      return function(e) {
        var hotspot, j, len, rect, ref, results, scene;
        scene = SceneManager.scene;
        ref = scene.hotspots;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          hotspot = ref[j];
          rect = e.sender.dstRect;
          if ((hotspot != null) && hotspot !== e.sender && hotspot.dstRect.contains(Input.Mouse.x, Input.Mouse.y)) {
            results.push(hotspot.events.emit("dropReceived", hotspot));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
    })(this)), null, this);
    gs.GlobalEventManager.on("mouseUp", ((function(_this) {
      return function(e) {
        var contains, mx, my;
        if (!_this.object.visible) {
          return;
        }
        mx = Input.Mouse.x - _this.object.origin.x;
        my = Input.Mouse.y - _this.object.origin.y;
        contains = Rect.contains(_this.object.dstRect.x, _this.object.dstRect.y, _this.object.dstRect.width, _this.object.dstRect.height, mx, my);
        if (contains) {
          contains = _this.checkShape(mx - _this.object.dstRect.x, my - _this.object.dstRect.y);
          if (contains) {
            _this.containsPointer = contains;
            _this.updateInput();
            _this.updateEvents();
            _this.object.needsUpdate = true;
            return e.breakChain = true;
          }
        }
      };
    })(this)), null, this);
    if (this.object.images || true) {
      return gs.GlobalEventManager.on("mouseMoved", ((function(_this) {
        return function(e) {
          var contains, mx, my;
          if (!_this.object.visible) {
            return;
          }
          contains = Rect.contains(_this.object.dstRect.x, _this.object.dstRect.y, _this.object.dstRect.width, _this.object.dstRect.height, Input.Mouse.x - _this.object.origin.x, Input.Mouse.y - _this.object.origin.y);
          if (contains) {
            mx = Input.Mouse.x - _this.object.origin.x;
            my = Input.Mouse.y - _this.object.origin.y;
            contains = _this.checkShape(mx - _this.object.dstRect.x, my - _this.object.dstRect.y);
          }
          if (_this.containsPointer !== contains) {
            _this.containsPointer = contains;
            _this.object.needsUpdate = true;
            if (contains) {
              _this.object.events.emit("enter", _this);
            } else {
              _this.object.events.emit("leave", _this);
            }
          }
          return _this.updateInput();
        };
      })(this)), null, this);
    }
  };


  /**
  * Initializes the hotspot component.
  *
  * @method setup
   */

  Component_HotspotBehavior.prototype.setup = function() {
    var i, j, len, ref, sound;
    Component_HotspotBehavior.__super__.setup.apply(this, arguments);
    this.sound = ui.Component_FormulaHandler.fieldValue(this.object, this.sound);
    if (this.sounds != null) {
      ref = this.sounds;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        sound = ref[i];
        this.sounds[i] = ui.Component_FormulaHandler.fieldValue(this.object, sound);
      }
    } else {
      this.sounds = [];
    }
    return this.setupEventHandlers();
  };


  /**
  * Disposes the component.
  *
  * @method dispose
   */

  Component_HotspotBehavior.prototype.dispose = function() {
    Component_HotspotBehavior.__super__.dispose.apply(this, arguments);
    gs.GlobalEventManager.offByOwner("mouseUp", this);
    return gs.GlobalEventManager.offByOwner("mouseMoved", this);
  };


  /**
  * Checks if the specified point is inside of the hotspot's shape.
  *
  * @method checkShape
  * @param x - The x-coordinate of the point.
  * @param y - The y-coordinate of the point.
  * @return If <b>true</b> the point is inside of the hotspot's shape. Otherwise <b>false</b>.
   */

  Component_HotspotBehavior.prototype.checkShape = function(x, y) {
    var ref, result;
    result = true;
    switch (this.shape) {
      case gs.HotspotShape.PIXEL:
        if (this.object.bitmap) {
          result = this.object.bitmap.isPixelSet(x, y);
        } else {
          result = (ref = this.object.target) != null ? ref.bitmap.isPixelSet(x, y) : void 0;
        }
    }
    return result;
  };


  /**
  * Updates the image depending on the hotspot state.
  *
  * @method updateImage
  * @protected
   */

  Component_HotspotBehavior.prototype.updateImage = function() {
    var baseImage, object;
    object = this.object.target || this.object;
    if (this.object.images != null) {
      baseImage = this.enabled ? this.object.images[4] || this.object.images[0] : this.object.images[0];
      if (this.containsPointer) {
        if (this.object.selected || this.selected) {
          object.image = this.object.images[3] || this.object.images[2] || baseImage;
        } else {
          object.image = this.object.images[1] || baseImage;
        }
      } else {
        if (this.object.selected || this.selected) {
          object.image = this.object.images[2] || this.object.images[4] || baseImage;
        } else {
          object.image = baseImage;
        }
      }
      if (!object.image) {
        return object.bitmap = null;
      }
    }
  };


  /**
  * Updates the hotspot position and size from an other target game object. For example,
  * that is useful for adding a hotspot to an other moving game object.
  *
  * @method updateFromTarget
  * @protected
   */

  Component_HotspotBehavior.prototype.updateFromTarget = function() {
    if (this.object.target != null) {
      this.object.rIndex = this.object.target.rIndex;
      this.object.dstRect.x = this.object.target.dstRect.x;
      this.object.dstRect.y = this.object.target.dstRect.y;
      this.object.dstRect.width = this.object.target.dstRect.width;
      this.object.dstRect.height = this.object.target.dstRect.height;
      this.object.offset.x = this.object.target.offset.x;
      this.object.offset.y = this.object.target.offset.y;
      this.object.origin.x = this.object.target.origin.x;
      return this.object.origin.y = this.object.target.origin.y;
    }
  };


  /**
  * Updates the event-handling and fires necessary events.
  *
  * @method updateEvents
  * @protected
   */

  Component_HotspotBehavior.prototype.updateEvents = function() {
    var group, j, len, object;
    if (this.buttonUp && this.object.enabled && this.enabled && this.object.visible) {
      if (this.object.selectable) {
        group = gs.ObjectManager.current.objectsByGroup(this.object.group);
        for (j = 0, len = group.length; j < len; j++) {
          object = group[j];
          if (object !== this.object) {
            object.selected = false;
          }
        }
        if (this.object.group) {
          this.selected = true;
        } else {
          this.selected = !this.selected;
        }
        if (this.selected) {
          AudioManager.playSound(this.sounds[0] || this.sound);
        } else {
          AudioManager.playSound(this.sounds[1] || this.sound);
        }
        this.object.events.emit("click", this);
        return this.object.events.emit("stateChanged", this.object);
      } else {
        AudioManager.playSound(this.sounds[0] || this.sound);
        this.object.events.emit("click", this);
        return this.object.events.emit("action", this);
      }
    }
  };


  /**
  * Updates the game object's color depending on the state of the hotspot.
  *
  * @method updateColor
  * @protected
   */

  Component_HotspotBehavior.prototype.updateColor = function() {
    if (!this.object.enabled) {
      return this.object.color.set(0, 0, 0, 100);
    } else {
      return this.object.color.set(0, 0, 0, 0);
    }
  };


  /**
  * Stores current states of mouse/touch pointer and buttons.
  *
  * @method updateInput
  * @protected
   */

  Component_HotspotBehavior.prototype.updateInput = function() {
    this.buttonUp = Input.Mouse.buttons[this.actionButton] === 2 && this.containsPointer;
    return this.buttonDown = Input.Mouse.buttons[this.actionButton] === 1 && this.containsPointer;
  };


  /**
  * Updates the hotspot component.
  *
  * @method update
   */

  Component_HotspotBehavior.prototype.update = function() {
    if (!this.object.visible) {
      return;
    }
    this.updateColor();
    this.updateFromTarget();
    return this.updateImage();
  };

  return Component_HotspotBehavior;

})(gs.Component);

gs.Component_HotspotBehavior = Component_HotspotBehavior;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLElBQUEsdUNBQUE7RUFBQTs7O0FBQU07OztFQUNGLFlBQUMsQ0FBQSxTQUFELEdBQWE7O0VBQ2IsWUFBQyxDQUFBLEtBQUQsR0FBUzs7Ozs7O0FBQ2IsRUFBRSxDQUFDLFlBQUgsR0FBa0I7O0FBRVo7Ozs7QUFDRjs7Ozs7Ozs7O3NDQVFBLG1CQUFBLEdBQXFCLFNBQUMsSUFBRCxFQUFPLE9BQVA7V0FDakIsSUFBQyxDQUFBLGtCQUFELENBQUE7RUFEaUI7OztBQUdyQjs7Ozs7Ozs7Ozs7O0VBV2EsbUNBQUMsTUFBRDs7QUFDVDs7Ozs7QUFBQSxRQUFBO0lBS0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDOztBQUV6Qjs7Ozs7SUFLQSxJQUFDLENBQUEsUUFBRCxHQUFZOztBQUVaOzs7OztJQUtBLElBQUMsQ0FBQSxPQUFELEdBQVc7O0FBRVg7Ozs7O0lBS0EsSUFBQyxDQUFBLGFBQUQsR0FBaUI7O0FBRWpCOzs7Ozs7SUFNQSxJQUFDLENBQUEsZUFBRCxHQUFtQjs7QUFFbkI7Ozs7OztJQU1BLElBQUMsQ0FBQSxRQUFELEdBQVk7O0FBRVo7Ozs7OztJQU1BLElBQUMsQ0FBQSxVQUFELEdBQWM7O0FBRWQ7Ozs7O0lBS0EsSUFBQyxDQUFBLGFBQUQsR0FBaUI7TUFBRSxNQUFBLEVBQVEsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUF0QjtNQUFtQyxPQUFBLEVBQVMsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUF4RDtNQUFzRSxRQUFBLEVBQVUsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUE1Rjs7O0FBRWpCOzs7Ozs7SUFNQSxJQUFDLENBQUEsWUFBRCxHQUFnQixJQUFDLENBQUEsYUFBYyx1RUFBdUIsTUFBdkI7O0FBRS9COzs7OztJQUtBLElBQUMsQ0FBQSxLQUFELG9CQUFTLE1BQU0sQ0FBRTs7QUFFakI7Ozs7Ozs7OztJQVNBLElBQUMs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QUEsTUFBTSxDQUFDLE9BQWY7QUFBNEIsYUFBNUI7O0lBRUEsSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxnQkFBRCxDQUFBO1dBQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBQTtFQUxJOzs7O0dBaFY0QixFQUFFLENBQUM7O0FBdVYzQyxFQUFFLENBQUMseUJBQUgsR0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiNcbiMgICBTY3JpcHQ6IENvbXBvbmVudF9Ib3RzcG90QmVoYXZpb3JcbiNcbiMgICAkJENPUFlSSUdIVCQkXG4jXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY2xhc3MgSG90c3BvdFNoYXBlXG4gICAgQFJFQ1RBTkdMRSA9IFwicmVjdFwiXG4gICAgQFBJWEVMID0gXCJwaXhlbFwiXG5ncy5Ib3RzcG90U2hhcGUgPSBIb3RzcG90U2hhcGVcblxuY2xhc3MgQ29tcG9uZW50X0hvdHNwb3RCZWhhdmlvciBleHRlbmRzIGdzLkNvbXBvbmVudFxuICAgICMjIypcbiAgICAqIENhbGxlZCBpZiB0aGlzIG9iamVjdCBpbnN0YW5jZSBpcyByZXN0b3JlZCBmcm9tIGEgZGF0YS1idW5kbGUuIEl0IGNhbiBiZSB1c2VkXG4gICAgKiByZS1hc3NpZ24gZXZlbnQtaGFuZGxlciwgYW5vbnltb3VzIGZ1bmN0aW9ucywgZXRjLlxuICAgICpcbiAgICAqIEBtZXRob2Qgb25EYXRhQnVuZGxlUmVzdG9yZS5cbiAgICAqIEBwYXJhbSBPYmplY3QgZGF0YSAtIFRoZSBkYXRhLWJ1bmRsZVxuICAgICogQHBhcmFtIGdzLk9iamVjdENvZGVjQ29udGV4dCBjb250ZXh0IC0gVGhlIGNvZGVjLWNvbnRleHQuXG4gICAgIyMjXG4gICAgb25EYXRhQnVuZGxlUmVzdG9yZTogKGRhdGEsIGNvbnRleHQpIC0+XG4gICAgICAgIEBzZXR1cEV2ZW50SGFuZGxlcnMoKVxuXG4gICAgIyMjKlxuICAgICogQWRkcyBhIGhvdHNwb3QtYmVoYXZpb3IgdG8gYSBnYW1lIG9iamVjdC4gVGhhdCBhbGxvd3MgYSBnYW1lIG9iamVjdFxuICAgICogdG8gcmVzcG9uZCB0byBtb3VzZS90b3VjaCBhY3Rpb25zIGJ5IGZpcmluZyBhbiBhY3Rpb24tZXZlbnQgb3IgY2hhbmdpbmdcbiAgICAqIHRoZSBnYW1lIG9iamVjdCdzIGltYWdlLlxuICAgICpcbiAgICAqIEBtb2R1bGUgZ3NcbiAgICAqIEBjbGFzcyBDb21wb25lbnRfSG90c3BvdEJlaGF2aW9yXG4gICAgKiBAZXh0ZW5kcyBncy5Db21wb25lbnRcbiAgICAqIEBtZW1iZXJvZiBnc1xuICAgICogQGNvbnN0cnVjdG9yXG4gICAgIyMjXG4gICAgY29uc3RydWN0b3I6IChwYXJhbXMpIC0+XG4gICAgICAgICMjIypcbiAgICAgICAgKiBUaGUgc2hhcGUgdXNlZCB0byBkZXRlY3QgaWYgYSBob3RzcG90IGlzIGNsaWNrZWQsIGhvdmVyZWQsIGV0Yy5cbiAgICAgICAgKiBAcHJvcGVydHkgc2hhcGVcbiAgICAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICAgICMjI1xuICAgICAgICBAc2hhcGUgPSBncy5Ib3RzcG90U2hhcGUuUkVDVEFOR0xFXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIEluZGljYXRlcyBpZiB0aGUgaG90c3BvdCBpcyBzZWxlY3RlZC5cbiAgICAgICAgKiBAcHJvcGVydHkgc2VsZWN0ZWRcbiAgICAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICAgICMjI1xuICAgICAgICBAc2VsZWN0ZWQgPSBub1xuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGhvdHNwb3QgaXMgZW5hYmxlZC5cbiAgICAgICAgKiBAcHJvcGVydHkgZW5hYmxlZFxuICAgICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgICAgIyMjXG4gICAgICAgIEBlbmFibGVkID0geWVzXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIEBwcm9wZXJ0eSBpbWFnZUhhbmRsaW5nXG4gICAgICAgICogQHR5cGUgbnVtYmVyXG4gICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAjIyNcbiAgICAgICAgQGltYWdlSGFuZGxpbmcgPSAwXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIEluZGljYXRlcyBpZiB0aGUgbW91c2UvdG91Y2ggcG9pbnRlciBpcyBpbnNpZGUgdGhlIGhvdHNwb3QgYm91bmRzLlxuICAgICAgICAqIEBwcm9wZXJ0eSBjb250YWluc1xuICAgICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICMjI1xuICAgICAgICBAY29udGFpbnNQb2ludGVyID0gbm9cblxuICAgICAgICAjIyMqXG4gICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSBhY3Rpb24tYnV0dG9uIHdhcyBwcmVzc2VkIGJlZm9yZS5cbiAgICAgICAgKiBAcHJvcGVydHkgYnV0dG9uVXBcbiAgICAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAjIyNcbiAgICAgICAgQGJ1dHRvblVwID0gbm9cblxuICAgICAgICAjIyMqXG4gICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSBhY3Rpb24tYnV0dG9uIGlzIHByZXNzZWQuXG4gICAgICAgICogQHByb3BlcnR5IGJ1dHRvbkRvd25cbiAgICAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAjIyNcbiAgICAgICAgQGJ1dHRvbkRvd24gPSBub1xuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBAcHJvcGVydHkgYWN0aW9uQnV0dG9uc1xuICAgICAgICAqIEB0eXBlIE9iamVjdFxuICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgIyMjXG4gICAgICAgIEBhY3Rpb25CdXR0b25zID0geyBcImxlZnRcIjogSW5wdXQuTW91c2UuQlVUVE9OX0xFRlQsIFwicmlnaHRcIjogSW5wdXQuTW91c2UuQlVUVE9OX1JJR0hULCBcIm1pZGRsZVwiOiBJbnB1dC5Nb3VzZS5CVVRUT05fTUlERExFIH1cblxuICAgICAgICAjIyMqXG4gICAgICAgICogVGhlIGRlZmF1bHQgYWN0aW9uLWJ1dHRvbi4gQnkgZGVmYXVsdCB0aGUgbGVmdC1idXR0b24gaXMgdXNlZC5cbiAgICAgICAgKlxuICAgICAgICAqIEBwcm9wZXJ0eSBhY3Rpb25CdXR0b25cbiAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgIyMjXG4gICAgICAgIEBhY3Rpb25CdXR0b24gPSBAYWN0aW9uQnV0dG9uc1twYXJhbXM/LmFjdGlvbkJ1dHRvbiA/IFwibGVmdFwiXVxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBUaGUgc291bmQgcGxheWVkIGlmIHRoZSBob3RzcG90IGFjdGlvbiBpcyBleGVjdXRlZC5cbiAgICAgICAgKiBAcHJvcGVydHkgc291bmRcbiAgICAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgICAgIyMjXG4gICAgICAgIEBzb3VuZCA9IHBhcmFtcz8uc291bmRcblxuICAgICAgICAjIyMqXG4gICAgICAgICogPHA+VGhlIHNvdW5kcyBwbGF5ZWQgZGVwZW5kaW5nIG9uIHRoZSBob3RzcG90IHN0YXRlLjwvcD5cbiAgICAgICAgKiA8dWw+XG4gICAgICAgICogPGxpPjAgPSBTZWxlY3QgU291bmQ8L2xpPlxuICAgICAgICAqIDxsaT4xID0gVW5zZWxlY3QgU291bmQ8L2xpPlxuICAgICAgICAqIDwvdWw+XG4gICAgICAgICogQHByb3BlcnR5IHNvdW5kc1xuICAgICAgICAqIEB0eXBlIE9iamVjdFtdXG4gICAgICAgICMjI1xuICAgICAgICBAc291bmRzID0gcGFyYW1zPy5zb3VuZHMgfHwgW11cblxuXG4gICAgIyMjKlxuICAgICogR2V0cyB0aGUgcmVuZGVyLWluZGV4IG9mIHRoZSBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBob3RzcG90IGNvbXBvbmVudC4gVGhpc1xuICAgICogaW1wbGVtZW50YXRpb24gaXMgbmVjZXNzYXJ5IHRvIGJlIGFibGUgdG8gYWN0IGFzIGFuIG93bmVyIGZvciBncy5FdmVudEVtaXR0ZXIub25cbiAgICAqIGV2ZW50IHJlZ2lzdHJhdGlvbi5cbiAgICAqXG4gICAgKiBAcHJvcGVydHkgckluZGV4XG4gICAgKiBAdHlwZSBudW1iZXJcbiAgICAjIyNcbiAgICBAYWNjZXNzb3JzIFwickluZGV4XCIsXG4gICAgICAgIGdldDogLT4gQG9iamVjdC50YXJnZXQ/LnJJbmRleCB8fCBAb2JqZWN0LnJJbmRleFxuXG4gICAgIyMjKlxuICAgICogU2V0cyB1cCBldmVudCBoYW5kbGVycy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNldHVwRXZlbnRIYW5kbGVyc1xuICAgICMjI1xuICAgIHNldHVwRXZlbnRIYW5kbGVyczogLT5cbiAgICAgICAgZ3MuR2xvYmFsRXZlbnRNYW5hZ2VyLm9mZkJ5T3duZXIoXCJtb3VzZVVwXCIsIHRoaXMpXG4gICAgICAgIGdzLkdsb2JhbEV2ZW50TWFuYWdlci5vZmZCeU93bmVyKFwibW91c2VNb3ZlZFwiLCB0aGlzKVxuXG4gICAgICAgIGdzLkdsb2JhbEV2ZW50TWFuYWdlci5vbiBcImhvdHNwb3REcm9wXCIsICgoZSkgPT5cbiAgICAgICAgICAgIHNjZW5lID0gU2NlbmVNYW5hZ2VyLnNjZW5lXG4gICAgICAgICAgICBmb3IgaG90c3BvdCBpbiBzY2VuZS5ob3RzcG90c1xuICAgICAgICAgICAgICAgIHJlY3QgPSBlLnNlbmRlci5kc3RSZWN0XG4gICAgICAgICAgICAgICAgaWYgaG90c3BvdD8gYW5kIGhvdHNwb3QgIT0gZS5zZW5kZXIgYW5kIGhvdHNwb3QuZHN0UmVjdC5jb250YWlucyhJbnB1dC5Nb3VzZS54LCBJbnB1dC5Nb3VzZS55KVxuICAgICAgICAgICAgICAgICAgICBob3RzcG90LmV2ZW50cy5lbWl0KFwiZHJvcFJlY2VpdmVkXCIsIGhvdHNwb3QpXG4gICAgICAgICAgICAgICAgICAgICNAZXhlY3V0ZUFjdGlvbihob3RzcG90LmRhdGEucGFyYW1zLmFjdGlvbnMub25Ecm9wUmVjZWl2ZSwgeWVzLCBob3RzcG90LmRhdGEuYmluZFZhbHVlKVxuICAgICAgICApLCBudWxsLCB0aGlzXG5cbiAgICAgICAgZ3MuR2xvYmFsRXZlbnRNYW5hZ2VyLm9uIFwibW91c2VVcFwiLCAoKGUpID0+XG4gICAgICAgICAgICByZXR1cm4gaWYgbm90IEBvYmplY3QudmlzaWJsZVxuICAgICAgICAgICAgbXggPSBJbnB1dC5Nb3VzZS54IC0gQG9iamVjdC5vcmlnaW4ueFxuICAgICAgICAgICAgbXkgPSBJbnB1dC5Nb3VzZS55IC0gQG9iamVjdC5vcmlnaW4ueVxuICAgICAgICAgICAgY29udGFpbnMgPSBSZWN0LmNvbnRhaW5zKEBvYmplY3QuZHN0UmVjdC54LCBAb2JqZWN0LmRzdFJlY3QueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBAb2JqZWN0LmRzdFJlY3Qud2lkdGgsIEBvYmplY3QuZHN0UmVjdC5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgbXgsIG15KVxuICAgICAgICAgICAgaWYgY29udGFpbnNcbiAgICAgICAgICAgICAgICBjb250YWlucyA9IEBjaGVja1NoYXBlKG14IC0gQG9iamVjdC5kc3RSZWN0LngsIG15IC0gQG9iamVjdC5kc3RSZWN0LnkpXG4gICAgICAgICAgICAgICAgaWYgY29udGFpbnNcbiAgICAgICAgICAgICAgICAgICAgQGNvbnRhaW5zUG9pbnRlciA9IGNvbnRhaW5zXG4gICAgICAgICAgICAgICAgICAgIEB1cGRhdGVJbnB1dCgpXG4gICAgICAgICAgICAgICAgICAgIEB1cGRhdGVFdmVudHMoKVxuICAgICAgICAgICAgICAgICAgICBAb2JqZWN0Lm5lZWRzVXBkYXRlID0geWVzXG4gICAgICAgICAgICAgICAgICAgIGUuYnJlYWtDaGFpbiA9IHllc1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG51bGwsIHRoaXNcblxuICAgICAgICBpZiBAb2JqZWN0LmltYWdlcyBvciB5ZXNcbiAgICAgICAgICAgIGdzLkdsb2JhbEV2ZW50TWFuYWdlci5vbiBcIm1vdXNlTW92ZWRcIiwgKChlKSA9PlxuICAgICAgICAgICAgICAgIHJldHVybiBpZiBub3QgQG9iamVjdC52aXNpYmxlXG5cbiAgICAgICAgICAgICAgICBjb250YWlucyA9IFJlY3QuY29udGFpbnMoQG9iamVjdC5kc3RSZWN0LngsIEBvYmplY3QuZHN0UmVjdC55LFxuICAgICAgICAgICAgICAgICAgICAgICAgIEBvYmplY3QuZHN0UmVjdC53aWR0aCwgQG9iamVjdC5kc3RSZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBJbnB1dC5Nb3VzZS54IC0gQG9iamVjdC5vcmlnaW4ueCwgSW5wdXQuTW91c2UueSAtIEBvYmplY3Qub3JpZ2luLnkpXG5cbiAgICAgICAgICAgICAgICBpZiBjb250YWluc1xuICAgICAgICAgICAgICAgICAgICBteCA9IElucHV0Lk1vdXNlLnggLSBAb2JqZWN0Lm9yaWdpbi54XG4gICAgICAgICAgICAgICAgICAgIG15ID0gSW5wdXQuTW91c2UueSAtIEBvYmplY3Qub3JpZ2luLnlcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbnMgPSBAY2hlY2tTaGFwZShteCAtIEBvYmplY3QuZHN0UmVjdC54LCBteSAtIEBvYmplY3QuZHN0UmVjdC55KVxuXG4gICAgICAgICAgICAgICAgaWYgQGNvbnRhaW5zUG9pbnRlciAhPSBjb250YWluc1xuICAgICAgICAgICAgICAgICAgICBAY29udGFpbnNQb2ludGVyID0gY29udGFpbnNcbiAgICAgICAgICAgICAgICAgICAgQG9iamVjdC5uZWVkc1VwZGF0ZSA9IHllc1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbnRhaW5zXG4gICAgICAgICAgICAgICAgICAgICAgICBAb2JqZWN0LmV2ZW50cy5lbWl0KFwiZW50ZXJcIiwgdGhpcylcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgQG9iamVjdC5ldmVudHMuZW1pdChcImxlYXZlXCIsIHRoaXMpXG5cbiAgICAgICAgICAgICAgICBAdXBkYXRlSW5wdXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG51bGwsIHRoaXNcblxuICAgICMjIypcbiAgICAqIEluaXRpYWxpemVzIHRoZSBob3RzcG90IGNvbXBvbmVudC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNldHVwXG4gICAgIyMjXG4gICAgc2V0dXA6IC0+XG4gICAgICAgIHN1cGVyXG5cbiAgICAgICAgQHNvdW5kID0gdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUoQG9iamVjdCwgQHNvdW5kKVxuXG4gICAgICAgIGlmIEBzb3VuZHM/XG4gICAgICAgICAgICBmb3Igc291bmQsIGkgaW4gQHNvdW5kc1xuICAgICAgICAgICAgICAgIEBzb3VuZHNbaV0gPSB1aS5Db21wb25lbnRfRm9ybXVsYUhhbmRsZXIuZmllbGRWYWx1ZShAb2JqZWN0LCBzb3VuZClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICBAc291bmRzID0gW11cblxuXG4gICAgICAgIEBzZXR1cEV2ZW50SGFuZGxlcnMoKVxuXG5cblxuICAgICMjIypcbiAgICAqIERpc3Bvc2VzIHRoZSBjb21wb25lbnQuXG4gICAgKlxuICAgICogQG1ldGhvZCBkaXNwb3NlXG4gICAgIyMjXG4gICAgZGlzcG9zZTogLT5cbiAgICAgICAgc3VwZXJcblxuICAgICAgICBncy5HbG9iYWxFdmVudE1hbmFnZXIub2ZmQnlPd25lcihcIm1vdXNlVXBcIiwgdGhpcylcbiAgICAgICAgZ3MuR2xvYmFsRXZlbnRNYW5hZ2VyLm9mZkJ5T3duZXIoXCJtb3VzZU1vdmVkXCIsIHRoaXMpXG5cblxuICAgICMjIypcbiAgICAqIENoZWNrcyBpZiB0aGUgc3BlY2lmaWVkIHBvaW50IGlzIGluc2lkZSBvZiB0aGUgaG90c3BvdCdzIHNoYXBlLlxuICAgICpcbiAgICAqIEBtZXRob2QgY2hlY2tTaGFwZVxuICAgICogQHBhcmFtIHggLSBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAgICAqIEBwYXJhbSB5IC0gVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuXG4gICAgKiBAcmV0dXJuIElmIDxiPnRydWU8L2I+IHRoZSBwb2ludCBpcyBpbnNpZGUgb2YgdGhlIGhvdHNwb3QncyBzaGFwZS4gT3RoZXJ3aXNlIDxiPmZhbHNlPC9iPi5cbiAgICAjIyNcbiAgICBjaGVja1NoYXBlOiAoeCwgeSkgLT5cbiAgICAgICAgcmVzdWx0ID0geWVzXG5cbiAgICAgICAgc3dpdGNoIEBzaGFwZVxuICAgICAgICAgICAgd2hlbiBncy5Ib3RzcG90U2hhcGUuUElYRUxcbiAgICAgICAgICAgICAgICBpZiBAb2JqZWN0LmJpdG1hcFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBAb2JqZWN0LmJpdG1hcC5pc1BpeGVsU2V0KHgsIHkpXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBAb2JqZWN0LnRhcmdldD8uYml0bWFwLmlzUGl4ZWxTZXQoeCwgeSlcblxuICAgICAgICByZXR1cm4gcmVzdWx0XG5cbiAgICAjIyMqXG4gICAgKiBVcGRhdGVzIHRoZSBpbWFnZSBkZXBlbmRpbmcgb24gdGhlIGhvdHNwb3Qgc3RhdGUuXG4gICAgKlxuICAgICogQG1ldGhvZCB1cGRhdGVJbWFnZVxuICAgICogQHByb3RlY3RlZFxuICAgICMjI1xuICAgIHVwZGF0ZUltYWdlOiAtPlxuICAgICAgICBvYmplY3QgPSBAb2JqZWN0LnRhcmdldCB8fCBAb2JqZWN0XG4gICAgICAgIGlmIEBvYmplY3QuaW1hZ2VzP1xuICAgICAgICAgICAgYmFzZUltYWdlID0gaWYgQGVuYWJsZWQgdGhlbiBAb2JqZWN0LmltYWdlc1s0XSB8fCBAb2JqZWN0LmltYWdlc1swXSBlbHNlIEBvYmplY3QuaW1hZ2VzWzBdXG4gICAgICAgICAgICBpZiBAY29udGFpbnNQb2ludGVyXG4gICAgICAgICAgICAgICAgaWYgQG9iamVjdC5zZWxlY3RlZCBvciBAc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmltYWdlID0gQG9iamVjdC5pbWFnZXNbM10gfHwgQG9iamVjdC5pbWFnZXNbMl0gfHwgYmFzZUltYWdlXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuaW1hZ2UgPSBAb2JqZWN0LmltYWdlc1sxXSB8fCBiYXNlSW1hZ2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBpZiBAb2JqZWN0LnNlbGVjdGVkIG9yIEBzZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuaW1hZ2UgPSBAb2JqZWN0LmltYWdlc1syXSB8fCBAb2JqZWN0LmltYWdlc1s0XSB8fCBiYXNlSW1hZ2VcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5pbWFnZSA9IGJhc2VJbWFnZVxuXG4gICAgICAgICAgICBpZiAhb2JqZWN0LmltYWdlXG4gICAgICAgICAgICAgICAgb2JqZWN0LmJpdG1hcCA9IG51bGxcblxuXG4gICAgIyMjKlxuICAgICogVXBkYXRlcyB0aGUgaG90c3BvdCBwb3NpdGlvbiBhbmQgc2l6ZSBmcm9tIGFuIG90aGVyIHRhcmdldCBnYW1lIG9iamVjdC4gRm9yIGV4YW1wbGUsXG4gICAgKiB0aGF0IGlzIHVzZWZ1bCBmb3IgYWRkaW5nIGEgaG90c3BvdCB0byBhbiBvdGhlciBtb3ZpbmcgZ2FtZSBvYmplY3QuXG4gICAgKlxuICAgICogQG1ldGhvZCB1cGRhdGVGcm9tVGFyZ2V0XG4gICAgKiBAcHJvdGVjdGVkXG4gICAgIyMjXG4gICAgdXBkYXRlRnJvbVRhcmdldDogLT5cbiAgICAgICAgaWYgQG9iamVjdC50YXJnZXQ/XG4gICAgICAgICAgICBAb2JqZWN0LnJJbmRleCA9IEBvYmplY3QudGFyZ2V0LnJJbmRleFxuICAgICAgICAgICAgQG9iamVjdC5kc3RSZWN0LnggPSBAb2JqZWN0LnRhcmdldC5kc3RSZWN0LnhcbiAgICAgICAgICAgIEBvYmplY3QuZHN0UmVjdC55ID0gQG9iamVjdC50YXJnZXQuZHN0UmVjdC55XG4gICAgICAgICAgICBAb2JqZWN0LmRzdFJlY3Qud2lkdGggPSBAb2JqZWN0LnRhcmdldC5kc3RSZWN0LndpZHRoXG4gICAgICAgICAgICBAb2JqZWN0LmRzdFJlY3QuaGVpZ2h0ID0gQG9iamVjdC50YXJnZXQuZHN0UmVjdC5oZWlnaHRcbiAgICAgICAgICAgIEBvYmplY3Qub2Zmc2V0LnggPSBAb2JqZWN0LnRhcmdldC5vZmZzZXQueFxuICAgICAgICAgICAgQG9iamVjdC5vZmZzZXQueSA9IEBvYmplY3QudGFyZ2V0Lm9mZnNldC55XG4gICAgICAgICAgICBAb2JqZWN0Lm9yaWdpbi54ID0gQG9iamVjdC50YXJnZXQub3JpZ2luLnhcbiAgICAgICAgICAgIEBvYmplY3Qub3JpZ2luLnkgPSBAb2JqZWN0LnRhcmdldC5vcmlnaW4ueVxuXG4gICAgIyMjKlxuICAgICogVXBkYXRlcyB0aGUgZXZlbnQtaGFuZGxpbmcgYW5kIGZpcmVzIG5lY2Vzc2FyeSBldmVudHMuXG4gICAgKlxuICAgICogQG1ldGhvZCB1cGRhdGVFdmVudHNcbiAgICAqIEBwcm90ZWN0ZWRcbiAgICAjIyNcbiAgICB1cGRhdGVFdmVudHM6IC0+XG4gICAgICAgIGlmIEBidXR0b25VcCBhbmQgQG9iamVjdC5lbmFibGVkIGFuZCBAZW5hYmxlZCBhbmQgQG9iamVjdC52aXNpYmxlXG4gICAgICAgICAgICBpZiBAb2JqZWN0LnNlbGVjdGFibGVcbiAgICAgICAgICAgICAgICBncm91cCA9IGdzLk9iamVjdE1hbmFnZXIuY3VycmVudC5vYmplY3RzQnlHcm91cChAb2JqZWN0Lmdyb3VwKVxuICAgICAgICAgICAgICAgIGZvciBvYmplY3QgaW4gZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgaWYgb2JqZWN0ICE9IEBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5zZWxlY3RlZCA9IG5vXG4gICAgICAgICAgICAgICAgaWYgQG9iamVjdC5ncm91cFxuICAgICAgICAgICAgICAgICAgICBAc2VsZWN0ZWQgPSB5ZXNcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIEBzZWxlY3RlZCA9ICFAc2VsZWN0ZWRcblxuICAgICAgICAgICAgICAgIGlmIEBzZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICBBdWRpb01hbmFnZXIucGxheVNvdW5kKEBzb3VuZHNbMF0gfHwgQHNvdW5kKVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXlTb3VuZChAc291bmRzWzFdIHx8IEBzb3VuZClcbiAgICAgICAgICAgICAgICBAb2JqZWN0LmV2ZW50cy5lbWl0KFwiY2xpY2tcIiwgdGhpcylcbiAgICAgICAgICAgICAgICBAb2JqZWN0LmV2ZW50cy5lbWl0KFwic3RhdGVDaGFuZ2VkXCIsIEBvYmplY3QpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXlTb3VuZChAc291bmRzWzBdIHx8IEBzb3VuZClcbiAgICAgICAgICAgICAgICBAb2JqZWN0LmV2ZW50cy5lbWl0KFwiY2xpY2tcIiwgdGhpcylcbiAgICAgICAgICAgICAgICBAb2JqZWN0LmV2ZW50cy5lbWl0KFwiYWN0aW9uXCIsIHRoaXMpXG5cbiAgICAjIyMqXG4gICAgKiBVcGRhdGVzIHRoZSBnYW1lIG9iamVjdCdzIGNvbG9yIGRlcGVuZGluZyBvbiB0aGUgc3RhdGUgb2YgdGhlIGhvdHNwb3QuXG4gICAgKlxuICAgICogQG1ldGhvZCB1cGRhdGVDb2xvclxuICAgICogQHByb3RlY3RlZFxuICAgICMjI1xuICAgIHVwZGF0ZUNvbG9yOiAtPlxuICAgICAgICBpZiAhQG9iamVjdC5lbmFibGVkXG4gICAgICAgICAgICBAb2JqZWN0LmNvbG9yLnNldCgwLCAwLCAwLCAxMDApXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBvYmplY3QuY29sb3Iuc2V0KDAsIDAsIDAsIDApXG5cbiAgICAjIyMqXG4gICAgKiBTdG9yZXMgY3VycmVudCBzdGF0ZXMgb2YgbW91c2UvdG91Y2ggcG9pbnRlciBhbmQgYnV0dG9ucy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHVwZGF0ZUlucHV0XG4gICAgKiBAcHJvdGVjdGVkXG4gICAgIyMjXG4gICAgdXBkYXRlSW5wdXQ6IC0+XG4gICAgICAgIEBidXR0b25VcCA9IElucHV0Lk1vdXNlLmJ1dHRvbnNbQGFjdGlvbkJ1dHRvbl0gPT0gMiBhbmQgQGNvbnRhaW5zUG9pbnRlclxuICAgICAgICBAYnV0dG9uRG93biA9IElucHV0Lk1vdXNlLmJ1dHRvbnNbQGFjdGlvbkJ1dHRvbl0gPT0gMSBhbmQgQGNvbnRhaW5zUG9pbnRlclxuXG4gICAgIyMjKlxuICAgICogVXBkYXRlcyB0aGUgaG90c3BvdCBjb21wb25lbnQuXG4gICAgKlxuICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAjIyNcbiAgICB1cGRhdGU6IC0+XG4gICAgICAgIGlmIG5vdCBAb2JqZWN0LnZpc2libGUgdGhlbiByZXR1cm5cblxuICAgICAgICBAdXBkYXRlQ29sb3IoKVxuICAgICAgICBAdXBkYXRlRnJvbVRhcmdldCgpXG4gICAgICAgIEB1cGRhdGVJbWFnZSgpXG5cbmdzLkNvbXBvbmVudF9Ib3RzcG90QmVoYXZpb3IgPSBDb21wb25lbnRfSG90c3BvdEJlaGF2aW9yIl19
//# sourceURL=Component_HotspotBehavior_20.js