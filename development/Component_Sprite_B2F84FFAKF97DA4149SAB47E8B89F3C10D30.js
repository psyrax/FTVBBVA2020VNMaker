var AnimationTypes, Component_Sprite,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component_Sprite = (function(superClass) {
  extend(Component_Sprite, superClass);


  /**
  * Called if this object instance is restored from a data-bundle. It can be used
  * re-assign event-handler, anonymous functions, etc.
  *
  * @method onDataBundleRestore.
  * @param Object data - The data-bundle
  * @param gs.ObjectCodecContext context - The codec-context.
   */

  Component_Sprite.prototype.onDataBundleRestore = function(data, context) {
    return this.setupEventHandlers();
  };


  /**
  * A sprite component to display an object on screen. It can be managed or
  * unmanaged. A managed sprite is automatically added to the graphics-system
  * and rendered every frame until it gets disposed. An unmanaged sprite needs
  * to be added and removed manually.
  *
  * @module gs
  * @class Component_Sprite
  * @extends gs.Component_Visual
  * @memberof gs
  * @constructor
  * @param {boolean} managed - Indicates if the sprite is managed by the graphics system.
   */

  function Component_Sprite(managed) {
    Component_Sprite.__super__.constructor.call(this);

    /**
    * The native sprite object to display the game object on screen.
    *
    * @property sprite
    * @type Sprite
    * @protected
     */
    this.sprite = null;

    /**
    * The name of the image to display.
    *
    * @property image
    * @type string
    * @protected
     */
    this.image = null;

    /**
    * The name of the video to display.
    *
    * @property video
    * @type string
    * @protected
     */
    this.video = null;

    /**
    * The name of the folder from where the image should be loaded.
    *
    * @property image
    * @type string
    * @protected
     */
    this.imageFolder = "Graphics/Pictures";

    /**
    * The visibility. If <b>false</b>, the sprite is not rendered.
    *
    * @property visible
    * @type boolean
    * @protected
     */
    this.visible = false;

    /**
    * Indicates if the image is loaded.
    *
    * @property imageLoaded
    * @type boolean
    * @protected
     */
    this.imageLoaded = false;
  }


  /**
  * Disposes the sprite. If the sprite is managed, it will be automatically
  * removed from the graphics system and viewport.
  * @method dispose
   */

  Component_Sprite.prototype.dispose = function() {
    var ref, ref1;
    Component_Sprite.__super__.dispose.apply(this, arguments);
    if (this.sprite) {
      this.sprite.dispose();
      if (this.sprite.video) {
        this.sprite.video.stop();
      }
      if (!this.sprite.managed) {
        if ((ref = this.sprite.viewport) != null) {
          ref.removeGraphicObject(this.sprite);
        }
        return (ref1 = Graphics.viewport) != null ? ref1.removeGraphicObject(this.sprite) : void 0;
      }
    }
  };


  /**
  * Adds event-handlers for mouse/touch events
  *
  * @method setupEventHandlers
   */

  Component_Sprite.prototype.setupEventHandlers = function() {
    return this.sprite.onIndexChange = (function(_this) {
      return function() {
        _this.object.rIndex = _this.sprite.index;
        return _this.object.needsUpdate = true;
      };
    })(this);
  };


  /**
  * Setup the sprite.
  * @method setupSprite
   */

  Component_Sprite.prototype.setupSprite = function() {
    if (!this.sprite) {
      return this.sprite = new gs.Sprite(Graphics.viewport, typeof managed !== "undefined" && managed !== null ? managed : true);
    }
  };


  /**
  * Setup the sprite component. This method is automatically called by the
  * system.
  * @method setup
   */

  Component_Sprite.prototype.setup = function() {
    this.isSetup = true;
    this.setupSprite();
    this.setupEventHandlers();
    return this.update();
  };


  /**
  * Updates the source- and destination-rectangle of the game object so that
  * the associated bitmap fits in. The imageHandling property controls how
  * the rectangles are resized.
  * @method updateRect
   */

  Component_Sprite.prototype.updateRect = function() {
    if (this.sprite.bitmap != null) {
      if (!this.object.imageHandling) {
        this.object.srcRect = new Rect(0, 0, this.sprite.bitmap.width, this.sprite.bitmap.height);
        if (!this.object.fixedSize) {
          this.object.dstRect.width = this.object.srcRect.width;
          return this.object.dstRect.height = this.object.srcRect.height;
        }
      } else if (this.object.imageHandling === 1) {
        this.object.srcRect = new Rect(0, 0, this.sprite.bitmap.width, this.sprite.bitmap.height / 2);
        if (!this.object.fixedSize) {
          this.object.dstRect.width = this.object.srcRect.width;
          return this.object.dstRect.height = this.object.srcRect.height;
        }
      } else if (this.object.imageHandling === 2) {
        if (!this.object.fixedSize) {
          this.object.dstRect.width = this.object.srcRect.width;
          return this.object.dstRect.height = this.object.srcRect.height;
        }
      }
    }
  };


  /**
  * Updates the bitmap object from the associated image name. The imageFolder
  * property controls from which resource-folder the image will be loaded.
  * @method updateBitmap
   */

  Component_Sprite.prototype.updateBitmap = function() {
    this.imageLoaded = false;
    this.image = this.object.image;
    if (this.object.image.startsWith("data:") || this.object.image.startsWith("$")) {
      this.sprite.bitmap = ResourceManager.getBitmap(this.object.image);
    } else {
      this.sprite.bitmap = ResourceManager.getBitmap((this.object.imageFolder || this.imageFolder) + "/" + this.object.image);
    }
    if (this.sprite.bitmap != null) {
      if (!this.imageLoaded) {
        this.imageLoaded = this.sprite.bitmap.loaded;
      } else {
        delete this.sprite.bitmap.loaded_;
      }
    }
    return this.object.bitmap = this.sprite.bitmap;
  };


  /**
  * Updates the video object from the associated video name. It also updates
  * the video-rendering process.
  * @method updateVideo
   */

  Component_Sprite.prototype.updateVideo = function() {
    var ref, ref1, ref2;
    if (this.object.video !== this.videoName) {
      this.videoName = this.object.video;
      this.sprite.video = ResourceManager.getVideo(((ref = this.object.videoFolder) != null ? ref : "Movies") + "/" + this.object.video);
      if (this.sprite.video != null) {
        if ((ref1 = $PARAMS.preview) != null ? ref1.settings.musicDisabled : void 0) {
          this.sprite.video.volume = 0;
        }
        this.sprite.video.loop = this.object.loop;
        this.sprite.video.play();
        this.object.srcRect = new Rect(0, 0, this.sprite.video.width, this.sprite.video.height);
        if (!this.object.fixedSize) {
          this.object.dstRect = new Rect(this.object.dstRect.x, this.object.dstRect.y, this.sprite.video.width, this.sprite.video.height);
        }
      }
    }
    return (ref2 = this.sprite.video) != null ? ref2.update() : void 0;
  };


  /**
  * Updates the image if the game object has the image-property set.
  * @method updateImage
   */

  Component_Sprite.prototype.updateImage = function() {
    var ref;
    if (this.object.image != null) {
      if (this.object.image !== this.image || (!this.imageLoaded && ((ref = this.sprite.bitmap) != null ? ref.loaded : void 0))) {
        this.updateBitmap();
        return this.updateRect();
      }
    } else if (this.object.bitmap != null) {
      return this.sprite.bitmap = this.object.bitmap;
    } else if ((this.object.video != null) || this.videoName !== this.object.video) {
      return this.updateVideo();
    } else {
      this.image = null;
      this.object.bitmap = null;
      return this.sprite.bitmap = null;
    }
  };


  /**
  * If the sprite is unmanaged, this method will update the visibility of the
  * sprite. If the sprite leaves the viewport, it will be removed to save
  * performance and automatically added back to the viewport if it enters
  * the viewport.
  * @method updateVisibility
   */

  Component_Sprite.prototype.updateVisibility = function() {
    var visible;
    if (!this.sprite.managed) {
      visible = Rect.intersect(this.object.dstRect.x + this.object.origin.x, this.object.dstRect.y + this.object.origin.y, this.object.dstRect.width, this.object.dstRect.height, 0, 0, Graphics.width, Graphics.height);
      if (visible && !this.visible) {
        (this.object.viewport || Graphics.viewport).addGraphicObject(this.sprite);
        this.visible = true;
      }
      if (!visible && this.visible) {
        (this.object.viewport || Graphics.viewport).removeGraphicObject(this.sprite);
        return this.visible = false;
      }
    }
  };


  /**
  * Updates the padding.
  * @method updatePadding
   */

  Component_Sprite.prototype.updatePadding = function() {
    if (this.object.padding != null) {
      this.sprite.x += this.object.padding.left;
      this.sprite.y += this.object.padding.top;
      this.sprite.zoomX -= (this.object.padding.left + this.object.padding.right) / this.object.srcRect.width;
      return this.sprite.zoomY -= (this.object.padding.bottom + this.object.padding.bottom) / this.object.srcRect.height;
    }
  };


  /**
  * Updates the sprite properties from the game object properties.
  * @method updateProperties
   */

  Component_Sprite.prototype.updateProperties = function() {
    var ref, ref1;
    this.sprite.width = this.object.dstRect.width;
    this.sprite.height = this.object.dstRect.height;
    this.sprite.x = this.object.dstRect.x;
    this.sprite.y = this.object.dstRect.y;
    this.sprite.mask = (ref = this.object.mask) != null ? ref : this.mask;
    this.sprite.angle = this.object.angle || 0;
    this.sprite.opacity = (ref1 = this.object.opacity) != null ? ref1 : 255;
    this.sprite.clipRect = this.object.clipRect;
    this.sprite.srcRect = this.object.srcRect;
    this.sprite.blendingMode = this.object.blendMode || 0;
    this.sprite.mirror = this.object.mirror;
    this.sprite.visible = this.object.visible && (!this.object.parent || (this.object.parent.visible == null) || this.object.parent.visible);
    this.sprite.ox = -this.object.origin.x;
    this.sprite.oy = -this.object.origin.y;
    return this.sprite.z = (this.object.zIndex || 0) + (!this.object.parent ? 0 : this.object.parent.zIndex || 0);
  };


  /**
  * Updates the optional sprite properties from the game object properties.
  * @method updateOptionalProperties
   */

  Component_Sprite.prototype.updateOptionalProperties = function() {
    if (this.object.tone != null) {
      this.sprite.tone = this.object.tone;
    }
    if (this.object.color != null) {
      this.sprite.color = this.object.color;
    }
    if (this.object.viewport != null) {
      this.sprite.viewport = this.object.viewport;
    }
    if (this.object.effects != null) {
      this.sprite.effects = this.object.effects;
    }
    if (this.object.anchor != null) {
      this.sprite.anchor.x = this.object.anchor.x;
      this.sprite.anchor.y = this.object.anchor.y;
    }
    if (this.object.positionAnchor != null) {
      this.sprite.positionAnchor = this.object.positionAnchor;
    }
    if (this.object.zoom != null) {
      this.sprite.zoomX = this.object.zoom.x;
      this.sprite.zoomY = this.object.zoom.y;
    }
    if (this.object.motionBlur != null) {
      return this.sprite.motionBlur = this.object.motionBlur;
    }
  };


  /**
  * Updates the sprite component by updating its visibility, image, padding and
  * properties.
  * @method update
   */

  Component_Sprite.prototype.update = function() {
    Component_Sprite.__super__.update.apply(this, arguments);
    if (!this.isSetup) {
      this.setup();
    }
    this.updateVisibility();
    this.updateImage();
    this.updateProperties();
    this.updateOptionalProperties();
    this.updatePadding();
    this.object.rIndex = this.sprite.index;
    return this.sprite.update();
  };

  return Component_Sprite;

})(gs.Component_Visual);


