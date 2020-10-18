var ResourceManager, ResourceManagerContext;

ResourceManagerContext = (function() {

  /**
  * If associated to a gs.ResourceManager, a resource context registers all loaded resources
  * resources. If gs.ResourceManager needs to dispose resources, it will only dispose
  * resource associated if the current context.
  *
  * By default, each game scene creates it's own resource context to only dispose resources
  * created by itself.
  *
  * @module gs
  * @class ResourceManager
  * @memberof gs
  * @constructor
   */
  function ResourceManagerContext() {

    /**
    * All resources associated with this context.
    * @property resources
    * @type Object[]
    * @readOnly
     */
    this.resources = [];
  }


  /**
  * Converts the resource context into a data-bundle for serialization. The data-bundle will only contain
  * the names of the resources associated with this context but not the resource-data itself.
  * @method toDataBundle
  * @return {string[]} An array of resource names associated with this context.
   */

  ResourceManagerContext.prototype.toDataBundle = function() {
    return this.resources.select(function(r) {
      return r.name;
    });
  };


  /**
  * Initializes the resource context from a data-bundle. Any already existing resource associations
  * with this context will be deleted.
  * @method fromDataBundle
   */

  ResourceManagerContext.prototype.fromDataBundle = function(data, resourcesByPath) {
    return this.resources = data.select(function(n) {
      return {
        name: n,
        data: resourcesByPath[n]
      };
    });
  };


  /**
  * Adds the specified resource to the context.
  * @method add
  * @param {string} name - A unique name for the resource like the file-path for example.
  * @param {gs.Bitmap|gs.AudioBuffer|gs.Video|gs.Live2DModel} data - The resource data like a gs.Bitmap object for example.
   */

  ResourceManagerContext.prototype.add = function(name, resource) {
    return this.resources.push({
      name: name,
      data: resource
    });
  };


  /**
  * Removes the resource with the specified name from the context.
  * @method remove
  * @param {string} name - The name of the resource to remove. For Example: The file name.
   */

  ResourceManagerContext.prototype.remove = function(name) {
    return this.resources.remove(this.resources.first(function(r) {
      return r.name === name;
    }));
  };

  return ResourceManagerContext;

})();

gs.ResourceManagerContext = ResourceManagerContext;