/**
* Enumeration of appearance animations.
*
* @module gs
* @class AnimationTypes
* @static
* @memberof gs
 */

AnimationTypes = (function() {
  function AnimationTypes() {}

  AnimationTypes.initialize = function() {

    /**
    * An object appears or disappears by moving into or out of the screen.
    * @property MOVEMENT
    * @type number
    * @static
    * @final
     */
    this.MOVEMENT = 0;

    /**
    * An object appears or disappears using alpha-blending.
    * @property BLENDING
    * @type number
    * @static
    * @final
     */
    this.BLENDING = 1;

    /**
    * An object appears or disappears using a mask-image.
    * @property MASKING
    * @type number
    * @static
    * @final
     */
    return this.MASKING = 2;
  };

  return AnimationTypes;

})();

AnimationTypes.initialize();

gs.AnimationTypes = AnimationTypes;

gs.Component_Sprite = Component_Sprite;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUEsZ0NBQUE7RUFBQTs7O0FBQU07Ozs7QUFDRjs7Ozs7Ozs7OzZCQVFBLG1CQUFBLEdBQXFCLFNBQUMsSUFBRCxFQUFPLE9BQVA7V0FDakIsSUFBQyxDQUFBLGtCQUFELENBQUE7RUFEaUI7OztBQUdyQjs7Ozs7Ozs7Ozs7Ozs7RUFhYSwwQkFBQyxPQUFEO0lBQ1QsZ0RBQUE7O0FBRUE7Ozs7Ozs7SUFPQSxJQUFDLENBQUEsTUFBRCxHQUFVOztBQUVWOzs7Ozs7O0lBT0EsSUFBQyxDQUFBLEtBQUQsR0FBUzs7QUFFVDs7Ozs7OztJQU9BLElBQUMsQ0FBQSxLQUFELEdBQVM7O0FBRVQ7Ozs7Ozs7SUFPQSxJQUFDLENBQUEsV0FBRCxHQUFlOztBQUVmOzs7Ozs7O0lBT0EsSUFBQyxDQUFBLE9BQUQsR0FBVzs7QUFFWDs7Ozs7OztJQU9BLElBQUMsQ0FBQSxXQUFELEdBQWU7RUF2RE47OztBQTJEYjs7Ozs7OzZCQUtBLE9BQUEsR0FBUyxTQUFBO0FBQ0wsUUFBQTtJQUFBLCtDQUFBLFNBQUE7SUFFQSxJQUFHLElBQUMsQ0FBQSxNQUFKO01BQ0ksSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFSLENBQUE7TUFFQSxJQUFHLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBWDtRQUNJLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQWQsQ0FBQSxFQURKOztNQUdBLElBQUcsQ0FBSSxJQUFDLENBQUEsTUFBTSxDQUFDLE9BQWY7O2FBQ29CLENBQUUsbUJBQWxCLENBQXNDLElBQUMsQ0FBQSxNQUF2Qzs7d0RBQ2lCLENBQUUsbUJBQW5CLENBQXVDLElBQUMsQ0FBQSxNQUF4QyxXQUZKO09BTko7O0VBSEs7OztBQWFUOzs7Ozs7NkJBS0Esa0JBQUEsR0FBb0IsU0FBQTtXQUNoQixJQUFDLENBQUEsTUFBTSxDQUFDLGFBQVIsR0FBd0IsQ0FBQSxTQUFBLEtBQUE7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QSxLQUFELENBQUEsRUFBQTs7SUFDQSxJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxXQUFELENBQUE7SUFDQSxJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSx3QkFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBQTtJQUVBLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBUixHQUFpQixJQUFDLENBQUEsTUFBTSxDQUFDO1dBQ3pCLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBUixDQUFBO0VBWEk7Ozs7R0F6U21CLEVBQUUsQ0FBQzs7O0FBdVRsQzs7Ozs7Ozs7O0FBUU07OztFQUNGLGNBQUMsQ0FBQSxVQUFELEdBQWEsU0FBQTs7QUFDVDs7Ozs7OztJQU9BLElBQUMsQ0FBQSxRQUFELEdBQVk7O0FBQ1o7Ozs7Ozs7SUFPQSxJQUFDLENBQUEsUUFBRCxHQUFZOztBQUNaOzs7Ozs7O1dBT0EsSUFBQyxDQUFBLE9BQUQsR0FBVztFQXhCRjs7Ozs7O0FBMEJqQixjQUFjLENBQUMsVUFBZixDQUFBOztBQUNBLEVBQUUsQ0FBQyxjQUFILEdBQW9COztBQUNwQixFQUFFLENBQUMsZ0JBQUgsR0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiNcbiMgICBTY3JpcHQ6IENvbXBvbmVudFxuI1xuIyAgICQkQ09QWVJJR0hUJCRcbiNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuY2xhc3MgQ29tcG9uZW50X1Nwcml0ZSBleHRlbmRzIGdzLkNvbXBvbmVudF9WaXN1YWxcbiAgICAjIyMqXG4gICAgKiBDYWxsZWQgaWYgdGhpcyBvYmplY3QgaW5zdGFuY2UgaXMgcmVzdG9yZWQgZnJvbSBhIGRhdGEtYnVuZGxlLiBJdCBjYW4gYmUgdXNlZFxuICAgICogcmUtYXNzaWduIGV2ZW50LWhhbmRsZXIsIGFub255bW91cyBmdW5jdGlvbnMsIGV0Yy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIG9uRGF0YUJ1bmRsZVJlc3RvcmUuXG4gICAgKiBAcGFyYW0gT2JqZWN0IGRhdGEgLSBUaGUgZGF0YS1idW5kbGVcbiAgICAqIEBwYXJhbSBncy5PYmplY3RDb2RlY0NvbnRleHQgY29udGV4dCAtIFRoZSBjb2RlYy1jb250ZXh0LlxuICAgICMjI1xuICAgIG9uRGF0YUJ1bmRsZVJlc3RvcmU6IChkYXRhLCBjb250ZXh0KSAtPlxuICAgICAgICBAc2V0dXBFdmVudEhhbmRsZXJzKClcblxuICAgICMjIypcbiAgICAqIEEgc3ByaXRlIGNvbXBvbmVudCB0byBkaXNwbGF5IGFuIG9iamVjdCBvbiBzY3JlZW4uIEl0IGNhbiBiZSBtYW5hZ2VkIG9yXG4gICAgKiB1bm1hbmFnZWQuIEEgbWFuYWdlZCBzcHJpdGUgaXMgYXV0b21hdGljYWxseSBhZGRlZCB0byB0aGUgZ3JhcGhpY3Mtc3lzdGVtXG4gICAgKiBhbmQgcmVuZGVyZWQgZXZlcnkgZnJhbWUgdW50aWwgaXQgZ2V0cyBkaXNwb3NlZC4gQW4gdW5tYW5hZ2VkIHNwcml0ZSBuZWVkc1xuICAgICogdG8gYmUgYWRkZWQgYW5kIHJlbW92ZWQgbWFudWFsbHkuXG4gICAgKlxuICAgICogQG1vZHVsZSBnc1xuICAgICogQGNsYXNzIENvbXBvbmVudF9TcHJpdGVcbiAgICAqIEBleHRlbmRzIGdzLkNvbXBvbmVudF9WaXN1YWxcbiAgICAqIEBtZW1iZXJvZiBnc1xuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmFnZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNwcml0ZSBpcyBtYW5hZ2VkIGJ5IHRoZSBncmFwaGljcyBzeXN0ZW0uXG4gICAgIyMjXG4gICAgY29uc3RydWN0b3I6IChtYW5hZ2VkKSAtPlxuICAgICAgICBzdXBlcigpXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIFRoZSBuYXRpdmUgc3ByaXRlIG9iamVjdCB0byBkaXNwbGF5IHRoZSBnYW1lIG9iamVjdCBvbiBzY3JlZW4uXG4gICAgICAgICpcbiAgICAgICAgKiBAcHJvcGVydHkgc3ByaXRlXG4gICAgICAgICogQHR5cGUgU3ByaXRlXG4gICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAjIyNcbiAgICAgICAgQHNwcml0ZSA9IG51bGxcblxuICAgICAgICAjIyMqXG4gICAgICAgICogVGhlIG5hbWUgb2YgdGhlIGltYWdlIHRvIGRpc3BsYXkuXG4gICAgICAgICpcbiAgICAgICAgKiBAcHJvcGVydHkgaW1hZ2VcbiAgICAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICMjI1xuICAgICAgICBAaW1hZ2UgPSBudWxsXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSB2aWRlbyB0byBkaXNwbGF5LlxuICAgICAgICAqXG4gICAgICAgICogQHByb3BlcnR5IHZpZGVvXG4gICAgICAgICogQHR5cGUgc3RyaW5nXG4gICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAjIyNcbiAgICAgICAgQHZpZGVvID0gbnVsbFxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBUaGUgbmFtZSBvZiB0aGUgZm9sZGVyIGZyb20gd2hlcmUgdGhlIGltYWdlIHNob3VsZCBiZSBsb2FkZWQuXG4gICAgICAgICpcbiAgICAgICAgKiBAcHJvcGVydHkgaW1hZ2VcbiAgICAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICMjI1xuICAgICAgICBAaW1hZ2VGb2xkZXIgPSBcIkdyYXBoaWNzL1BpY3R1cmVzXCJcblxuICAgICAgICAjIyMqXG4gICAgICAgICogVGhlIHZpc2liaWxpdHkuIElmIDxiPmZhbHNlPC9iPiwgdGhlIHNwcml0ZSBpcyBub3QgcmVuZGVyZWQuXG4gICAgICAgICpcbiAgICAgICAgKiBAcHJvcGVydHkgdmlzaWJsZVxuICAgICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICMjI1xuICAgICAgICBAdmlzaWJsZSA9IG5vXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIEluZGljYXRlcyBpZiB0aGUgaW1hZ2UgaXMgbG9hZGVkLlxuICAgICAgICAqXG4gICAgICAgICogQHByb3BlcnR5IGltYWdlTG9hZGVkXG4gICAgICAgICogQHR5cGUgYm9vbGVhblxuICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgIyMjXG4gICAgICAgIEBpbWFnZUxvYWRlZCA9IG5vXG5cblxuXG4gICAgIyMjKlxuICAgICogRGlzcG9zZXMgdGhlIHNwcml0ZS4gSWYgdGhlIHNwcml0ZSBpcyBtYW5hZ2VkLCBpdCB3aWxsIGJlIGF1dG9tYXRpY2FsbHlcbiAgICAqIHJlbW92ZWQgZnJvbSB0aGUgZ3JhcGhpY3Mgc3lzdGVtIGFuZCB2aWV3cG9ydC5cbiAgICAqIEBtZXRob2QgZGlzcG9zZVxuICAgICMjI1xuICAgIGRpc3Bvc2U6IC0+XG4gICAgICAgIHN1cGVyXG5cbiAgICAgICAgaWYgQHNwcml0ZVxuICAgICAgICAgICAgQHNwcml0ZS5kaXNwb3NlKClcblxuICAgICAgICAgICAgaWYgQHNwcml0ZS52aWRlb1xuICAgICAgICAgICAgICAgIEBzcHJpdGUudmlkZW8uc3RvcCgpXG5cbiAgICAgICAgICAgIGlmIG5vdCBAc3ByaXRlLm1hbmFnZWRcbiAgICAgICAgICAgICAgICBAc3ByaXRlLnZpZXdwb3J0Py5yZW1vdmVHcmFwaGljT2JqZWN0KEBzcHJpdGUpXG4gICAgICAgICAgICAgICAgR3JhcGhpY3Mudmlld3BvcnQ/LnJlbW92ZUdyYXBoaWNPYmplY3QoQHNwcml0ZSlcblxuICAgICMjIypcbiAgICAqIEFkZHMgZXZlbnQtaGFuZGxlcnMgZm9yIG1vdXNlL3RvdWNoIGV2ZW50c1xuICAgICpcbiAgICAqIEBtZXRob2Qgc2V0dXBFdmVudEhhbmRsZXJzXG4gICAgIyMjXG4gICAgc2V0dXBFdmVudEhhbmRsZXJzOiAtPlxuICAgICAgICBAc3ByaXRlLm9uSW5kZXhDaGFuZ2UgPSA9PlxuICAgICAgICAgICAgQG9iamVjdC5ySW5kZXggPSBAc3ByaXRlLmluZGV4XG4gICAgICAgICAgICBAb2JqZWN0Lm5lZWRzVXBkYXRlID0geWVzXG5cbiAgICAjIyMqXG4gICAgKiBTZXR1cCB0aGUgc3ByaXRlLlxuICAgICogQG1ldGhvZCBzZXR1cFNwcml0ZVxuICAgICMjI1xuICAgIHNldHVwU3ByaXRlOiAtPlxuICAgICAgICBpZiAhQHNwcml0ZVxuICAgICAgICAgICAgQHNwcml0ZSA9IG5ldyBncy5TcHJpdGUoR3JhcGhpY3Mudmlld3BvcnQsIG1hbmFnZWQgPyB5ZXMpXG5cbiAgICAjIyMqXG4gICAgKiBTZXR1cCB0aGUgc3ByaXRlIGNvbXBvbmVudC4gVGhpcyBtZXRob2QgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgYnkgdGhlXG4gICAgKiBzeXN0ZW0uXG4gICAgKiBAbWV0aG9kIHNldHVwXG4gICAgIyMjXG4gICAgc2V0dXA6IC0+XG4gICAgICAgIEBpc1NldHVwID0geWVzXG4gICAgICAgIEBzZXR1cFNwcml0ZSgpXG4gICAgICAgIEBzZXR1cEV2ZW50SGFuZGxlcnMoKVxuICAgICAgICBAdXBkYXRlKClcblxuXG4gICAgIyMjKlxuICAgICogVXBkYXRlcyB0aGUgc291cmNlLSBhbmQgZGVzdGluYXRpb24tcmVjdGFuZ2xlIG9mIHRoZSBnYW1lIG9iamVjdCBzbyB0aGF0XG4gICAgKiB0aGUgYXNzb2NpYXRlZCBiaXRtYXAgZml0cyBpbi4gVGhlIGltYWdlSGFuZGxpbmcgcHJvcGVydHkgY29udHJvbHMgaG93XG4gICAgKiB0aGUgcmVjdGFuZ2xlcyBhcmUgcmVzaXplZC5cbiAgICAqIEBtZXRob2QgdXBkYXRlUmVjdFxuICAgICMjI1xuICAgIHVwZGF0ZVJlY3Q6IC0+XG4gICAgICAgIGlmIEBzcHJpdGUuYml0bWFwP1xuICAgICAgICAgICAgaWYgIUBvYmplY3QuaW1hZ2VIYW5kbGluZ1xuICAgICAgICAgICAgICAgIEBvYmplY3Quc3JjUmVjdCA9IG5ldyBSZWN0KDAsIDAsIEBzcHJpdGUuYml0bWFwLndpZHRoLCBAc3ByaXRlLmJpdG1hcC5oZWlnaHQpXG4gICAgICAgICAgICAgICAgaWYgbm90IEBvYmplY3QuZml4ZWRTaXplXG4gICAgICAgICAgICAgICAgICAgIEBvYmplY3QuZHN0UmVjdC53aWR0aCA9IEBvYmplY3Quc3JjUmVjdC53aWR0aFxuICAgICAgICAgICAgICAgICAgICBAb2JqZWN0LmRzdFJlY3QuaGVpZ2h0ID0gQG9iamVjdC5zcmNSZWN0LmhlaWdodFxuICAgICAgICAgICAgZWxzZSBpZiBAb2JqZWN0LmltYWdlSGFuZGxpbmcgPT0gMVxuICAgICAgICAgICAgICAgIEBvYmplY3Quc3JjUmVjdCA9IG5ldyBSZWN0KDAsIDAsIEBzcHJpdGUuYml0bWFwLndpZHRoLCBAc3ByaXRlLmJpdG1hcC5oZWlnaHQgLyAyKVxuICAgICAgICAgICAgICAgIGlmIG5vdCBAb2JqZWN0LmZpeGVkU2l6ZVxuICAgICAgICAgICAgICAgICAgICBAb2JqZWN0LmRzdFJlY3Qud2lkdGggPSBAb2JqZWN0LnNyY1JlY3Qud2lkdGhcbiAgICAgICAgICAgICAgICAgICAgQG9iamVjdC5kc3RSZWN0LmhlaWdodCA9IEBvYmplY3Quc3JjUmVjdC5oZWlnaHRcbiAgICAgICAgICAgIGVsc2UgaWYgQG9iamVjdC5pbWFnZUhhbmRsaW5nID09IDJcbiAgICAgICAgICAgICAgICBpZiBub3QgQG9iamVjdC5maXhlZFNpemVcbiAgICAgICAgICAgICAgICAgICAgQG9iamVjdC5kc3RSZWN0LndpZHRoID0gQG9iamVjdC5zcmNSZWN0LndpZHRoXG4gICAgICAgICAgICAgICAgICAgIEBvYmplY3QuZHN0UmVjdC5oZWlnaHQgPSBAb2JqZWN0LnNyY1JlY3QuaGVpZ2h0XG5cbiAgICAjIyMqXG4gICAgKiBVcGRhdGVzIHRoZSBiaXRtYXAgb2JqZWN0IGZyb20gdGhlIGFzc29jaWF0ZWQgaW1hZ2UgbmFtZS4gVGhlIGltYWdlRm9sZGVyXG4gICAgKiBwcm9wZXJ0eSBjb250cm9scyBmcm9tIHdoaWNoIHJlc291cmNlLWZvbGRlciB0aGUgaW1hZ2Ugd2lsbCBiZSBsb2FkZWQuXG4gICAgKiBAbWV0aG9kIHVwZGF0ZUJpdG1hcFxuICAgICMjI1xuICAgIHVwZGF0ZUJpdG1hcDogLT5cbiAgICAgICAgQGltYWdlTG9hZGVkID0gbm9cbiAgICAgICAgQGltYWdlID0gQG9iamVjdC5pbWFnZVxuXG4gICAgICAgIGlmIEBvYmplY3QuaW1hZ2Uuc3RhcnRzV2l0aChcImRhdGE6XCIpIHx8IEBvYmplY3QuaW1hZ2Uuc3RhcnRzV2l0aChcIiRcIilcbiAgICAgICAgICAgIEBzcHJpdGUuYml0bWFwID0gUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChAb2JqZWN0LmltYWdlKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAc3ByaXRlLmJpdG1hcCA9IFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoXCIje0BvYmplY3QuaW1hZ2VGb2xkZXJ8fEBpbWFnZUZvbGRlcn0vI3tAb2JqZWN0LmltYWdlfVwiKVxuXG4gICAgICAgIGlmIEBzcHJpdGUuYml0bWFwP1xuICAgICAgICAgICAgaWYgbm90IEBpbWFnZUxvYWRlZFxuICAgICAgICAgICAgICAgIEBpbWFnZUxvYWRlZCA9IEBzcHJpdGUuYml0bWFwLmxvYWRlZFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBAc3ByaXRlLmJpdG1hcC5sb2FkZWRfXG5cbiAgICAgICAgQG9iamVjdC5iaXRtYXAgPSBAc3ByaXRlLmJpdG1hcFxuXG4gICAgIyMjKlxuICAgICogVXBkYXRlcyB0aGUgdmlkZW8gb2JqZWN0IGZyb20gdGhlIGFzc29jaWF0ZWQgdmlkZW8gbmFtZS4gSXQgYWxzbyB1cGRhdGVzXG4gICAgKiB0aGUgdmlkZW8tcmVuZGVyaW5nIHByb2Nlc3MuXG4gICAgKiBAbWV0aG9kIHVwZGF0ZVZpZGVvXG4gICAgIyMjXG4gICAgdXBkYXRlVmlkZW86IC0+XG4gICAgICAgIGlmIEBvYmplY3QudmlkZW8gIT0gQHZpZGVvTmFtZVxuICAgICAgICAgICAgQHZpZGVvTmFtZSA9IEBvYmplY3QudmlkZW9cbiAgICAgICAgICAgIEBzcHJpdGUudmlkZW8gPSBSZXNvdXJjZU1hbmFnZXIuZ2V0VmlkZW8oXCIje0BvYmplY3QudmlkZW9Gb2xkZXIgPyBcIk1vdmllc1wifS8je0BvYmplY3QudmlkZW99XCIpXG4gICAgICAgICAgICBpZiBAc3ByaXRlLnZpZGVvP1xuICAgICAgICAgICAgICAgIGlmICRQQVJBTVMucHJldmlldz8uc2V0dGluZ3MubXVzaWNEaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICBAc3ByaXRlLnZpZGVvLnZvbHVtZSA9IDBcbiAgICAgICAgICAgICAgICBAc3ByaXRlLnZpZGVvLmxvb3AgPSBAb2JqZWN0Lmxvb3BcbiAgICAgICAgICAgICAgICBAc3ByaXRlLnZpZGVvLnBsYXkoKVxuXG4gICAgICAgICAgICAgICAgQG9iamVjdC5zcmNSZWN0ID0gbmV3IFJlY3QoMCwgMCwgQHNwcml0ZS52aWRlby53aWR0aCwgQHNwcml0ZS52aWRlby5oZWlnaHQpXG4gICAgICAgICAgICAgICAgaWYgbm90IEBvYmplY3QuZml4ZWRTaXplXG4gICAgICAgICAgICAgICAgICAgIEBvYmplY3QuZHN0UmVjdCA9IG5ldyBSZWN0KEBvYmplY3QuZHN0UmVjdC54LCBAb2JqZWN0LmRzdFJlY3QueSwgQHNwcml0ZS52aWRlby53aWR0aCwgQHNwcml0ZS52aWRlby5oZWlnaHQpXG5cbiAgICAgICAgQHNwcml0ZS52aWRlbz8udXBkYXRlKClcblxuICAgICMjIypcbiAgICAqIFVwZGF0ZXMgdGhlIGltYWdlIGlmIHRoZSBnYW1lIG9iamVjdCBoYXMgdGhlIGltYWdlLXByb3BlcnR5IHNldC5cbiAgICAqIEBtZXRob2QgdXBkYXRlSW1hZ2VcbiAgICAjIyNcbiAgICB1cGRhdGVJbWFnZTogLT5cbiAgICAgICAgaWYgQG9iamVjdC5pbWFnZT9cbiAgICAgICAgICAgIGlmIEBvYmplY3QuaW1hZ2UgIT0gQGltYWdlIG9yICghQGltYWdlTG9hZGVkIGFuZCBAc3ByaXRlLmJpdG1hcD8ubG9hZGVkKVxuICAgICAgICAgICAgICAgIEB1cGRhdGVCaXRtYXAoKVxuICAgICAgICAgICAgICAgIEB1cGRhdGVSZWN0KClcbiAgICAgICAgZWxzZSBpZiBAb2JqZWN0LmJpdG1hcD9cbiAgICAgICAgICAgIEBzcHJpdGUuYml0bWFwID0gQG9iamVjdC5iaXRtYXBcbiAgICAgICAgZWxzZSBpZiBAb2JqZWN0LnZpZGVvPyBvciBAdmlkZW9OYW1lICE9IEBvYmplY3QudmlkZW9cbiAgICAgICAgICAgIEB1cGRhdGVWaWRlbygpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBpbWFnZSA9IG51bGxcbiAgICAgICAgICAgIEBvYmplY3QuYml0bWFwID0gbnVsbFxuICAgICAgICAgICAgQHNwcml0ZS5iaXRtYXAgPSBudWxsXG5cbiAgICAjIyMqXG4gICAgKiBJZiB0aGUgc3ByaXRlIGlzIHVubWFuYWdlZCwgdGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlXG4gICAgKiBzcHJpdGUuIElmIHRoZSBzcHJpdGUgbGVhdmVzIHRoZSB2aWV3cG9ydCwgaXQgd2lsbCBiZSByZW1vdmVkIHRvIHNhdmVcbiAgICAqIHBlcmZvcm1hbmNlIGFuZCBhdXRvbWF0aWNhbGx5IGFkZGVkIGJhY2sgdG8gdGhlIHZpZXdwb3J0IGlmIGl0IGVudGVyc1xuICAgICogdGhlIHZpZXdwb3J0LlxuICAgICogQG1ldGhvZCB1cGRhdGVWaXNpYmlsaXR5XG4gICAgIyMjXG4gICAgdXBkYXRlVmlzaWJpbGl0eTogLT5cbiAgICAgICAgaWYgIUBzcHJpdGUubWFuYWdlZFxuICAgICAgICAgICAgdmlzaWJsZSA9IFJlY3QuaW50ZXJzZWN0KEBvYmplY3QuZHN0UmVjdC54K0BvYmplY3Qub3JpZ2luLngsIEBvYmplY3QuZHN0UmVjdC55K0BvYmplY3Qub3JpZ2luLnksIEBvYmplY3QuZHN0UmVjdC53aWR0aCwgQG9iamVjdC5kc3RSZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLCAwLCBHcmFwaGljcy53aWR0aCwgR3JhcGhpY3MuaGVpZ2h0KVxuICAgICAgICAgICAgaWYgdmlzaWJsZSBhbmQgIUB2aXNpYmxlXG4gICAgICAgICAgICAgICAgKEBvYmplY3Qudmlld3BvcnQgfHwgR3JhcGhpY3Mudmlld3BvcnQpLmFkZEdyYXBoaWNPYmplY3QoQHNwcml0ZSlcbiAgICAgICAgICAgICAgICBAdmlzaWJsZSA9IHllc1xuXG4gICAgICAgICAgICBpZiAhdmlzaWJsZSBhbmQgQHZpc2libGVcbiAgICAgICAgICAgICAgICAoQG9iamVjdC52aWV3cG9ydCB8fCBHcmFwaGljcy52aWV3cG9ydCkucmVtb3ZlR3JhcGhpY09iamVjdChAc3ByaXRlKVxuICAgICAgICAgICAgICAgIEB2aXNpYmxlID0gbm9cblxuXG4gICAgIyMjKlxuICAgICogVXBkYXRlcyB0aGUgcGFkZGluZy5cbiAgICAqIEBtZXRob2QgdXBkYXRlUGFkZGluZ1xuICAgICMjI1xuICAgIHVwZGF0ZVBhZGRpbmc6IC0+XG4gICAgICAgIGlmIEBvYmplY3QucGFkZGluZz9cbiAgICAgICAgICAgIEBzcHJpdGUueCArPSBAb2JqZWN0LnBhZGRpbmcubGVmdFxuICAgICAgICAgICAgQHNwcml0ZS55ICs9IEBvYmplY3QucGFkZGluZy50b3BcbiAgICAgICAgICAgIEBzcHJpdGUuem9vbVggLT0gKEBvYmplY3QucGFkZGluZy5sZWZ0K0BvYmplY3QucGFkZGluZy5yaWdodCkgLyBAb2JqZWN0LnNyY1JlY3Qud2lkdGhcbiAgICAgICAgICAgIEBzcHJpdGUuem9vbVkgLT0gKEBvYmplY3QucGFkZGluZy5ib3R0b20rQG9iamVjdC5wYWRkaW5nLmJvdHRvbSkgLyBAb2JqZWN0LnNyY1JlY3QuaGVpZ2h0XG5cbiAgICAjIyMqXG4gICAgKiBVcGRhdGVzIHRoZSBzcHJpdGUgcHJvcGVydGllcyBmcm9tIHRoZSBnYW1lIG9iamVjdCBwcm9wZXJ0aWVzLlxuICAgICogQG1ldGhvZCB1cGRhdGVQcm9wZXJ0aWVzXG4gICAgIyMjXG4gICAgdXBkYXRlUHJvcGVydGllczogLT5cbiAgICAgICAgQHNwcml0ZS53aWR0aCA9IEBvYmplY3QuZHN0UmVjdC53aWR0aFxuICAgICAgICBAc3ByaXRlLmhlaWdodCA9IEBvYmplY3QuZHN0UmVjdC5oZWlnaHRcbiAgICAgICAgQHNwcml0ZS54ID0gQG9iamVjdC5kc3RSZWN0LnhcbiAgICAgICAgQHNwcml0ZS55ID0gQG9iamVjdC5kc3RSZWN0LnlcbiAgICAgICAgQHNwcml0ZS5tYXNrID0gQG9iamVjdC5tYXNrID8gQG1hc2tcbiAgICAgICAgQHNwcml0ZS5hbmdsZSA9IEBvYmplY3QuYW5nbGUgfHwgMFxuICAgICAgICBAc3ByaXRlLm9wYWNpdHkgPSBAb2JqZWN0Lm9wYWNpdHkgPyAyNTVcbiAgICAgICAgQHNwcml0ZS5jbGlwUmVjdCA9IEBvYmplY3QuY2xpcFJlY3RcbiAgICAgICAgQHNwcml0ZS5zcmNSZWN0ID0gQG9iamVjdC5zcmNSZWN0XG4gICAgICAgIEBzcHJpdGUuYmxlbmRpbmdNb2RlID0gQG9iamVjdC5ibGVuZE1vZGUgfHwgMFxuICAgICAgICBAc3ByaXRlLm1pcnJvciA9IEBvYmplY3QubWlycm9yXG4gICAgICAgIEBzcHJpdGUudmlzaWJsZSA9IEBvYmplY3QudmlzaWJsZSBhbmQgKCFAb2JqZWN0LnBhcmVudCBvciAhQG9iamVjdC5wYXJlbnQudmlzaWJsZT8gb3IgQG9iamVjdC5wYXJlbnQudmlzaWJsZSlcbiAgICAgICAgQHNwcml0ZS5veCA9IC1Ab2JqZWN0Lm9yaWdpbi54XG4gICAgICAgIEBzcHJpdGUub3kgPSAtQG9iamVjdC5vcmlnaW4ueVxuICAgICAgICBAc3ByaXRlLnogPSAoQG9iamVjdC56SW5kZXggfHwgMCkgKyAoaWYgIUBvYmplY3QucGFyZW50IHRoZW4gMCBlbHNlIEBvYmplY3QucGFyZW50LnpJbmRleCB8fCAwKVxuXG4gICAgIyMjKlxuICAgICogVXBkYXRlcyB0aGUgb3B0aW9uYWwgc3ByaXRlIHByb3BlcnRpZXMgZnJvbSB0aGUgZ2FtZSBvYmplY3QgcHJvcGVydGllcy5cbiAgICAqIEBtZXRob2QgdXBkYXRlT3B0aW9uYWxQcm9wZXJ0aWVzXG4gICAgIyMjXG4gICAgdXBkYXRlT3B0aW9uYWxQcm9wZXJ0aWVzOiAtPlxuICAgICAgICBpZiBAb2JqZWN0LnRvbmU/XG4gICAgICAgICAgICBAc3ByaXRlLnRvbmUgPSBAb2JqZWN0LnRvbmVcbiAgICAgICAgaWYgQG9iamVjdC5jb2xvcj9cbiAgICAgICAgICAgIEBzcHJpdGUuY29sb3IgPSBAb2JqZWN0LmNvbG9yXG4gICAgICAgIGlmIEBvYmplY3Qudmlld3BvcnQ/XG4gICAgICAgICAgICBAc3ByaXRlLnZpZXdwb3J0ID0gQG9iamVjdC52aWV3cG9ydFxuICAgICAgICBpZiBAb2JqZWN0LmVmZmVjdHM/XG4gICAgICAgICAgICBAc3ByaXRlLmVmZmVjdHMgPSBAb2JqZWN0LmVmZmVjdHNcbiAgICAgICAgaWYgQG9iamVjdC5hbmNob3I/XG4gICAgICAgICAgICBAc3ByaXRlLmFuY2hvci54ID0gQG9iamVjdC5hbmNob3IueFxuICAgICAgICAgICAgQHNwcml0ZS5hbmNob3IueSA9IEBvYmplY3QuYW5jaG9yLnlcbiAgICAgICAgaWYgQG9iamVjdC5wb3NpdGlvbkFuY2hvcj9cbiAgICAgICAgICAgIEBzcHJpdGUucG9zaXRpb25BbmNob3IgPSBAb2JqZWN0LnBvc2l0aW9uQW5jaG9yXG4gICAgICAgIGlmIEBvYmplY3Quem9vbT9cbiAgICAgICAgICAgIEBzcHJpdGUuem9vbVggPSBAb2JqZWN0Lnpvb20ueFxuICAgICAgICAgICAgQHNwcml0ZS56b29tWSA9IEBvYmplY3Quem9vbS55XG4gICAgICAgIGlmIEBvYmplY3QubW90aW9uQmx1cj9cbiAgICAgICAgICAgIEBzcHJpdGUubW90aW9uQmx1ciA9IEBvYmplY3QubW90aW9uQmx1clxuXG4gICAgIyMjKlxuICAgICogVXBkYXRlcyB0aGUgc3ByaXRlIGNvbXBvbmVudCBieSB1cGRhdGluZyBpdHMgdmlzaWJpbGl0eSwgaW1hZ2UsIHBhZGRpbmcgYW5kXG4gICAgKiBwcm9wZXJ0aWVzLlxuICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAjIyNcbiAgICB1cGRhdGU6IC0+XG4gICAgICAgIHN1cGVyXG5cbiAgICAgICAgQHNldHVwKCkgaWYgbm90IEBpc1NldHVwXG4gICAgICAgIEB1cGRhdGVWaXNpYmlsaXR5KClcbiAgICAgICAgQHVwZGF0ZUltYWdlKClcbiAgICAgICAgQHVwZGF0ZVByb3BlcnRpZXMoKVxuICAgICAgICBAdXBkYXRlT3B0aW9uYWxQcm9wZXJ0aWVzKClcbiAgICAgICAgQHVwZGF0ZVBhZGRpbmcoKVxuXG4gICAgICAgIEBvYmplY3QuckluZGV4ID0gQHNwcml0ZS5pbmRleFxuICAgICAgICBAc3ByaXRlLnVwZGF0ZSgpXG5cblxuIyMjKlxuKiBFbnVtZXJhdGlvbiBvZiBhcHBlYXJhbmNlIGFuaW1hdGlvbnMuXG4qXG4qIEBtb2R1bGUgZ3NcbiogQGNsYXNzIEFuaW1hdGlvblR5cGVzXG4qIEBzdGF0aWNcbiogQG1lbWJlcm9mIGdzXG4jIyNcbmNsYXNzIEFuaW1hdGlvblR5cGVzXG4gICAgQGluaXRpYWxpemU6IC0+XG4gICAgICAgICMjIypcbiAgICAgICAgKiBBbiBvYmplY3QgYXBwZWFycyBvciBkaXNhcHBlYXJzIGJ5IG1vdmluZyBpbnRvIG9yIG91dCBvZiB0aGUgc2NyZWVuLlxuICAgICAgICAqIEBwcm9wZXJ0eSBNT1ZFTUVOVFxuICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgKiBAZmluYWxcbiAgICAgICAgIyMjXG4gICAgICAgIEBNT1ZFTUVOVCA9IDBcbiAgICAgICAgIyMjKlxuICAgICAgICAqIEFuIG9iamVjdCBhcHBlYXJzIG9yIGRpc2FwcGVhcnMgdXNpbmcgYWxwaGEtYmxlbmRpbmcuXG4gICAgICAgICogQHByb3BlcnR5IEJMRU5ESU5HXG4gICAgICAgICogQHR5cGUgbnVtYmVyXG4gICAgICAgICogQHN0YXRpY1xuICAgICAgICAqIEBmaW5hbFxuICAgICAgICAjIyNcbiAgICAgICAgQEJMRU5ESU5HID0gMVxuICAgICAgICAjIyMqXG4gICAgICAgICogQW4gb2JqZWN0IGFwcGVhcnMgb3IgZGlzYXBwZWFycyB1c2luZyBhIG1hc2staW1hZ2UuXG4gICAgICAgICogQHByb3BlcnR5IE1BU0tJTkdcbiAgICAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICogQGZpbmFsXG4gICAgICAgICMjI1xuICAgICAgICBATUFTS0lORyA9IDJcblxuQW5pbWF0aW9uVHlwZXMuaW5pdGlhbGl6ZSgpXG5ncy5BbmltYXRpb25UeXBlcyA9IEFuaW1hdGlvblR5cGVzXG5ncy5Db21wb25lbnRfU3ByaXRlID0gQ29tcG9uZW50X1Nwcml0ZVxuIl19
//# sourceURL=Component_Sprite_70.js