ResourceManager = (function() {

  /**
  * Manages the resources of the game like graphics, audio, fonts, etc. It
  * offers a lot of methods to easily access game resources and automatically
  * caches them. So if an image is requested a second time it will be taken
  * from the cache instead of loading it again.
  *
  * @module gs
  * @class ResourceManager
  * @memberof gs
  * @constructor
   */
  function ResourceManager() {

    /**
    * Current resource context. All loaded resources will be associated with it. If current context
    * is set to <b>null</b>, the <b>systemContext</b> is used instead.
    * @property context
    * @type gs.ResourceManagerContext
    * @protected
     */
    this.context_ = null;

    /**
    * System resource context. All loaded system resources are associated with this context. Resources
    * which are associated with the system context are not disposed until the game ends.
    * @property context
    * @type gs.ResourceManagerContext
     */
    this.systemContext = this.createContext();

    /**
    * Holds in-memory created bitmaps.
    * @property customBitmapsByKey
    * @type Object
    * @protected
     */
    this.customBitmapsByKey = {};

    /**
    * Caches resources by file path.
    * @property resourcesByPath
    * @type Object
    * @protected
     */
    this.resourcesByPath = {};

    /**
    * Caches resources by file path and HUE.
    * @property resourcesByPath
    * @type Object
    * @protected
     */
    this.resourcesByPathHue = {};

    /**
    * Stores all loaded resources.
    * @property resources
    * @type Object[]
     */
    this.resources = [];

    /**
    * Indicates if all requested resources are loaded.
    * @property resourcesLoaded
    * @type boolean
     */
    this.resourcesLoaded = true;

    /**
    * @property events
    * @type gs.EventEmitter
     */
    this.events = new gs.EventEmitter();
  }


  /**
  * Current resource context. All loaded resources will be associated with it. If current context
  * is set to <b>null</b>, the <b>systemContext</b> is used instead.
  * @property context
  * @type gs.ResourceManagerContext
   */

  ResourceManager.accessors("context", {
    set: function(v) {
      return this.context_ = v;
    },
    get: function() {
      var ref;
      return (ref = this.context_) != null ? ref : this.systemContext;
    }
  });


  /**
  * Creates a new resource context. Use <b>context</b> to set the new created context
  * as current context.
  *
  * @method createContext
   */

  ResourceManager.prototype.createContext = function() {
    return new gs.ResourceManagerContext();
  };


  /**
  * Disposes all bitmap resources associated with the current context.
  *
  * @method disposeBitmaps
   */

  ResourceManager.prototype.disposeBitmaps = function() {
    var j, len, ref, resource, results;
    ref = this.context.resources;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      resource = ref[j];
      if (resource.data instanceof gs.Bitmap) {
        resource.data.dispose();
        this.resources.remove(this.resources.first((function(r) {
          var result;
          result = r.filePath === resource.data.filePath;
          if (result) {
            r.dispose();
          }
          return result;
        })));
        this.resources.remove(resource.data);
        if (resource.name) {
          this.resourcesByPath[resource.name] = null;
          results.push(delete this.resourcesByPath[resource.name]);
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };


  /**
  * Disposes all video resources associated with the current context.
  *
  * @method disposeVideos
   */

  ResourceManager.prototype.disposeVideos = function() {
    var j, len, ref, resource, results;
    ref = this.context.resources;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      resource = ref[j];
      if (resource.data instanceof gs.Video) {
        resource.data.dispose();
        this.resources.remove(resource.data);
        this.resourcesByPath[resource.name] = null;
        results.push(delete this.resourcesByPath[resource.name]);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };


  /**
  * Disposes all audio resources associated with the current context.
  *
  * @method disposeAudio
   */

  ResourceManager.prototype.disposeAudio = function() {
    var j, len, ref, resource, results;
    AudioManager.dispose(this.context);
    ref = this.context.resources;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      resource = ref[j];
      if (resource.data instanceof GS.AudioBuffer || resource instanceof GS.AudioBufferStream) {
        resource.data.dispose();
        this.resources.remove(resource.data);
        this.resourcesByPath[resource.name] = null;
        results.push(delete this.resourcesByPath[resource.name]);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };


  /**
  * Disposes all Live2D resources associated with the current context.
  *
  * @method disposeLive2D
   */

  ResourceManager.prototype.disposeLive2D = function() {
    var j, len, ref, resource, results;
    ref = this.context.resources;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      resource = ref[j];
      if (resource.data instanceof gs.Live2DModel) {
        resource.data.dispose();
        this.resources.remove(resource.data);
        this.resourcesByPath[resource.name] = null;
        results.push(delete this.resourcesByPath[resource.name]);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };


  /**
  * Disposes all resources.
  *
  * @method dispose
   */

  ResourceManager.prototype.dispose = function() {
    this.disposeBitmaps();
    this.disposeVideos();
    this.disposeAudio();
    this.disposeLive2D();
    return this.context = this.systemContext;
  };


  /**
  * Loads all custom fonts in Graphics/Fonts folder.
  *
  * @method loadFonts
   */

  ResourceManager.prototype.loadFonts = function() {
    var resource;
    resource = {
      loaded: false
    };
    this.resources.push(resource);
    this.resourcesByPath["Graphics/Fonts"] = resource;
    return gs.Font.loadCustomFonts((function(_this) {
      return function(error) {
        _this.resourcesByPath["Graphics/Fonts"].loaded = true;
        if (error) {
          return _this.resourcesByPath["Graphics/Fonts"].error = true;
        }
      };
    })(this));
  };


  /**
  * Gets a custom created bitmap by key.
  *
  * @method getCustomBitmap
  * @param {String} key - The key for the bitmap to get.
  * @return {gs.Bitmap} The bitmap or <b>null</b> if no bitmap exists for the specified key.
   */

  ResourceManager.prototype.getCustomBitmap = function(key) {
    return this.customBitmapsByKey[key];
  };


  /**
  * Sets a custom created bitmap for a specified key.
  *
  * @method setCustomBitmap
  * @param {String} key - The key for the bitmap to set.
  * @param {gs.Bitmap} bitmap - The bitmap to set.
   */

  ResourceManager.prototype.setCustomBitmap = function(key, bitmap) {
    this.customBitmapsByKey[key] = bitmap;
    if (bitmap.loaded == null) {
      this.resources.push(bitmap);
      return this.resourcesLoaded = false;
    }
  };


  /**
  * Adds a custom created bitmap to the resource manager.
  *
  * @method addCustomBitmap
  * @param {gs.Bitmap} bitmap - The bitmap to add.
   */

  ResourceManager.prototype.addCustomBitmap = function(bitmap) {
    return this.context.resources.push({
      name: "",
      data: bitmap
    });
  };


  /**
  * Gets a Live2D model.
  *
  * @method getLive2DModel
  * @param {String} filePath - Path to the Live2D model file.
  * @return {gs.Live2DModel} The Live2D model or <b>null</b> if no model exists at the specified file path.
   */

  ResourceManager.prototype.getLive2DModel = function(filePath) {
    var profile, result;
    result = this.resourcesByPath[filePath];
    if ((result == null) || result.disposed) {
      profile = LanguageManager.profile;
      result = new gs.Live2DModel(filePath, ((profile != null) && (profile.items != null) ? profile.items.code : null));
      this.resourcesByPath[filePath] = result;
      this.resources.push(result);
      this.resourcesLoaded = false;
      this.context.resources.push({
        name: filePath,
        data: result
      });
    }
    return result;
  };


  /**
  * Gets a font.
  *
  * @method getFont
  * @param {String} name - The name of the font to get.
  * @param {number} size - The size of the font to get.
  * @return {gs.Font} The font or <b>null</b> if no font with the specified name exists.
   */

  ResourceManager.prototype.getFont = function(name, size) {
    var result;
    result = new Font(name, size);
    this.resources.push(result);
    this.resourcesLoaded = false;
    return result;
  };


  /**
  * Gets a video.
  *
  * @method getVideo
  * @param {String} filePath - Path to the video file.
  * @return {gs.Video} The video or <b>null</b> if no video exists at the specified file path.
   */

  ResourceManager.prototype.getVideo = function(filePath) {
    var profile, result;
    if (filePath.endsWith("/")) {
      return null;
    }
    result = this.resourcesByPath[filePath];
    if ((result == null) || result.disposed) {
      profile = LanguageManager.profile;
      result = new gs.Video(filePath, ((profile != null) && (profile.items != null) ? profile.items.code : null));
      this.resourcesByPath[filePath] = result;
      this.resources.push(result);
      this.resourcesLoaded = false;
      this.context.resources.push({
        name: filePath,
        data: result
      });
    }
    return result;
  };


  /**
  * Gets the correct file path for the specified resource.
  *
  * @method getPath
  * @param {Object} resource - The resource object which is usually stored inside a command's params or in data records.
  * @return {String} The correct file path for the specified resource.
   */

  ResourceManager.prototype.getPath = function(resource) {
    if (resource != null) {
      return resource.folderPath + "/" + resource.name;
    } else {
      return "";
    }
  };


  /**
  * Gets a bitmap.
  *
  * @method getBitmap
  * @param {String|Object} filePath - Path to the bitmap file OR a graphic info object.
  * @param {number} hue - The bitmap's hue. The bitmap will be loaded and then recolored.
  * @return {gs.Bitmap} The bitmap or <b>null</b> if no bitmap exists at the specified file path.
   */

  ResourceManager.prototype.getBitmap = function(filePath, hue) {
    var hueBitmap, profile, result;
    if (filePath.endsWith("/")) {
      return null;
    }
    hue = hue || 0;
    result = this.resourcesByPath[filePath] || this.customBitmapsByKey[filePath];
    if (result == null) {
      profile = LanguageManager.profile;
      result = new Bitmap(filePath, ((profile != null) && (profile.items != null) ? profile.items.code : null), false);
      result.hue = hue;
      result.filePath = filePath;
      this.resourcesByPath[filePath] = result;
      this.resources.push(result);
      this.resourcesLoaded = false;
      this.context.resources.push({
        name: filePath,
        data: result
      });
    } else if (!result.loaded && result.hue !== hue) {
      profile = LanguageManager.profile;
      result = new Bitmap(filePath, ((profile != null) && (profile.items != null) ? profile.items.code : null));
      result.hue = hue;
      result.filePath = filePath;
      this.resources.push(result);
      this.resourcesLoaded = false;
    } else if (hue > 0) {
      hueBitmap = this.resourcesByPathHue[filePath + "@" + hue];
      if ((hueBitmap == null) && result.loaded) {
        hueBitmap = new Bitmap(result.image);
        hueBitmap.changeHue(hue);
        this.resourcesByPathHue[filePath + "@" + hue] = hueBitmap;
      }
      if (hueBitmap != null) {
        result = hueBitmap;
      }
    }
    return result;
  };


  /**
  * Gets an HTML image.
  *
  * @method getImage
  * @param {String} filePath - Path to the image file.
  * @return {HTMLImageElement} The image or <b>null</b> if no image exists at the specified file path.
   */

  ResourceManager.prototype.getImage = function(filePath) {
    var result;
    result = this.resourcesByPath[filePath];
    if (result == null) {
      result = new Bitmap("resources/" + filePath + ".png");
      this.resourcesByPath[filePath] = result;
      this.resources.push(result);
      this.resourcesLoaded = false;
    }
    return result;
  };


  /**
  * Gets an audio stream.
  *
  * @method getAudioStream
  * @param {String} filePath - Path to the audio file.
  * @return {gs.AudioBuffer} The audio buffer or <b>null</b> if no audio file exists at the specified file path.
   */

  ResourceManager.prototype.getAudioStream = function(filePath) {
    var languageCode, profile, result;
    result = this.resourcesByPath[filePath];
    profile = LanguageManager.profile;
    languageCode = (profile != null) && (profile.items != null) ? profile.items.code : null;
    if (result == null) {
      result = new GS.AudioBuffer(filePath);
      this.resourcesByPath[filePath] = result;
      this.resources.push(result);
      this.resourcesLoaded = false;
      this.context.resources.push({
        name: filePath,
        data: result
      });
    }
    return result;
  };


  /**
  * Gets an audio buffer. The audio data is fully loaded and decoded in memory. It is recommeneded
  * for sound effects but for a long background music, <b>getAudioStream</b> should be used instead. That is especially
  * the case on mobile devices.
  *
  * @method getAudioBuffer
  * @param {String} filePath - Path to the audio file.
  * @return {gs.AudioBuffer} The audio buffer or <b>null</b> if no audio file exists at the specified file path.
   */

  ResourceManager.prototype.getAudioBuffer = function(filePath) {
    var languageCode, profile, result;
    result = this.resourcesByPath[filePath];
    profile = LanguageManager.profile;
    languageCode = (profile != null) && (profile.items != null) ? profile.items.code : null;
    if (result == null) {
      result = new GS.AudioBuffer(filePath);
      this.resourcesByPath[filePath] = result;
      this.resources.push(result);
      this.resourcesLoaded = false;
      this.context.resources.push({
        name: filePath,
        data: result
      });
    }
    return result;
  };


  /**
  * Updates the loading process. Needs to be called once per frame to keep
  * the ResourceManager up to date.
  *
  * @method update
   */

  ResourceManager.prototype.update = function() {
    var bitmap, i, j, ref;
    if (this.events == null) {
      this.events = new gs.EventEmitter();
    }
    if (!this.resourcesLoaded) {
      this.resourcesLoaded = true;
      for (i = j = 0, ref = this.resources.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (!this.resources[i].loaded) {
          this.resourcesLoaded = false;
          break;
        } else if ((this.resources[i].hue != null) && this.resources[i].hue > 0) {
          bitmap = new Bitmap(this.resources[i].image);
          this.resourcesByPath[this.resources[i].filePath] = bitmap;
          this.resources[i].changeHue(this.resources[i].hue);
          this.resourcesByPathHue[this.resources[i].filePath + "@" + this.resources[i].hue] = this.resources[i];
          delete this.resources[i].filePath;
          delete this.resources[i].hue;
        }
      }
      if (this.resourcesLoaded) {
        this.events.emit("loaded", this);
      }
    }
    return null;
  };

  return ResourceManager;

})();

window.ResourceManager = ResourceManager;

gs.ResourceManager = ResourceManager;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUE7O0FBQU07O0FBQ0Y7Ozs7Ozs7Ozs7Ozs7RUFhYSxnQ0FBQTs7QUFDVDs7Ozs7O0lBTUEsSUFBQyxDQUFBLFNBQUQsR0FBYTtFQVBKOzs7QUFVYjs7Ozs7OzttQ0FNQSxZQUFBLEdBQWMsU0FBQTtXQUFHLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBWCxDQUFrQixTQUFDLENBQUQ7YUFBTyxDQUFDLENBQUM7SUFBVCxDQUFsQjtFQUFIOzs7QUFFZDs7Ozs7O21DQUtBLGNBQUEsR0FBZ0IsU0FBQyxJQUFELEVBQU8sZUFBUDtXQUEyQixJQUFDLENBQUEsU0FBRCxHQUFhLElBQUksQ0FBQyxNQUFMLENBQVksU0FBQyxDQUFEO2FBQU87UUFBQSxJQUFBLEVBQU0sQ0FBTjtRQUFTLElBQUEsRUFBTSxlQUFnQixDQUFBLENBQUEsQ0FBL0I7O0lBQVAsQ0FBWjtFQUF4Qzs7O0FBRWhCOzs7Ozs7O21DQU1BLEdBQUEsR0FBSyxTQUFDLElBQUQsRUFBTyxRQUFQO1dBQW9CLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFnQjtNQUFFLElBQUEsRUFBTSxJQUFSO01BQWMsSUFBQSxFQUFNLFFBQXBCO0tBQWhCO0VBQXBCOzs7QUFFTDs7Ozs7O21DQUtBLE1BQUEsR0FBUSxTQUFDLElBQUQ7V0FBVSxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQVgsQ0FBa0IsSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFYLENBQWlCLFNBQUMsQ0FBRDthQUFPLENBQUMsQ0FBQyxJQUFGLEtBQVU7SUFBakIsQ0FBakIsQ0FBbEI7RUFBVjs7Ozs7O0FBRVosRUFBRSxDQUFDLHNCQUFILEdBQTRCOztBQUV0Qjs7QUFDRjs7Ozs7Ozs7Ozs7RUFXYSx5QkFBQTs7QUFDVDs7Ozs7OztJQU9BLElBQUMsQ0FBQSxRQUFELEdBQVk7O0FBRVo7Ozs7OztJQU1BLElBQUMsQ0FBQSxhQUFELEdBQWlC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LENBQUEsZUFBSjtRQUNJLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLFFBQWIsRUFBdUIsSUFBdkIsRUFESjtPQWRKOztBQWlCQSxXQUFPO0VBbkJIOzs7Ozs7QUFxQlosTUFBTSxDQUFDLGVBQVAsR0FBeUI7O0FBQ3pCLEVBQUUsQ0FBQyxlQUFILEdBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jXG4jICAgU2NyaXB0OiBSZXNvdXJjZU1hbmFnZXJcbiNcbiMgICAkJENPUFlSSUdIVCQkXG4jXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmNsYXNzIFJlc291cmNlTWFuYWdlckNvbnRleHRcbiAgICAjIyMqXG4gICAgKiBJZiBhc3NvY2lhdGVkIHRvIGEgZ3MuUmVzb3VyY2VNYW5hZ2VyLCBhIHJlc291cmNlIGNvbnRleHQgcmVnaXN0ZXJzIGFsbCBsb2FkZWQgcmVzb3VyY2VzXG4gICAgKiByZXNvdXJjZXMuIElmIGdzLlJlc291cmNlTWFuYWdlciBuZWVkcyB0byBkaXNwb3NlIHJlc291cmNlcywgaXQgd2lsbCBvbmx5IGRpc3Bvc2VcbiAgICAqIHJlc291cmNlIGFzc29jaWF0ZWQgaWYgdGhlIGN1cnJlbnQgY29udGV4dC5cbiAgICAqXG4gICAgKiBCeSBkZWZhdWx0LCBlYWNoIGdhbWUgc2NlbmUgY3JlYXRlcyBpdCdzIG93biByZXNvdXJjZSBjb250ZXh0IHRvIG9ubHkgZGlzcG9zZSByZXNvdXJjZXNcbiAgICAqIGNyZWF0ZWQgYnkgaXRzZWxmLlxuICAgICpcbiAgICAqIEBtb2R1bGUgZ3NcbiAgICAqIEBjbGFzcyBSZXNvdXJjZU1hbmFnZXJcbiAgICAqIEBtZW1iZXJvZiBnc1xuICAgICogQGNvbnN0cnVjdG9yXG4gICAgIyMjXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgICMjIypcbiAgICAgICAgKiBBbGwgcmVzb3VyY2VzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNvbnRleHQuXG4gICAgICAgICogQHByb3BlcnR5IHJlc291cmNlc1xuICAgICAgICAqIEB0eXBlIE9iamVjdFtdXG4gICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICMjI1xuICAgICAgICBAcmVzb3VyY2VzID0gW11cblxuXG4gICAgIyMjKlxuICAgICogQ29udmVydHMgdGhlIHJlc291cmNlIGNvbnRleHQgaW50byBhIGRhdGEtYnVuZGxlIGZvciBzZXJpYWxpemF0aW9uLiBUaGUgZGF0YS1idW5kbGUgd2lsbCBvbmx5IGNvbnRhaW5cbiAgICAqIHRoZSBuYW1lcyBvZiB0aGUgcmVzb3VyY2VzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNvbnRleHQgYnV0IG5vdCB0aGUgcmVzb3VyY2UtZGF0YSBpdHNlbGYuXG4gICAgKiBAbWV0aG9kIHRvRGF0YUJ1bmRsZVxuICAgICogQHJldHVybiB7c3RyaW5nW119IEFuIGFycmF5IG9mIHJlc291cmNlIG5hbWVzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNvbnRleHQuXG4gICAgIyMjXG4gICAgdG9EYXRhQnVuZGxlOiAtPiBAcmVzb3VyY2VzLnNlbGVjdCAocikgLT4gci5uYW1lXG5cbiAgICAjIyMqXG4gICAgKiBJbml0aWFsaXplcyB0aGUgcmVzb3VyY2UgY29udGV4dCBmcm9tIGEgZGF0YS1idW5kbGUuIEFueSBhbHJlYWR5IGV4aXN0aW5nIHJlc291cmNlIGFzc29jaWF0aW9uc1xuICAgICogd2l0aCB0aGlzIGNvbnRleHQgd2lsbCBiZSBkZWxldGVkLlxuICAgICogQG1ldGhvZCBmcm9tRGF0YUJ1bmRsZVxuICAgICMjI1xuICAgIGZyb21EYXRhQnVuZGxlOiAoZGF0YSwgcmVzb3VyY2VzQnlQYXRoKSAtPiBAcmVzb3VyY2VzID0gZGF0YS5zZWxlY3QgKG4pIC0+IG5hbWU6IG4sIGRhdGE6IHJlc291cmNlc0J5UGF0aFtuXVxuXG4gICAgIyMjKlxuICAgICogQWRkcyB0aGUgc3BlY2lmaWVkIHJlc291cmNlIHRvIHRoZSBjb250ZXh0LlxuICAgICogQG1ldGhvZCBhZGRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gQSB1bmlxdWUgbmFtZSBmb3IgdGhlIHJlc291cmNlIGxpa2UgdGhlIGZpbGUtcGF0aCBmb3IgZXhhbXBsZS5cbiAgICAqIEBwYXJhbSB7Z3MuQml0bWFwfGdzLkF1ZGlvQnVmZmVyfGdzLlZpZGVvfGdzLkxpdmUyRE1vZGVsfSBkYXRhIC0gVGhlIHJlc291cmNlIGRhdGEgbGlrZSBhIGdzLkJpdG1hcCBvYmplY3QgZm9yIGV4YW1wbGUuXG4gICAgIyMjXG4gICAgYWRkOiAobmFtZSwgcmVzb3VyY2UpIC0+IEByZXNvdXJjZXMucHVzaCh7IG5hbWU6IG5hbWUsIGRhdGE6IHJlc291cmNlIH0pXG5cbiAgICAjIyMqXG4gICAgKiBSZW1vdmVzIHRoZSByZXNvdXJjZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBmcm9tIHRoZSBjb250ZXh0LlxuICAgICogQG1ldGhvZCByZW1vdmVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJlc291cmNlIHRvIHJlbW92ZS4gRm9yIEV4YW1wbGU6IFRoZSBmaWxlIG5hbWUuXG4gICAgIyMjXG4gICAgcmVtb3ZlOiAobmFtZSkgLT4gQHJlc291cmNlcy5yZW1vdmUoQHJlc291cmNlcy5maXJzdCgocikgLT4gci5uYW1lID09IG5hbWUpKVxuXG5ncy5SZXNvdXJjZU1hbmFnZXJDb250ZXh0ID0gUmVzb3VyY2VNYW5hZ2VyQ29udGV4dFxuXG5jbGFzcyBSZXNvdXJjZU1hbmFnZXJcbiAgICAjIyMqXG4gICAgKiBNYW5hZ2VzIHRoZSByZXNvdXJjZXMgb2YgdGhlIGdhbWUgbGlrZSBncmFwaGljcywgYXVkaW8sIGZvbnRzLCBldGMuIEl0XG4gICAgKiBvZmZlcnMgYSBsb3Qgb2YgbWV0aG9kcyB0byBlYXNpbHkgYWNjZXNzIGdhbWUgcmVzb3VyY2VzIGFuZCBhdXRvbWF0aWNhbGx5XG4gICAgKiBjYWNoZXMgdGhlbS4gU28gaWYgYW4gaW1hZ2UgaXMgcmVxdWVzdGVkIGEgc2Vjb25kIHRpbWUgaXQgd2lsbCBiZSB0YWtlblxuICAgICogZnJvbSB0aGUgY2FjaGUgaW5zdGVhZCBvZiBsb2FkaW5nIGl0IGFnYWluLlxuICAgICpcbiAgICAqIEBtb2R1bGUgZ3NcbiAgICAqIEBjbGFzcyBSZXNvdXJjZU1hbmFnZXJcbiAgICAqIEBtZW1iZXJvZiBnc1xuICAgICogQGNvbnN0cnVjdG9yXG4gICAgIyMjXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgICMjIypcbiAgICAgICAgKiBDdXJyZW50IHJlc291cmNlIGNvbnRleHQuIEFsbCBsb2FkZWQgcmVzb3VyY2VzIHdpbGwgYmUgYXNzb2NpYXRlZCB3aXRoIGl0LiBJZiBjdXJyZW50IGNvbnRleHRcbiAgICAgICAgKiBpcyBzZXQgdG8gPGI+bnVsbDwvYj4sIHRoZSA8Yj5zeXN0ZW1Db250ZXh0PC9iPiBpcyB1c2VkIGluc3RlYWQuXG4gICAgICAgICogQHByb3BlcnR5IGNvbnRleHRcbiAgICAgICAgKiBAdHlwZSBncy5SZXNvdXJjZU1hbmFnZXJDb250ZXh0XG4gICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAjIyNcbiAgICAgICAgQGNvbnRleHRfID0gbnVsbFxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBTeXN0ZW0gcmVzb3VyY2UgY29udGV4dC4gQWxsIGxvYWRlZCBzeXN0ZW0gcmVzb3VyY2VzIGFyZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBjb250ZXh0LiBSZXNvdXJjZXNcbiAgICAgICAgKiB3aGljaCBhcmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBzeXN0ZW0gY29udGV4dCBhcmUgbm90IGRpc3Bvc2VkIHVudGlsIHRoZSBnYW1lIGVuZHMuXG4gICAgICAgICogQHByb3BlcnR5IGNvbnRleHRcbiAgICAgICAgKiBAdHlwZSBncy5SZXNvdXJjZU1hbmFnZXJDb250ZXh0XG4gICAgICAgICMjI1xuICAgICAgICBAc3lzdGVtQ29udGV4dCA9IEBjcmVhdGVDb250ZXh0KClcblxuICAgICAgICAjIyMqXG4gICAgICAgICogSG9sZHMgaW4tbWVtb3J5IGNyZWF0ZWQgYml0bWFwcy5cbiAgICAgICAgKiBAcHJvcGVydHkgY3VzdG9tQml0bWFwc0J5S2V5XG4gICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAjIyNcbiAgICAgICAgQGN1c3RvbUJpdG1hcHNCeUtleSA9IHt9XG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIENhY2hlcyByZXNvdXJjZXMgYnkgZmlsZSBwYXRoLlxuICAgICAgICAqIEBwcm9wZXJ0eSByZXNvdXJjZXNCeVBhdGhcbiAgICAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICMjI1xuICAgICAgICBAcmVzb3VyY2VzQnlQYXRoID0ge31cblxuICAgICAgICAjIyMqXG4gICAgICAgICogQ2FjaGVzIHJlc291cmNlcyBieSBmaWxlIHBhdGggYW5kIEhVRS5cbiAgICAgICAgKiBAcHJvcGVydHkgcmVzb3VyY2VzQnlQYXRoXG4gICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAjIyNcbiAgICAgICAgQHJlc291cmNlc0J5UGF0aEh1ZSA9IHt9XG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIFN0b3JlcyBhbGwgbG9hZGVkIHJlc291cmNlcy5cbiAgICAgICAgKiBAcHJvcGVydHkgcmVzb3VyY2VzXG4gICAgICAgICogQHR5cGUgT2JqZWN0W11cbiAgICAgICAgIyMjXG4gICAgICAgIEByZXNvdXJjZXMgPSBbXVxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBJbmRpY2F0ZXMgaWYgYWxsIHJlcXVlc3RlZCByZXNvdXJjZXMgYXJlIGxvYWRlZC5cbiAgICAgICAgKiBAcHJvcGVydHkgcmVzb3VyY2VzTG9hZGVkXG4gICAgICAgICogQHR5cGUgYm9vbGVhblxuICAgICAgICAjIyNcbiAgICAgICAgQHJlc291cmNlc0xvYWRlZCA9IHRydWVcblxuICAgICAgICAjIyMqXG4gICAgICAgICogQHByb3BlcnR5IGV2ZW50c1xuICAgICAgICAqIEB0eXBlIGdzLkV2ZW50RW1pdHRlclxuICAgICAgICAjIyNcbiAgICAgICAgQGV2ZW50cyA9IG5ldyBncy5FdmVudEVtaXR0ZXIoKVxuXG4gICAgIyMjKlxuICAgICogQ3VycmVudCByZXNvdXJjZSBjb250ZXh0LiBBbGwgbG9hZGVkIHJlc291cmNlcyB3aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCBpdC4gSWYgY3VycmVudCBjb250ZXh0XG4gICAgKiBpcyBzZXQgdG8gPGI+bnVsbDwvYj4sIHRoZSA8Yj5zeXN0ZW1Db250ZXh0PC9iPiBpcyB1c2VkIGluc3RlYWQuXG4gICAgKiBAcHJvcGVydHkgY29udGV4dFxuICAgICogQHR5cGUgZ3MuUmVzb3VyY2VNYW5hZ2VyQ29udGV4dFxuICAgICMjI1xuICAgIEBhY2Nlc3NvcnMgXCJjb250ZXh0XCIsXG4gICAgICAgIHNldDogKHYpIC0+IEBjb250ZXh0XyA9IHZcbiAgICAgICAgZ2V0OiAtPiBAY29udGV4dF8gPyBAc3lzdGVtQ29udGV4dFxuXG4gICAgIyMjKlxuICAgICogQ3JlYXRlcyBhIG5ldyByZXNvdXJjZSBjb250ZXh0LiBVc2UgPGI+Y29udGV4dDwvYj4gdG8gc2V0IHRoZSBuZXcgY3JlYXRlZCBjb250ZXh0XG4gICAgKiBhcyBjdXJyZW50IGNvbnRleHQuXG4gICAgKlxuICAgICogQG1ldGhvZCBjcmVhdGVDb250ZXh0XG4gICAgIyMjXG4gICAgY3JlYXRlQ29udGV4dDogLT4gbmV3IGdzLlJlc291cmNlTWFuYWdlckNvbnRleHQoKVxuXG4gICAgIyMjKlxuICAgICogRGlzcG9zZXMgYWxsIGJpdG1hcCByZXNvdXJjZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IGNvbnRleHQuXG4gICAgKlxuICAgICogQG1ldGhvZCBkaXNwb3NlQml0bWFwc1xuICAgICMjI1xuICAgIGRpc3Bvc2VCaXRtYXBzOiAtPlxuICAgICAgICBmb3IgcmVzb3VyY2UgaW4gQGNvbnRleHQucmVzb3VyY2VzXG4gICAgICAgICAgICBpZiByZXNvdXJjZS5kYXRhIGluc3RhbmNlb2YgZ3MuQml0bWFwXG4gICAgICAgICAgICAgICAgcmVzb3VyY2UuZGF0YS5kaXNwb3NlKClcbiAgICAgICAgICAgICAgICBAcmVzb3VyY2VzLnJlbW92ZShAcmVzb3VyY2VzLmZpcnN0ICgocikgLT5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gci5maWxlUGF0aCA9PSByZXNvdXJjZS5kYXRhLmZpbGVQYXRoXG4gICAgICAgICAgICAgICAgICAgIHIuZGlzcG9zZSgpIGlmIHJlc3VsdFxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICAgIEByZXNvdXJjZXMucmVtb3ZlKHJlc291cmNlLmRhdGEpXG4gICAgICAgICAgICAgICAgaWYgcmVzb3VyY2UubmFtZVxuICAgICAgICAgICAgICAgICAgICBAcmVzb3VyY2VzQnlQYXRoW3Jlc291cmNlLm5hbWVdID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgQHJlc291cmNlc0J5UGF0aFtyZXNvdXJjZS5uYW1lXVxuICAgICMjIypcbiAgICAqIERpc3Bvc2VzIGFsbCB2aWRlbyByZXNvdXJjZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IGNvbnRleHQuXG4gICAgKlxuICAgICogQG1ldGhvZCBkaXNwb3NlVmlkZW9zXG4gICAgIyMjXG4gICAgZGlzcG9zZVZpZGVvczogLT5cbiAgICAgICAgZm9yIHJlc291cmNlIGluIEBjb250ZXh0LnJlc291cmNlc1xuICAgICAgICAgICAgaWYgcmVzb3VyY2UuZGF0YSBpbnN0YW5jZW9mIGdzLlZpZGVvXG4gICAgICAgICAgICAgICAgcmVzb3VyY2UuZGF0YS5kaXNwb3NlKClcbiAgICAgICAgICAgICAgICBAcmVzb3VyY2VzLnJlbW92ZShyZXNvdXJjZS5kYXRhKVxuICAgICAgICAgICAgICAgIEByZXNvdXJjZXNCeVBhdGhbcmVzb3VyY2UubmFtZV0gPSBudWxsXG4gICAgICAgICAgICAgICAgZGVsZXRlIEByZXNvdXJjZXNCeVBhdGhbcmVzb3VyY2UubmFtZV1cblxuICAgICMjIypcbiAgICAqIERpc3Bvc2VzIGFsbCBhdWRpbyByZXNvdXJjZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IGNvbnRleHQuXG4gICAgKlxuICAgICogQG1ldGhvZCBkaXNwb3NlQXVkaW9cbiAgICAjIyNcbiAgICBkaXNwb3NlQXVkaW86IC0+XG4gICAgICAgIEF1ZGlvTWFuYWdlci5kaXNwb3NlKEBjb250ZXh0KVxuXG4gICAgICAgIGZvciByZXNvdXJjZSBpbiBAY29udGV4dC5yZXNvdXJjZXNcbiAgICAgICAgICAgIGlmIHJlc291cmNlLmRhdGEgaW5zdGFuY2VvZiBHUy5BdWRpb0J1ZmZlciBvciByZXNvdXJjZSBpbnN0YW5jZW9mIEdTLkF1ZGlvQnVmZmVyU3RyZWFtXG4gICAgICAgICAgICAgICAgcmVzb3VyY2UuZGF0YS5kaXNwb3NlKClcbiAgICAgICAgICAgICAgICBAcmVzb3VyY2VzLnJlbW92ZShyZXNvdXJjZS5kYXRhKVxuICAgICAgICAgICAgICAgIEByZXNvdXJjZXNCeVBhdGhbcmVzb3VyY2UubmFtZV0gPSBudWxsXG4gICAgICAgICAgICAgICAgZGVsZXRlIEByZXNvdXJjZXNCeVBhdGhbcmVzb3VyY2UubmFtZV1cblxuICAgICMjIypcbiAgICAqIERpc3Bvc2VzIGFsbCBMaXZlMkQgcmVzb3VyY2VzIGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudCBjb250ZXh0LlxuICAgICpcbiAgICAqIEBtZXRob2QgZGlzcG9zZUxpdmUyRFxuICAgICMjI1xuICAgIGRpc3Bvc2VMaXZlMkQ6IC0+XG4gICAgICAgIGZvciByZXNvdXJjZSBpbiBAY29udGV4dC5yZXNvdXJjZXNcbiAgICAgICAgICAgIGlmIHJlc291cmNlLmRhdGEgaW5zdGFuY2VvZiBncy5MaXZlMkRNb2RlbFxuICAgICAgICAgICAgICAgIHJlc291cmNlLmRhdGEuZGlzcG9zZSgpXG4gICAgICAgICAgICAgICAgQHJlc291cmNlcy5yZW1vdmUocmVzb3VyY2UuZGF0YSlcbiAgICAgICAgICAgICAgICBAcmVzb3VyY2VzQnlQYXRoW3Jlc291cmNlLm5hbWVdID0gbnVsbFxuICAgICAgICAgICAgICAgIGRlbGV0ZSBAcmVzb3VyY2VzQnlQYXRoW3Jlc291cmNlLm5hbWVdXG5cbiAgICAjIyMqXG4gICAgKiBEaXNwb3NlcyBhbGwgcmVzb3VyY2VzLlxuICAgICpcbiAgICAqIEBtZXRob2QgZGlzcG9zZVxuICAgICMjI1xuICAgIGRpc3Bvc2U6IC0+XG4gICAgICAgIEBkaXNwb3NlQml0bWFwcygpXG4gICAgICAgIEBkaXNwb3NlVmlkZW9zKClcbiAgICAgICAgQGRpc3Bvc2VBdWRpbygpXG4gICAgICAgIEBkaXNwb3NlTGl2ZTJEKClcblxuICAgICAgICBAY29udGV4dCA9IEBzeXN0ZW1Db250ZXh0XG5cbiAgICAjIyMqXG4gICAgKiBMb2FkcyBhbGwgY3VzdG9tIGZvbnRzIGluIEdyYXBoaWNzL0ZvbnRzIGZvbGRlci5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGxvYWRGb250c1xuICAgICMjI1xuICAgIGxvYWRGb250czogLT5cbiAgICAgICAgcmVzb3VyY2UgPSB7IGxvYWRlZDogbm8gfVxuICAgICAgICBAcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpXG4gICAgICAgIEByZXNvdXJjZXNCeVBhdGhbXCJHcmFwaGljcy9Gb250c1wiXSA9IHJlc291cmNlXG5cbiAgICAgICAgZ3MuRm9udC5sb2FkQ3VzdG9tRm9udHMoKGVycm9yKSA9PlxuICAgICAgICAgICAgQHJlc291cmNlc0J5UGF0aFtcIkdyYXBoaWNzL0ZvbnRzXCJdLmxvYWRlZCA9IHllc1xuICAgICAgICAgICAgaWYgZXJyb3JcbiAgICAgICAgICAgICAgICBAcmVzb3VyY2VzQnlQYXRoW1wiR3JhcGhpY3MvRm9udHNcIl0uZXJyb3IgPSB5ZXNcbiAgICAgICAgKVxuICAgICMjIypcbiAgICAqIEdldHMgYSBjdXN0b20gY3JlYXRlZCBiaXRtYXAgYnkga2V5LlxuICAgICpcbiAgICAqIEBtZXRob2QgZ2V0Q3VzdG9tQml0bWFwXG4gICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IC0gVGhlIGtleSBmb3IgdGhlIGJpdG1hcCB0byBnZXQuXG4gICAgKiBAcmV0dXJuIHtncy5CaXRtYXB9IFRoZSBiaXRtYXAgb3IgPGI+bnVsbDwvYj4gaWYgbm8gYml0bWFwIGV4aXN0cyBmb3IgdGhlIHNwZWNpZmllZCBrZXkuXG4gICAgIyMjXG4gICAgZ2V0Q3VzdG9tQml0bWFwOiAoa2V5KSAtPlxuICAgICAgICByZXR1cm4gQGN1c3RvbUJpdG1hcHNCeUtleVtrZXldXG5cbiAgICAjIyMqXG4gICAgKiBTZXRzIGEgY3VzdG9tIGNyZWF0ZWQgYml0bWFwIGZvciBhIHNwZWNpZmllZCBrZXkuXG4gICAgKlxuICAgICogQG1ldGhvZCBzZXRDdXN0b21CaXRtYXBcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgLSBUaGUga2V5IGZvciB0aGUgYml0bWFwIHRvIHNldC5cbiAgICAqIEBwYXJhbSB7Z3MuQml0bWFwfSBiaXRtYXAgLSBUaGUgYml0bWFwIHRvIHNldC5cbiAgICAjIyNcbiAgICBzZXRDdXN0b21CaXRtYXA6IChrZXksIGJpdG1hcCkgLT5cbiAgICAgICAgQGN1c3RvbUJpdG1hcHNCeUtleVtrZXldID0gYml0bWFwXG4gICAgICAgIGlmIG5vdCBiaXRtYXAubG9hZGVkP1xuICAgICAgICAgICAgQHJlc291cmNlcy5wdXNoKGJpdG1hcClcbiAgICAgICAgICAgIEByZXNvdXJjZXNMb2FkZWQgPSBmYWxzZVxuXG4gICAgIyMjKlxuICAgICogQWRkcyBhIGN1c3RvbSBjcmVhdGVkIGJpdG1hcCB0byB0aGUgcmVzb3VyY2UgbWFuYWdlci5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGFkZEN1c3RvbUJpdG1hcFxuICAgICogQHBhcmFtIHtncy5CaXRtYXB9IGJpdG1hcCAtIFRoZSBiaXRtYXAgdG8gYWRkLlxuICAgICMjI1xuICAgIGFkZEN1c3RvbUJpdG1hcDogKGJpdG1hcCkgLT5cbiAgICAgICAgQGNvbnRleHQucmVzb3VyY2VzLnB1c2gobmFtZTogXCJcIiwgZGF0YTogYml0bWFwKVxuXG4gICAgIyMjKlxuICAgICogR2V0cyBhIExpdmUyRCBtb2RlbC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGdldExpdmUyRE1vZGVsXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZVBhdGggLSBQYXRoIHRvIHRoZSBMaXZlMkQgbW9kZWwgZmlsZS5cbiAgICAqIEByZXR1cm4ge2dzLkxpdmUyRE1vZGVsfSBUaGUgTGl2ZTJEIG1vZGVsIG9yIDxiPm51bGw8L2I+IGlmIG5vIG1vZGVsIGV4aXN0cyBhdCB0aGUgc3BlY2lmaWVkIGZpbGUgcGF0aC5cbiAgICAjIyNcbiAgICBnZXRMaXZlMkRNb2RlbDogKGZpbGVQYXRoKSAtPlxuICAgICAgICByZXN1bHQgPSBAcmVzb3VyY2VzQnlQYXRoW2ZpbGVQYXRoXVxuXG4gICAgICAgIGlmIG5vdCByZXN1bHQ/IG9yIHJlc3VsdC5kaXNwb3NlZFxuICAgICAgICAgICAgcHJvZmlsZSA9IExhbmd1YWdlTWFuYWdlci5wcm9maWxlXG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgZ3MuTGl2ZTJETW9kZWwoZmlsZVBhdGgsIChpZiBwcm9maWxlPyBhbmQgcHJvZmlsZS5pdGVtcz8gdGhlbiBwcm9maWxlLml0ZW1zLmNvZGUgZWxzZSBudWxsKSlcbiAgICAgICAgICAgIEByZXNvdXJjZXNCeVBhdGhbZmlsZVBhdGhdID0gcmVzdWx0XG4gICAgICAgICAgICBAcmVzb3VyY2VzLnB1c2gocmVzdWx0KVxuICAgICAgICAgICAgQHJlc291cmNlc0xvYWRlZCA9IGZhbHNlXG4gICAgICAgICAgICBAY29udGV4dC5yZXNvdXJjZXMucHVzaChuYW1lOiBmaWxlUGF0aCwgZGF0YTogcmVzdWx0KVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcblxuICAgICMjIypcbiAgICAqIEdldHMgYSBmb250LlxuICAgICpcbiAgICAqIEBtZXRob2QgZ2V0Rm9udFxuICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZm9udCB0byBnZXQuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZSAtIFRoZSBzaXplIG9mIHRoZSBmb250IHRvIGdldC5cbiAgICAqIEByZXR1cm4ge2dzLkZvbnR9IFRoZSBmb250IG9yIDxiPm51bGw8L2I+IGlmIG5vIGZvbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgZXhpc3RzLlxuICAgICMjI1xuICAgIGdldEZvbnQ6IChuYW1lLCBzaXplKSAtPlxuICAgICAgICByZXN1bHQgPSBuZXcgRm9udChuYW1lLCBzaXplKVxuXG4gICAgICAgIEByZXNvdXJjZXMucHVzaChyZXN1bHQpXG4gICAgICAgIEByZXNvdXJjZXNMb2FkZWQgPSBmYWxzZVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcblxuICAgICMjIypcbiAgICAqIEdldHMgYSB2aWRlby5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGdldFZpZGVvXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZVBhdGggLSBQYXRoIHRvIHRoZSB2aWRlbyBmaWxlLlxuICAgICogQHJldHVybiB7Z3MuVmlkZW99IFRoZSB2aWRlbyBvciA8Yj5udWxsPC9iPiBpZiBubyB2aWRlbyBleGlzdHMgYXQgdGhlIHNwZWNpZmllZCBmaWxlIHBhdGguXG4gICAgIyMjXG4gICAgZ2V0VmlkZW86IChmaWxlUGF0aCkgLT5cbiAgICAgICAgaWYgZmlsZVBhdGguZW5kc1dpdGgoXCIvXCIpIHRoZW4gcmV0dXJuIG51bGxcblxuICAgICAgICByZXN1bHQgPSBAcmVzb3VyY2VzQnlQYXRoW2ZpbGVQYXRoXVxuXG4gICAgICAgIGlmIG5vdCByZXN1bHQ/IG9yIHJlc3VsdC5kaXNwb3NlZFxuICAgICAgICAgICAgcHJvZmlsZSA9IExhbmd1YWdlTWFuYWdlci5wcm9maWxlXG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgZ3MuVmlkZW8oZmlsZVBhdGgsIChpZiBwcm9maWxlPyBhbmQgcHJvZmlsZS5pdGVtcz8gdGhlbiBwcm9maWxlLml0ZW1zLmNvZGUgZWxzZSBudWxsKSlcbiAgICAgICAgICAgIEByZXNvdXJjZXNCeVBhdGhbZmlsZVBhdGhdID0gcmVzdWx0XG4gICAgICAgICAgICBAcmVzb3VyY2VzLnB1c2gocmVzdWx0KVxuICAgICAgICAgICAgQHJlc291cmNlc0xvYWRlZCA9IGZhbHNlXG4gICAgICAgICAgICBAY29udGV4dC5yZXNvdXJjZXMucHVzaChuYW1lOiBmaWxlUGF0aCwgZGF0YTogcmVzdWx0KVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcblxuICAgICMjIypcbiAgICAqIEdldHMgdGhlIGNvcnJlY3QgZmlsZSBwYXRoIGZvciB0aGUgc3BlY2lmaWVkIHJlc291cmNlLlxuICAgICpcbiAgICAqIEBtZXRob2QgZ2V0UGF0aFxuICAgICogQHBhcmFtIHtPYmplY3R9IHJlc291cmNlIC0gVGhlIHJlc291cmNlIG9iamVjdCB3aGljaCBpcyB1c3VhbGx5IHN0b3JlZCBpbnNpZGUgYSBjb21tYW5kJ3MgcGFyYW1zIG9yIGluIGRhdGEgcmVjb3Jkcy5cbiAgICAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGNvcnJlY3QgZmlsZSBwYXRoIGZvciB0aGUgc3BlY2lmaWVkIHJlc291cmNlLlxuICAgICMjI1xuICAgIGdldFBhdGg6IChyZXNvdXJjZSkgLT4gaWYgcmVzb3VyY2U/IHRoZW4gXCIje3Jlc291cmNlLmZvbGRlclBhdGh9LyN7cmVzb3VyY2UubmFtZX1cIiBlbHNlIFwiXCJcblxuICAgICMjIypcbiAgICAqIEdldHMgYSBiaXRtYXAuXG4gICAgKlxuICAgICogQG1ldGhvZCBnZXRCaXRtYXBcbiAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZmlsZVBhdGggLSBQYXRoIHRvIHRoZSBiaXRtYXAgZmlsZSBPUiBhIGdyYXBoaWMgaW5mbyBvYmplY3QuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaHVlIC0gVGhlIGJpdG1hcCdzIGh1ZS4gVGhlIGJpdG1hcCB3aWxsIGJlIGxvYWRlZCBhbmQgdGhlbiByZWNvbG9yZWQuXG4gICAgKiBAcmV0dXJuIHtncy5CaXRtYXB9IFRoZSBiaXRtYXAgb3IgPGI+bnVsbDwvYj4gaWYgbm8gYml0bWFwIGV4aXN0cyBhdCB0aGUgc3BlY2lmaWVkIGZpbGUgcGF0aC5cbiAgICAjIyNcbiAgICBnZXRCaXRtYXA6IChmaWxlUGF0aCwgaHVlKSAtPlxuICAgICAgICBpZiBmaWxlUGF0aC5lbmRzV2l0aChcIi9cIikgdGhlbiByZXR1cm4gbnVsbFxuXG4gICAgICAgIGh1ZSA9IGh1ZSB8fCAwXG4gICAgICAgIHJlc3VsdCA9IEByZXNvdXJjZXNCeVBhdGhbZmlsZVBhdGhdIHx8IEBjdXN0b21CaXRtYXBzQnlLZXlbZmlsZVBhdGhdXG5cbiAgICAgICAgaWYgbm90IHJlc3VsdD9cbiAgICAgICAgICAgIHByb2ZpbGUgPSBMYW5ndWFnZU1hbmFnZXIucHJvZmlsZVxuICAgICAgICAgICAgcmVzdWx0ID0gbmV3IEJpdG1hcChmaWxlUGF0aCwgKGlmIHByb2ZpbGU/IGFuZCBwcm9maWxlLml0ZW1zPyB0aGVuIHByb2ZpbGUuaXRlbXMuY29kZSBlbHNlIG51bGwpLCBubylcbiAgICAgICAgICAgIHJlc3VsdC5odWUgPSBodWVcbiAgICAgICAgICAgIHJlc3VsdC5maWxlUGF0aCA9IGZpbGVQYXRoXG4gICAgICAgICAgICBAcmVzb3VyY2VzQnlQYXRoW2ZpbGVQYXRoXSA9IHJlc3VsdFxuICAgICAgICAgICAgQHJlc291cmNlcy5wdXNoKHJlc3VsdClcbiAgICAgICAgICAgIEByZXNvdXJjZXNMb2FkZWQgPSBmYWxzZVxuICAgICAgICAgICAgQGNvbnRleHQucmVzb3VyY2VzLnB1c2gobmFtZTogZmlsZVBhdGgsIGRhdGE6IHJlc3VsdClcbiAgICAgICAgZWxzZSBpZiBub3QgcmVzdWx0LmxvYWRlZCBhbmQgcmVzdWx0Lmh1ZSAhPSBodWVcbiAgICAgICAgICAgIHByb2ZpbGUgPSBMYW5ndWFnZU1hbmFnZXIucHJvZmlsZVxuICAgICAgICAgICAgcmVzdWx0ID0gbmV3IEJpdG1hcChmaWxlUGF0aCwgKGlmIHByb2ZpbGU/IGFuZCBwcm9maWxlLml0ZW1zPyB0aGVuIHByb2ZpbGUuaXRlbXMuY29kZSBlbHNlIG51bGwpKVxuICAgICAgICAgICAgcmVzdWx0Lmh1ZSA9IGh1ZVxuICAgICAgICAgICAgcmVzdWx0LmZpbGVQYXRoID0gZmlsZVBhdGhcbiAgICAgICAgICAgIEByZXNvdXJjZXMucHVzaChyZXN1bHQpXG4gICAgICAgICAgICBAcmVzb3VyY2VzTG9hZGVkID0gZmFsc2VcbiAgICAgICAgZWxzZSBpZiBodWUgPiAwXG4gICAgICAgICAgICBodWVCaXRtYXAgPSBAcmVzb3VyY2VzQnlQYXRoSHVlW2ZpbGVQYXRoK1wiQFwiK2h1ZV1cbiAgICAgICAgICAgIGlmIG5vdCBodWVCaXRtYXA/IGFuZCByZXN1bHQubG9hZGVkXG4gICAgICAgICAgICAgICAgaHVlQml0bWFwID0gbmV3IEJpdG1hcChyZXN1bHQuaW1hZ2UpXG4gICAgICAgICAgICAgICAgaHVlQml0bWFwLmNoYW5nZUh1ZShodWUpXG4gICAgICAgICAgICAgICAgQHJlc291cmNlc0J5UGF0aEh1ZVtmaWxlUGF0aCtcIkBcIitodWVdID0gaHVlQml0bWFwXG4gICAgICAgICAgICBpZiBodWVCaXRtYXA/IHRoZW4gcmVzdWx0ID0gaHVlQml0bWFwXG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuXG4gICAgIyMjKlxuICAgICogR2V0cyBhbiBIVE1MIGltYWdlLlxuICAgICpcbiAgICAqIEBtZXRob2QgZ2V0SW1hZ2VcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlUGF0aCAtIFBhdGggdG8gdGhlIGltYWdlIGZpbGUuXG4gICAgKiBAcmV0dXJuIHtIVE1MSW1hZ2VFbGVtZW50fSBUaGUgaW1hZ2Ugb3IgPGI+bnVsbDwvYj4gaWYgbm8gaW1hZ2UgZXhpc3RzIGF0IHRoZSBzcGVjaWZpZWQgZmlsZSBwYXRoLlxuICAgICMjI1xuICAgIGdldEltYWdlOiAoZmlsZVBhdGgpIC0+XG4gICAgICAgIHJlc3VsdCA9IEByZXNvdXJjZXNCeVBhdGhbZmlsZVBhdGhdXG5cbiAgICAgICAgaWYgbm90IHJlc3VsdD9cbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBCaXRtYXAoXCJyZXNvdXJjZXMvI3tmaWxlUGF0aH0ucG5nXCIpO1xuXG4gICAgICAgICAgICBAcmVzb3VyY2VzQnlQYXRoW2ZpbGVQYXRoXSA9IHJlc3VsdFxuICAgICAgICAgICAgQHJlc291cmNlcy5wdXNoKHJlc3VsdClcbiAgICAgICAgICAgIEByZXNvdXJjZXNMb2FkZWQgPSBmYWxzZVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcblxuICAgICMjIypcbiAgICAqIEdldHMgYW4gYXVkaW8gc3RyZWFtLlxuICAgICpcbiAgICAqIEBtZXRob2QgZ2V0QXVkaW9TdHJlYW1cbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlUGF0aCAtIFBhdGggdG8gdGhlIGF1ZGlvIGZpbGUuXG4gICAgKiBAcmV0dXJuIHtncy5BdWRpb0J1ZmZlcn0gVGhlIGF1ZGlvIGJ1ZmZlciBvciA8Yj5udWxsPC9iPiBpZiBubyBhdWRpbyBmaWxlIGV4aXN0cyBhdCB0aGUgc3BlY2lmaWVkIGZpbGUgcGF0aC5cbiAgICAjIyNcbiAgICBnZXRBdWRpb1N0cmVhbTogKGZpbGVQYXRoKSAtPlxuICAgICAgICByZXN1bHQgPSBAcmVzb3VyY2VzQnlQYXRoW2ZpbGVQYXRoXVxuICAgICAgICBwcm9maWxlID0gTGFuZ3VhZ2VNYW5hZ2VyLnByb2ZpbGVcbiAgICAgICAgbGFuZ3VhZ2VDb2RlID0gaWYgcHJvZmlsZT8gYW5kIHByb2ZpbGUuaXRlbXM/IHRoZW4gcHJvZmlsZS5pdGVtcy5jb2RlIGVsc2UgbnVsbFxuXG4gICAgICAgIGlmIG5vdCByZXN1bHQ/XG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgR1MuQXVkaW9CdWZmZXIoZmlsZVBhdGgpXG5cbiAgICAgICAgICAgIEByZXNvdXJjZXNCeVBhdGhbZmlsZVBhdGhdID0gcmVzdWx0XG4gICAgICAgICAgICBAcmVzb3VyY2VzLnB1c2gocmVzdWx0KVxuICAgICAgICAgICAgQHJlc291cmNlc0xvYWRlZCA9IGZhbHNlXG5cbiAgICAgICAgICAgIEBjb250ZXh0LnJlc291cmNlcy5wdXNoKG5hbWU6IGZpbGVQYXRoLCBkYXRhOiByZXN1bHQpXG5cblxuXG4gICAgICAgIHJldHVybiByZXN1bHRcblxuICAgICMjIypcbiAgICAqIEdldHMgYW4gYXVkaW8gYnVmZmVyLiBUaGUgYXVkaW8gZGF0YSBpcyBmdWxseSBsb2FkZWQgYW5kIGRlY29kZWQgaW4gbWVtb3J5LiBJdCBpcyByZWNvbW1lbmVkZWRcbiAgICAqIGZvciBzb3VuZCBlZmZlY3RzIGJ1dCBmb3IgYSBsb25nIGJhY2tncm91bmQgbXVzaWMsIDxiPmdldEF1ZGlvU3RyZWFtPC9iPiBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLiBUaGF0IGlzIGVzcGVjaWFsbHlcbiAgICAqIHRoZSBjYXNlIG9uIG1vYmlsZSBkZXZpY2VzLlxuICAgICpcbiAgICAqIEBtZXRob2QgZ2V0QXVkaW9CdWZmZXJcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlUGF0aCAtIFBhdGggdG8gdGhlIGF1ZGlvIGZpbGUuXG4gICAgKiBAcmV0dXJuIHtncy5BdWRpb0J1ZmZlcn0gVGhlIGF1ZGlvIGJ1ZmZlciBvciA8Yj5udWxsPC9iPiBpZiBubyBhdWRpbyBmaWxlIGV4aXN0cyBhdCB0aGUgc3BlY2lmaWVkIGZpbGUgcGF0aC5cbiAgICAjIyNcbiAgICBnZXRBdWRpb0J1ZmZlcjogKGZpbGVQYXRoKSAtPlxuICAgICAgICByZXN1bHQgPSBAcmVzb3VyY2VzQnlQYXRoW2ZpbGVQYXRoXVxuICAgICAgICBwcm9maWxlID0gTGFuZ3VhZ2VNYW5hZ2VyLnByb2ZpbGVcbiAgICAgICAgbGFuZ3VhZ2VDb2RlID0gaWYgcHJvZmlsZT8gYW5kIHByb2ZpbGUuaXRlbXM/IHRoZW4gcHJvZmlsZS5pdGVtcy5jb2RlIGVsc2UgbnVsbFxuXG4gICAgICAgIGlmIG5vdCByZXN1bHQ/XG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgR1MuQXVkaW9CdWZmZXIoZmlsZVBhdGgpXG5cbiAgICAgICAgICAgIEByZXNvdXJjZXNCeVBhdGhbZmlsZVBhdGhdID0gcmVzdWx0XG4gICAgICAgICAgICBAcmVzb3VyY2VzLnB1c2gocmVzdWx0KVxuICAgICAgICAgICAgQHJlc291cmNlc0xvYWRlZCA9IGZhbHNlXG5cbiAgICAgICAgICAgIEBjb250ZXh0LnJlc291cmNlcy5wdXNoKG5hbWU6IGZpbGVQYXRoLCBkYXRhOiByZXN1bHQpXG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuXG4gICAgIyMjKlxuICAgICogVXBkYXRlcyB0aGUgbG9hZGluZyBwcm9jZXNzLiBOZWVkcyB0byBiZSBjYWxsZWQgb25jZSBwZXIgZnJhbWUgdG8ga2VlcFxuICAgICogdGhlIFJlc291cmNlTWFuYWdlciB1cCB0byBkYXRlLlxuICAgICpcbiAgICAqIEBtZXRob2QgdXBkYXRlXG4gICAgIyMjXG4gICAgdXBkYXRlOiAtPlxuICAgICAgICBpZiBub3QgQGV2ZW50cz8gdGhlbiBAZXZlbnRzID0gbmV3IGdzLkV2ZW50RW1pdHRlcigpXG4gICAgICAgIGlmIG5vdCBAcmVzb3VyY2VzTG9hZGVkXG4gICAgICAgICAgICBAcmVzb3VyY2VzTG9hZGVkID0gdHJ1ZVxuICAgICAgICAgICAgZm9yIGkgaW4gWzAuLi5AcmVzb3VyY2VzLmxlbmd0aF1cbiAgICAgICAgICAgICAgICBpZiBub3QgQHJlc291cmNlc1tpXS5sb2FkZWRcbiAgICAgICAgICAgICAgICAgICAgQHJlc291cmNlc0xvYWRlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgZWxzZSBpZiBAcmVzb3VyY2VzW2ldLmh1ZT8gYW5kIEByZXNvdXJjZXNbaV0uaHVlID4gMFxuICAgICAgICAgICAgICAgICAgICBiaXRtYXAgPSBuZXcgQml0bWFwKEByZXNvdXJjZXNbaV0uaW1hZ2UpXG5cbiAgICAgICAgICAgICAgICAgICAgQHJlc291cmNlc0J5UGF0aFtAcmVzb3VyY2VzW2ldLmZpbGVQYXRoXSA9IGJpdG1hcFxuICAgICAgICAgICAgICAgICAgICBAcmVzb3VyY2VzW2ldLmNoYW5nZUh1ZShAcmVzb3VyY2VzW2ldLmh1ZSlcbiAgICAgICAgICAgICAgICAgICAgQHJlc291cmNlc0J5UGF0aEh1ZVtAcmVzb3VyY2VzW2ldLmZpbGVQYXRoK1wiQFwiK0ByZXNvdXJjZXNbaV0uaHVlXSA9IEByZXNvdXJjZXNbaV1cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIEByZXNvdXJjZXNbaV0uZmlsZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIEByZXNvdXJjZXNbaV0uaHVlXG4gICAgICAgICAgICBpZiBAcmVzb3VyY2VzTG9hZGVkXG4gICAgICAgICAgICAgICAgQGV2ZW50cy5lbWl0KFwibG9hZGVkXCIsIHRoaXMpXG5cbiAgICAgICAgcmV0dXJuIG51bGxcblxud2luZG93LlJlc291cmNlTWFuYWdlciA9IFJlc291cmNlTWFuYWdlclxuZ3MuUmVzb3VyY2VNYW5hZ2VyID0gUmVzb3VyY2VNYW5hZ2VyIl19
//# sourceURL=ResourceManager_69.js