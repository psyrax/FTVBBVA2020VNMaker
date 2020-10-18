var GameManager;

GameManager = (function() {

  /**
  * Manages all general things around the game like holding the game settings,
  * manages the save/load of a game, etc.
  *
  * @module gs
  * @class GameManager
  * @memberof gs
  * @constructor
   */
  function GameManager() {

    /**
    * The current scene data.
    * @property sceneData
    * @type Object
     */
    this.sceneData = {};

    /**
    * The scene viewport containing all visual objects which are part of the scene and influenced
    * by the in-game camera.
    * @property sceneViewport
    * @type gs.Object_Viewport
     */
    this.sceneViewport = null;

    /**
    * The list of common events.
    * @property commonEvents
    * @type gs.Object_CommonEvent[]
     */
    this.commonEvents = [];

    /**
    * Indicates if the GameManager is initialized.
    * @property commonEvents
    * @type gs.Object_CommonEvent[]
     */
    this.initialized = false;

    /**
    * Temporary game settings.
    * @property tempSettings
    * @type Object
     */
    this.tempSettings = {
      skip: false,
      skipTime: 5,
      loadMenuAccess: true,
      menuAccess: true,
      backlogAccess: true,
      saveMenuAccess: true,
      messageFading: {
        animation: {
          type: 1
        },
        duration: 15,
        easing: null
      }

      /**
      * Temporary game fields.
      * @property tempFields
      * @type Object
       */
    };
    this.tempFields = null;

    /**
    * Stores default values for backgrounds, pictures, etc.
    * @property defaults
    * @type Object
     */
    this.defaults = {
      background: {
        "duration": 30,
        "origin": 0,
        "zOrder": 0,
        "loopVertical": 0,
        "loopHorizontal": 0,
        "easing": {
          "type": 0,
          "inOut": 1
        },
        "animation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "motionBlur": {
          "enabled": 0,
          "delay": 2,
          "opacity": 100,
          "dissolveSpeed": 3
        }
      },
      picture: {
        "appearDuration": 30,
        "disappearDuration": 30,
        "origin": 1,
        "zOrder": 0,
        "appearEasing": {
          "type": 0,
          "inOut": 1
        },
        "disappearEasing": {
          "type": 0,
          "inOut": 1
        },
        "appearAnimation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "disappearAnimation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "motionBlur": {
          "enabled": 0,
          "delay": 2,
          "opacity": 100,
          "dissolveSpeed": 3
        }
      },
      character: {
        "expressionDuration": 0,
        "appearDuration": 40,
        "disappearDuration": 40,
        "origin": 1,
        "zOrder": 0,
        "appearEasing": {
          "type": 2,
          "inOut": 2
        },
        "disappearEasing": {
          "type": 1,
          "inOut": 1
        },
        "appearAnimation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "disappearAnimation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "motionBlur": {
          "enabled": 0,
          "delay": 2,
          "opacity": 100,
          "dissolveSpeed": 3
        },
        "changeAnimation": {
          "type": 1,
          "movement": 0,
          "fading": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "changeEasing": {
          "type": 2,
          "inOut": 2
        }
      },
      text: {
        "appearDuration": 30,
        "disappearDuration": 30,
        "positionOrigin": 0,
        "origin": 0,
        "zOrder": 0,
        "appearEasing": {
          "type": 0,
          "inOut": 1
        },
        "disappearEasing": {
          "type": 0,
          "inOut": 1
        },
        "appearAnimation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "disappearAnimation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "motionBlur": {
          "enabled": 0,
          "delay": 2,
          "opacity": 100,
          "dissolveSpeed": 3
        }
      },
      video: {
        "appearDuration": 30,
        "disappearDuration": 30,
        "origin": 0,
        "zOrder": 0,
        "appearEasing": {
          "type": 0,
          "inOut": 1
        },
        "disappearEasing": {
          "type": 0,
          "inOut": 1
        },
        "appearAnimation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "disappearAnimation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "motionBlur": {
          "enabled": 0,
          "delay": 2,
          "opacity": 100,
          "dissolveSpeed": 3
        }
      },
      live2d: {
        "motionFadeInTime": 1000,
        "appearDuration": 30,
        "disappearDuration": 30,
        "zOrder": 0,
        "appearEasing": {
          "type": 0,
          "inOut": 1
        },
        "disappearEasing": {
          "type": 0,
          "inOut": 1
        },
        "appearAnimation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "disappearAnimation": {
          "type": 1,
          "movement": 0,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        }
      },
      messageBox: {
        "appearDuration": 30,
        "disappearDuration": 30,
        "zOrder": 0,
        "appearEasing": {
          "type": 0,
          "inOut": 1
        },
        "disappearEasing": {
          "type": 0,
          "inOut": 1
        },
        "appearAnimation": {
          "type": 0,
          "movement": 3,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        },
        "disappearAnimation": {
          "type": 0,
          "movement": 3,
          "mask": {
            "graphic": null,
            "vague": 30
          }
        }
      },
      audio: {
        "musicFadeInDuration": 0,
        "musicFadeOutDuration": 0,
        "musicVolume": 100,
        "musicPlaybackRate": 100,
        "soundVolume": 100,
        "soundPlaybackRate": 100,
        "voiceVolume": 100,
        "voicePlaybackRate": 100
      }
    };

    /**
    * The game's backlog.
    * @property backlog
    * @type Object[]
     */
    this.backlog = [];

    /**
    * Character parameters by character ID.
    * @property characterParams
    * @type Object[]
     */
    this.characterParams = [];

    /**
    * The game's chapter
    * @property chapters
    * @type gs.Document[]
     */
    this.chapters = [];

    /**
    * The game's current displayed messages. Especially in NVL mode the messages
    * of the current page are stored here.
    * @property messages
    * @type Object[]
     */
    this.messages = [];

    /**
    * Count of save slots. Default is 100.
    * @property saveSlotCount
    * @type number
     */
    this.saveSlotCount = 100;

    /**
    * The index of save games. Contains the header-info for each save game slot.
    * @property saveGameSlots
    * @type Object[]
     */
    this.saveGameSlots = [];

    /**
    * Stores global data like the state of persistent game variables.
    * @property globalData
    * @type Object
     */
    this.globalData = null;

    /**
    * Indicates if the game runs in editor's live-preview.
    * @property inLivePreview
    * @type Object
     */
    this.inLivePreview = false;
  }


  /**
  * Initializes the GameManager, should be called before the actual game starts.
  *
  * @method initialize
   */

  GameManager.prototype.initialize = function() {
    var character, i, j, k, l, len, len1, param, ref, ref1, ref2, ref3, ref4, ref5, ref6;
    this.initialized = true;
    this.inLivePreview = $PARAMS.preview != null;
    this.saveSlotCount = RecordManager.system.saveSlotCount || 100;
    this.tempFields = new gs.GameTemp();
    window.$tempFields = this.tempFields;
    this.createSaveGameIndex();
    this.variableStore = new gs.VariableStore();
    DataManager.getDocumentsByType("persistent_variables");
    this.variableStore.setupDomains(DataManager.getDocumentsByType("global_variables").select(function(v) {
      return v.items.domain || "";
    }));
    this.variableStore.persistentNumbersByDomain = (ref = this.globalData.persistentNumbers) != null ? ref : this.variableStore.persistentNumbersByDomain;
    this.variableStore.persistentBooleansByDomain = (ref1 = this.globalData.persistentBooleans) != null ? ref1 : this.variableStore.persistentBooleansByDomain;
    this.variableStore.persistentStringsByDomain = (ref2 = this.globalData.persistentStrings) != null ? ref2 : this.variableStore.persistentStringsByDomain;
    this.variableStore.persistentListsByDomain = (ref3 = this.globalData.persistentLists) != null ? ref3 : this.variableStore.persistentListsByDomain;
    this.sceneViewport = new gs.Object_Viewport(new Viewport(0, 0, Graphics.width, Graphics.height, Graphics.viewport));
    ref4 = RecordManager.charactersArray;
    for (j = 0, len = ref4.length; j < len; j++) {
      character = ref4[j];
      if (character != null) {
        this.characterParams[character.index] = {};
        if (character.params != null) {
          ref5 = character.params;
          for (k = 0, len1 = ref5.length; k < len1; k++) {
            param = ref5[k];
            this.characterParams[character.index][param.name] = param.value;
          }
        }
      }
    }
    this.setupCommonEvents();
    for (i = l = 0, ref6 = RecordManager.characters; 0 <= ref6 ? l < ref6 : l > ref6; i = 0 <= ref6 ? ++l : --l) {
      this.settings.voicesPerCharacter[i] = 100;
    }
    this.chapters = DataManager.getDocumentsByType("vn.chapter");
    return this.chapters.sort(function(a, b) {
      if (a.items.order > b.items.order) {
        return 1;
      } else if (a.items.order < b.items.order) {
        return -1;
      } else {
        return 0;
      }
    });
  };


  /**
  * Sets up common events.
  *
  * @method setupCommonEvents
   */

  GameManager.prototype.setupCommonEvents = function() {
    var event, j, k, len, len1, object, ref, ref1, results;
    ref = this.commonEvents;
    for (j = 0, len = ref.length; j < len; j++) {
      event = ref[j];
      if (event != null) {
        event.dispose();
      }
    }
    this.commonEvents = [];
    ref1 = RecordManager.commonEvents;
    results = [];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      event = ref1[k];
      object = new gs.Object_CommonEvent();
      object.record = Object.deepCopy(event);
      object.rid = event.index;
      this.commonEvents[event.index] = object;
      results.push(this.commonEvents.push(object));
    }
    return results;
  };


  /**
  * Preloads resources for common events with auto-preload option enabled.
  *
  * @method preloadCommonEvents
   */

  GameManager.prototype.preloadCommonEvents = function() {
    var event, j, len, ref, results;
    ref = RecordManager.commonEvents;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      event = ref[j];
      if (!event) {
        continue;
      }
      if (event.startCondition === 1 && event.autoPreload) {
        results.push(gs.ResourceLoader.loadEventCommandsGraphics(event.commands));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };


  /**
  * Sets up cursor depending on system settings.
  *
  * @method setupCursor
   */

  GameManager.prototype.setupCursor = function() {
    var bitmap, ref;
    if ((ref = RecordManager.system.cursor) != null ? ref.name : void 0) {
      bitmap = ResourceManager.getBitmap(ResourceManager.getPath(RecordManager.system.cursor));
      return Graphics.setCursorBitmap(bitmap, RecordManager.system.cursor.hx, RecordManager.system.cursor.hy);
    } else {
      return Graphics.setCursorBitmap(null);
    }
  };


  /**
  * Disposes the GameManager. Should be called before quit the game.
  *
  * @method dispose
   */

  GameManager.prototype.dispose = function() {};


  /**
  * Quits the game. The implementation depends on the platform. So for example on mobile
  * devices this method has no effect.
  *
  * @method exit
   */

  GameManager.prototype.exit = function() {
    return Application.exit();
  };


  /**
  * Resets the GameManager by disposing and re-initializing it.
  *
  * @method reset
   */

  GameManager.prototype.reset = function() {
    this.initialized = false;
    this.interpreter = null;
    this.dispose();
    return this.initialize();
  };


  /**
  * Starts a new game.
  *
  * @method newGame
   */

  GameManager.prototype.newGame = function() {
    this.messages = [];
    this.variableStore.clearAllGlobalVariables();
    this.variableStore.clearAllLocalVariables();
    this.tempSettings.skip = false;
    this.tempFields.clear();
    this.tempFields.inGame = true;
    this.setupCommonEvents();
    this.tempSettings.menuAccess = true;
    this.tempSettings.saveMenuAccess = true;
    this.tempSettings.loadMenuAccess = true;
    return this.tempSettings.backlogAccess = true;
  };


  /**
  * Exists the game and resets the GameManager which is important before going back to
  * the main menu or title screen.
  *
  * @method exitGame
   */

  GameManager.prototype.exitGame = function() {
    this.tempFields.inGame = false;
    return this.tempFields.isExitingGame = true;
  };


  /**
  * Updates the GameManager. Should be called once per frame.
  *
  * @method update
   */

  GameManager.prototype.update = function() {};


  /**
  * Creates the index of all save-games. Should be called whenever a new save game
  * is created.
  *
  * @method createSaveGameIndex
  * @protected
   */

  GameManager.prototype.createSaveGameIndex = function() {
    var chaper, chapter, header, i, image, j, ref, scene;
    this.saveGameSlots = [];
    for (i = j = 0, ref = this.saveSlotCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      if (GameStorage.exists("SaveGame_" + i + "_Header")) {
        header = GameStorage.getObject("SaveGame_" + i + "_Header");
        chapter = DataManager.getDocument(header.chapterUid);
        scene = DataManager.getDocumentSummary(header.sceneUid);
        image = header.image;
      } else {
        header = null;
        chaper = null;
        scene = null;
      }
      if ((chapter != null) && (scene != null) && !this.inLivePreview) {
        this.saveGameSlots.push({
          date: header.date,
          chapter: chapter.items.name || "DELETED",
          scene: scene.items.name || "DELETED",
          image: image
        });
      } else {
        this.saveGameSlots.push({
          "date": "",
          "chapter": "",
          "scene": "",
          "image": null
        });
      }
    }
    return this.saveGameSlots;
  };


  /**
  * Resets the game's settings to its default values.
  *
  * @method resetSettings
   */

  GameManager.prototype.resetSettings = function() {
    var i, j, ref;
    this.settings = {
      version: 342,
      renderer: 0,
      filter: 1,
      confirmation: true,
      adjustAspectRatio: false,
      allowSkip: true,
      allowSkipUnreadMessages: true,
      allowVideoSkip: true,
      skipVoiceOnAction: true,
      allowChoiceSkip: false,
      voicesByCharacter: [],
      timeMessageToVoice: true,
      "autoMessage": {
        enabled: false,
        time: 0,
        waitForVoice: true,
        stopOnAction: false
      },
      "voiceEnabled": true,
      "bgmEnabled": true,
      "soundEnabled": true,
      "voiceVolume": 100,
      "bgmVolume": 100,
      "seVolume": 100,
      "messageSpeed": 4,
      "fullScreen": false,
      "aspectRatio": 0
    };
    this.saveGameSlots = [];
    for (i = j = 0, ref = this.saveSlotCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      GameStorage.remove("SaveGame_" + i + "_Header");
      GameStorage.remove("SaveGame_" + i);
      this.saveGameSlots.push({
        "date": "",
        "chapter": "",
        "scene": "",
        "thumb": ""
      });
    }
    return GameStorage.setObject("settings", this.settings);
  };


  /**
  * Saves current game settings.
  *
  * @method saveSettings
   */

  GameManager.prototype.saveSettings = function() {
    return GameStorage.setObject("settings", this.settings);
  };


  /**
  * Saves current global data.
  *
  * @method saveGlobalData
   */

  GameManager.prototype.saveGlobalData = function() {
    this.globalData.persistentNumbers = this.variableStore.persistentNumbersByDomain;
    this.globalData.persistentLists = this.variableStore.persistentListsByDomain;
    this.globalData.persistentBooleans = this.variableStore.persistentBooleansByDomain;
    this.globalData.persistentStrings = this.variableStore.persistentStringsByDomain;
    return GameStorage.setObject("globalData", this.globalData);
  };


  /**
  * Resets current global data. All stored data about read messages, persistent variables and
  * CG gallery will be deleted.
  *
  * @method resetGlobalData
   */

  GameManager.prototype.resetGlobalData = function() {
    var cg, data, i, j, len, ref, ref1, version;
    version = (ref = this.globalData) != null ? ref.version : void 0;
    data = this.globalData;
    this.globalData = {
      messages: {},
      cgGallery: {},
      version: 342,
      persistentNumbers: {
        "0": [],
        "com.degica.vnm.default": []
      },
      persistentStrings: {
        "0": [],
        "com.degica.vnm.default": []
      },
      persistentBooleans: {
        "0": [],
        "com.degica.vnm.default": []
      },
      persistentLists: {
        "0": [],
        "com.degica.vnm.default": []
      }
    };
    ref1 = RecordManager.cgGalleryArray;
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      cg = ref1[i];
      if (cg != null) {
        this.globalData.cgGallery[cg.index] = {
          unlocked: false
        };
      }
    }
    GameStorage.setObject("globalData", this.globalData);
    return this.migrateGlobalData(data, version + 1, this.globalData.version);
  };

  GameManager.prototype.migrateGlobalData = function(data, from, to) {
    var i, j, ref, ref1, results;
    results = [];
    for (i = j = ref = from, ref1 = to; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
      if (this["migrateGlobalData" + i] != null) {
        results.push(this["migrateGlobalData" + i](data));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  GameManager.prototype.migrateGlobalData342 = function(data) {
    if (data != null) {
      this.globalData.persistentNumbers[0] = data.persistentNumbers[0] || [];
      this.globalData.persistentStrings[0] = data.persistentStrings[0] || [];
      this.globalData.persistentBooleans[0] = data.persistentBooleans[0] || [];
      this.globalData.persistentLists[0] = data.persistentLists[0] || [];
      this.globalData.persistentNumbers["com.degica.vnm.default"] = data.persistentNumbers[0] || [];
      this.globalData.persistentStrings["com.degica.vnm.default"] = data.persistentStrings[0] || [];
      this.globalData.persistentBooleans["com.degica.vnm.default"] = data.persistentBooleans[0] || [];
      return this.globalData.persistentLists["com.degica.vnm.default"] = data.persistentLists[0] || [];
    }
  };

  GameManager.prototype.readSaveGame = function(saveGame) {};

  GameManager.prototype.writeSaveGame = function(saveGame) {};

  GameManager.prototype.prepareSaveGame = function(snapshot) {
    var context, messageBoxIds, messageBoxes, messageIds, messages, saveGame, sceneData;
    if (snapshot) {
      snapshot = ResourceManager.getCustomBitmap("$snapshot");
      if (snapshot != null) {
        snapshot.dispose();
      }
      ResourceManager.setCustomBitmap("$snapshot", Graphics.snapshot());
    }
    context = new gs.ObjectCodecContext();
    context.decodedObjectStore.push(Graphics.viewport);
    context.decodedObjectStore.push(this.scene);
    context.decodedObjectStore.push(this.scene.behavior);
    messageBoxIds = ["messageBox", "nvlMessageBox", "messageMenu"];
    messageIds = ["gameMessage_message", "nvlGameMessage_message"];
    messageBoxes = messageBoxIds.select((function(_this) {
      return function(id) {
        return _this.scene.behavior.objectManager.objectById(id);
      };
    })(this));
    messages = messageIds.select((function(_this) {
      return function(id) {
        return _this.scene.behavior.objectManager.objectById(id);
      };
    })(this));
    sceneData = {};
    saveGame = {};
    saveGame.encodedObjectStore = null;
    saveGame.sceneUid = this.scene.sceneDocument.uid;
    saveGame.data = {
      resourceContext: this.scene.behavior.resourceContext.toDataBundle(),
      currentCharacter: this.scene.currentCharacter,
      characterParams: this.characterParams,
      frameCount: Graphics.frameCount,
      tempFields: this.tempFields,
      viewport: this.scene.viewport,
      characters: this.scene.characters,
      characterNames: RecordManager.charactersArray.select(function(c) {
        return {
          name: c.name,
          index: c.index
        };
      }),
      backgrounds: this.scene.backgrounds,
      pictures: this.scene.pictureContainer.subObjectsByDomain,
      texts: this.scene.textContainer.subObjectsByDomain,
      videos: this.scene.videoContainer.subObjectsByDomain,
      viewports: this.scene.viewportContainer.subObjects,
      commonEvents: this.scene.commonEventContainer.subObjects,
      hotspots: this.scene.hotspotContainer.subObjectsByDomain,
      interpreter: this.scene.interpreter,
      choices: this.scene.choices,
      messageBoxes: messageBoxes.select((function(_this) {
        return function(mb, i) {
          return {
            visible: mb.visible,
            id: mb.id,
            message: messages[i]
          };
        };
      })(this)),
      backlog: this.backlog,
      variableStore: this.variableStore,
      defaults: this.defaults,
      transitionData: SceneManager.transitionData,
      audio: {
        audioBuffers: AudioManager.audioBuffers,
        audioBuffersByLayer: AudioManager.audioBuffersByLayer,
        audioLayers: AudioManager.audioLayers,
        soundReferences: AudioManager.soundReferences
      },
      messageAreas: this.scene.messageAreaContainer.subObjectsByDomain
    };
    saveGame.data = gs.ObjectCodec.encode(saveGame.data, context);
    saveGame.encodedObjectStore = context.encodedObjectStore;
    return this.saveGame = saveGame;
  };

  GameManager.prototype.createSaveGameSlot = function(header) {
    var slot;
    slot = {
      "date": new Date().toDateString(),
      "chapter": this.scene.chapter.items.name,
      "scene": this.scene.sceneDocument.items.name,
      "image": header.image
    };
    return slot;
  };

  GameManager.prototype.createSaveGameHeader = function(thumbWidth, thumbHeight) {
    var header, thumbImage;
    thumbImage = this.createSaveGameThumbImage(thumbWidth, thumbHeight);
    header = {
      "date": new Date().toDateString(),
      "chapterUid": this.scene.chapter.uid,
      "sceneUid": this.scene.sceneDocument.uid,
      "image": thumbImage != null ? thumbImage.image.toDataURL() : void 0
    };
    if (thumbImage != null) {
      thumbImage.dispose();
    }
    return header;
  };

  GameManager.prototype.createSaveGameThumbImage = function(width, height) {
    var snapshot, thumbImage;
    snapshot = ResourceManager.getBitmap("$snapshot");
    thumbImage = null;
    if (snapshot && snapshot.loaded) {
      if (width && height) {
        thumbImage = new Bitmap(width, height);
      } else {
        thumbImage = new Bitmap(Graphics.width / 8, Graphics.height / 8);
      }
      thumbImage.stretchBlt(new Rect(0, 0, thumbImage.width, thumbImage.height), snapshot, new Rect(0, 0, snapshot.width, snapshot.height));
    }
    return thumbImage;
  };

  GameManager.prototype.storeSaveGame = function(name, saveGame, header) {
    if (header) {
      GameStorage.setData(name + "_Header", JSON.stringify(header));
    }
    return GameStorage.setData(name, JSON.stringify(saveGame));
  };


  /**
  * Saves the current game at the specified slot.
  *
  * @method save
  * @param {number} slot - The slot where the game should be saved at.
  * @param {number} thumbWidth - The width for the snapshot-thumb. You can specify <b>null</b> or 0 to use an auto calculated width.
  * @param {number} thumbHeight - The height for the snapshot-thumb. You can specify <b>null</b> or 0 to use an auto calculated height.
   */

  GameManager.prototype.save = function(slot, thumbWidth, thumbHeight) {
    var header;
    if (this.saveGame) {
      header = this.createSaveGameHeader(thumbWidth, thumbHeight);
      this.saveGameSlots[slot] = this.createSaveGameSlot(header);
      this.storeSaveGame("SaveGame_" + slot, this.saveGame, header);
      this.sceneData = {};
      return this.saveGame;
    }
  };

  GameManager.prototype.restore = function(saveGame) {
    this.backlog = saveGame.data.backlog;
    this.defaults = saveGame.data.defaults;
    this.variableStore.restore(saveGame.data.variableStore);
    this.sceneData = saveGame.data;
    this.saveGame = null;
    this.loadedSaveGame = null;
    this.tempFields = saveGame.data.tempFields;
    this.characterParams = saveGame.data.characterParams;
    window.$tempFields = this.tempFields;
    return window.$dataFields.backlog = this.backlog;
  };

  GameManager.prototype.prepareLoadGame = function() {
    return AudioManager.stopAllMusic(30);
  };


  /**
  * Loads the game from the specified save game slot. This method triggers
  * a automatic scene change.
  *
  * @method load
  * @param {number} slot - The slot where the game should be loaded from.
   */

  GameManager.prototype.load = function(slot) {
    if (!this.saveGameSlots[slot] || this.saveGameSlots[slot].date.trim().length === 0) {
      return;
    }
    this.prepareLoadGame();
    this.loadedSaveGame = this.loadSaveGame("SaveGame_" + slot);
    gs.Audio.reset();
    gs.GlobalEventManager.clear();
    SceneManager.switchTo(new vn.Object_Scene());
    return SceneManager.clear();
  };

  GameManager.prototype.loadSaveGame = function(name) {
    return JSON.parse(GameStorage.getData(name));
  };


  /**
  * Gets the save game data for a specified slot.
  *
  * @method getSaveGame
  * @param {number} slot - The slot to get the save data from.
  * @return {Object} The save game data.
   */

  GameManager.prototype.getSaveGame = function(slot) {
    return JSON.parse(GameStorage.getData("SaveGame_" + slot));
  };

  return GameManager;

})();

window.GameManager = new GameManager();

gs.GameManager = window.GameManager;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUE7O0FBQU07O0FBQ0Y7Ozs7Ozs7OztFQVNhLHFCQUFBOztBQUNUOzs7OztJQUtBLElBQUMsQ0FBQSxTQUFELEdBQWE7O0FBRWI7Ozs7OztJQU1BLElBQUMsQ0FBQSxhQUFELEdBQWlCOztBQUVqQjs7Ozs7SUFLQSxJQUFDLENBQUEsWUFBRCxHQUFnQjs7QUFFaEI7Ozs7O0lBS0EsSUFBQyxDQUFBLFdBQUQsR0FBZTs7QUFFZjs7Ozs7SUFLQSxJQUFDLENBQUEsWUFBRCxHQUFnQjtNQUFBLElBQUEsRUFBTSxLQUFOO01BQWEsUUFBQSxFQUFVLENBQXZCO01BQTBCLGNBQUEsRUFBZ0IsSUFBMUM7TUFBZ0QsVUFBQSxFQUFZLElBQTVEO01BQWtFLGFBQUEsRUFBZSxJQUFqRjtNQUF1RixjQUFBLEVBQWdCLElBQXZHO01BQTZHLGFBQUEsRUFBZTtRQUFFLFNBQUEsRUFBVztVQUFFLElBQUEsRUFBTSxDQUFSO1NBQWI7UUFBMEIsUUFBQSxFQUFVLEVBQXBDO1FBQXdDLE1BQUEsRUFBUSxJQUFoRDs7O0FBRTVJOzs7O1NBRmdCOztJQU9oQixJQUFDLENBQUEsVUFBRCxHQUFjOztBQUVkOzs7OztJQUtBLElBQUMsQ0FBQSxRQUFELEdBQVk7TUFDUixVQUFBLEVBQVk7UUFBRSxVQUFBLEVBQVksRUFBZDtRQUFrQixRQUFBLEVBQVUsQ0FBNUI7UUFBK0IsUUFBQSxFQUFVLENBQXpDO1FBQTRDLGNBQUEsRUFBZ0IsQ0FBNUQ7UUFBK0QsZ0JBQUEsRUFBa0IsQ0FBakY7UUFBb0YsUUFBQSxFQUFVO1VBQUUsTUFBQSxFQUFRLENBQVY7VUFBYSxPQUFBLEVBQVMsQ0FBdEI7U0FBOUY7UUFBeUgsV0FBQSxFQUFhO1VBQUUsTUFBQSxFQUFRLENBQVY7VUFBYSxVQUFBLEVBQVksQ0FBekI7VUFBNEIsTUFBQSxFQUFRO1lBQUUsU0FBQSxFQUFXLElBQWI7WUFBbUIsT0FB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S0FBTCxDQUFXLFdBQVcsQ0FBQyxPQUFaLENBQW9CLFdBQUEsR0FBWSxJQUFoQyxDQUFYO0VBQVY7Ozs7OztBQUVqQixNQUFNLENBQUMsV0FBUCxHQUF5QixJQUFBLFdBQUEsQ0FBQTs7QUFDekIsRUFBRSxDQUFDLFdBQUgsR0FBaUIsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jXG4jICAgU2NyaXB0OiBHYW1lTWFuYWdlclxuI1xuIyAgICQkQ09QWVJJR0hUJCRcbiNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuY2xhc3MgR2FtZU1hbmFnZXJcbiAgICAjIyMqXG4gICAgKiBNYW5hZ2VzIGFsbCBnZW5lcmFsIHRoaW5ncyBhcm91bmQgdGhlIGdhbWUgbGlrZSBob2xkaW5nIHRoZSBnYW1lIHNldHRpbmdzLFxuICAgICogbWFuYWdlcyB0aGUgc2F2ZS9sb2FkIG9mIGEgZ2FtZSwgZXRjLlxuICAgICpcbiAgICAqIEBtb2R1bGUgZ3NcbiAgICAqIEBjbGFzcyBHYW1lTWFuYWdlclxuICAgICogQG1lbWJlcm9mIGdzXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAjIyNcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIFRoZSBjdXJyZW50IHNjZW5lIGRhdGEuXG4gICAgICAgICogQHByb3BlcnR5IHNjZW5lRGF0YVxuICAgICAgICAqIEB0eXBlIE9iamVjdFxuICAgICAgICAjIyNcbiAgICAgICAgQHNjZW5lRGF0YSA9IHt9XG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIFRoZSBzY2VuZSB2aWV3cG9ydCBjb250YWluaW5nIGFsbCB2aXN1YWwgb2JqZWN0cyB3aGljaCBhcmUgcGFydCBvZiB0aGUgc2NlbmUgYW5kIGluZmx1ZW5jZWRcbiAgICAgICAgKiBieSB0aGUgaW4tZ2FtZSBjYW1lcmEuXG4gICAgICAgICogQHByb3BlcnR5IHNjZW5lVmlld3BvcnRcbiAgICAgICAgKiBAdHlwZSBncy5PYmplY3RfVmlld3BvcnRcbiAgICAgICAgIyMjXG4gICAgICAgIEBzY2VuZVZpZXdwb3J0ID0gbnVsbFxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBUaGUgbGlzdCBvZiBjb21tb24gZXZlbnRzLlxuICAgICAgICAqIEBwcm9wZXJ0eSBjb21tb25FdmVudHNcbiAgICAgICAgKiBAdHlwZSBncy5PYmplY3RfQ29tbW9uRXZlbnRbXVxuICAgICAgICAjIyNcbiAgICAgICAgQGNvbW1vbkV2ZW50cyA9IFtdXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIEluZGljYXRlcyBpZiB0aGUgR2FtZU1hbmFnZXIgaXMgaW5pdGlhbGl6ZWQuXG4gICAgICAgICogQHByb3BlcnR5IGNvbW1vbkV2ZW50c1xuICAgICAgICAqIEB0eXBlIGdzLk9iamVjdF9Db21tb25FdmVudFtdXG4gICAgICAgICMjI1xuICAgICAgICBAaW5pdGlhbGl6ZWQgPSBub1xuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBUZW1wb3JhcnkgZ2FtZSBzZXR0aW5ncy5cbiAgICAgICAgKiBAcHJvcGVydHkgdGVtcFNldHRpbmdzXG4gICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICMjI1xuICAgICAgICBAdGVtcFNldHRpbmdzID0gc2tpcDogZmFsc2UsIHNraXBUaW1lOiA1LCBsb2FkTWVudUFjY2VzczogdHJ1ZSwgbWVudUFjY2VzczogdHJ1ZSwgYmFja2xvZ0FjY2VzczogdHJ1ZSwgc2F2ZU1lbnVBY2Nlc3M6IHRydWUsIG1lc3NhZ2VGYWRpbmc6IHsgYW5pbWF0aW9uOiB7IHR5cGU6IDEgfSwgZHVyYXRpb246IDE1LCBlYXNpbmc6IG51bGwgfVxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBUZW1wb3JhcnkgZ2FtZSBmaWVsZHMuXG4gICAgICAgICogQHByb3BlcnR5IHRlbXBGaWVsZHNcbiAgICAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgICAgIyMjXG4gICAgICAgIEB0ZW1wRmllbGRzID0gbnVsbFxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBTdG9yZXMgZGVmYXVsdCB2YWx1ZXMgZm9yIGJhY2tncm91bmRzLCBwaWN0dXJlcywgZXRjLlxuICAgICAgICAqIEBwcm9wZXJ0eSBkZWZhdWx0c1xuICAgICAgICAqIEB0eXBlIE9iamVjdFxuICAgICAgICAjIyNcbiAgICAgICAgQGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogeyBcImR1cmF0aW9uXCI6IDMwLCBcIm9yaWdpblwiOiAwLCBcInpPcmRlclwiOiAwLCBcImxvb3BWZXJ0aWNhbFwiOiAwLCBcImxvb3BIb3Jpem9udGFsXCI6IDAsIFwiZWFzaW5nXCI6IHsgXCJ0eXBlXCI6IDAsIFwiaW5PdXRcIjogMSB9LCBcImFuaW1hdGlvblwiOiB7IFwidHlwZVwiOiAxLCBcIm1vdmVtZW50XCI6IDAsIFwibWFza1wiOiB7IFwiZ3JhcGhpY1wiOiBudWxsLCBcInZhZ3VlXCI6IDMwIH0gfSwgXCJtb3Rpb25CbHVyXCI6IHsgXCJlbmFibGVkXCI6IDAsIFwiZGVsYXlcIjogMiwgXCJvcGFjaXR5XCI6IDEwMCwgXCJkaXNzb2x2ZVNwZWVkXCI6IDMgfSB9LFxuICAgICAgICAgICAgcGljdHVyZTogeyBcImFwcGVhckR1cmF0aW9uXCI6IDMwLCBcImRpc2FwcGVhckR1cmF0aW9uXCI6IDMwLCBcIm9yaWdpblwiOiAxLCBcInpPcmRlclwiOiAwLCBcImFwcGVhckVhc2luZ1wiOiB7IFwidHlwZVwiOiAwLCBcImluT3V0XCI6IDEgfSwgXCJkaXNhcHBlYXJFYXNpbmdcIjogeyBcInR5cGVcIjogMCwgXCJpbk91dFwiOiAxIH0sIFwiYXBwZWFyQW5pbWF0aW9uXCI6IHsgXCJ0eXBlXCI6IDEsIFwibW92ZW1lbnRcIjogMCwgXCJtYXNrXCI6IHsgXCJncmFwaGljXCI6IG51bGwsIFwidmFndWVcIjogMzAgfSB9LCBcImRpc2FwcGVhckFuaW1hdGlvblwiOiB7IFwidHlwZVwiOiAxLCBcIm1vdmVtZW50XCI6IDAsIFwibWFza1wiOiB7IFwiZ3JhcGhpY1wiOiBudWxsLCBcInZhZ3VlXCI6IDMwIH0gfSwgXCJtb3Rpb25CbHVyXCI6IHsgXCJlbmFibGVkXCI6IDAsIFwiZGVsYXlcIjogMiwgXCJvcGFjaXR5XCI6IDEwMCwgXCJkaXNzb2x2ZVNwZWVkXCI6IDMgfSB9LFxuICAgICAgICAgICAgY2hhcmFjdGVyOiB7IFwiZXhwcmVzc2lvbkR1cmF0aW9uXCI6IDAsIFwiYXBwZWFyRHVyYXRpb25cIjogNDAsIFwiZGlzYXBwZWFyRHVyYXRpb25cIjogNDAsIFwib3JpZ2luXCI6IDEsIFwiek9yZGVyXCI6IDAsIFwiYXBwZWFyRWFzaW5nXCI6IHsgXCJ0eXBlXCI6IDIsIFwiaW5PdXRcIjogMiB9LCBcImRpc2FwcGVhckVhc2luZ1wiOiB7IFwidHlwZVwiOiAxLCBcImluT3V0XCI6IDEgfSwgXCJhcHBlYXJBbmltYXRpb25cIjogeyBcInR5cGVcIjogMSwgXCJtb3ZlbWVudFwiOiAwLCBcIm1hc2tcIjogeyBcImdyYXBoaWNcIjogbnVsbCwgXCJ2YWd1ZVwiOiAzMCB9IH0sIFwiZGlzYXBwZWFyQW5pbWF0aW9uXCI6IHsgXCJ0eXBlXCI6IDEsIFwibW92ZW1lbnRcIjogMCwgXCJtYXNrXCI6IHsgXCJncmFwaGljXCI6IG51bGwsIFwidmFndWVcIjogMzAgfSB9LCBcIm1vdGlvbkJsdXJcIjogeyBcImVuYWJsZWRcIjogMCwgXCJkZWxheVwiOiAyLCBcIm9wYWNpdHlcIjogMTAwLCBcImRpc3NvbHZlU3BlZWRcIjogMyB9LCBcImNoYW5nZUFuaW1hdGlvblwiOiB7IFwidHlwZVwiOiAxLCBcIm1vdmVtZW50XCI6IDAsIFwiZmFkaW5nXCI6IDAsIFwibWFza1wiOiB7IFwiZ3JhcGhpY1wiOiBudWxsLCBcInZhZ3VlXCI6IDMwIH0gfSwgXCJjaGFuZ2VFYXNpbmdcIjogeyBcInR5cGVcIjogMiwgXCJpbk91dFwiOiAyIH0gfSxcbiAgICAgICAgICAgIHRleHQ6IHsgXCJhcHBlYXJEdXJhdGlvblwiOiAzMCwgXCJkaXNhcHBlYXJEdXJhdGlvblwiOiAzMCwgXCJwb3NpdGlvbk9yaWdpblwiOiAwLCBcIm9yaWdpblwiOiAwLCBcInpPcmRlclwiOiAwLCBcImFwcGVhckVhc2luZ1wiOiB7IFwidHlwZVwiOiAwLCBcImluT3V0XCI6IDEgfSwgXCJkaXNhcHBlYXJFYXNpbmdcIjogeyBcInR5cGVcIjogMCwgXCJpbk91dFwiOiAxIH0sIFwiYXBwZWFyQW5pbWF0aW9uXCI6IHsgXCJ0eXBlXCI6IDEsIFwibW92ZW1lbnRcIjogMCwgXCJtYXNrXCI6IHsgXCJncmFwaGljXCI6IG51bGwsIFwidmFndWVcIjogMzAgfSB9LCBcImRpc2FwcGVhckFuaW1hdGlvblwiOiB7IFwidHlwZVwiOiAxLCBcIm1vdmVtZW50XCI6IDAsIFwibWFza1wiOiB7IFwiZ3JhcGhpY1wiOiBudWxsLCBcInZhZ3VlXCI6IDMwIH0gfSwgXCJtb3Rpb25CbHVyXCI6IHsgXCJlbmFibGVkXCI6IDAsIFwiZGVsYXlcIjogMiwgXCJvcGFjaXR5XCI6IDEwMCwgXCJkaXNzb2x2ZVNwZWVkXCI6IDMgfSB9LFxuICAgICAgICAgICAgdmlkZW86IHsgXCJhcHBlYXJEdXJhdGlvblwiOiAzMCwgXCJkaXNhcHBlYXJEdXJhdGlvblwiOiAzMCwgXCJvcmlnaW5cIjogMCwgXCJ6T3JkZXJcIjogMCwgXCJhcHBlYXJFYXNpbmdcIjogeyBcInR5cGVcIjogMCwgXCJpbk91dFwiOiAxIH0sIFwiZGlzYXBwZWFyRWFzaW5nXCI6IHsgXCJ0eXBlXCI6IDAsIFwiaW5PdXRcIjogMSB9LCBcImFwcGVhckFuaW1hdGlvblwiOiB7IFwidHlwZVwiOiAxLCBcIm1vdmVtZW50XCI6IDAsIFwibWFza1wiOiB7IFwiZ3JhcGhpY1wiOiBudWxsLCBcInZhZ3VlXCI6IDMwIH0gfSwgXCJkaXNhcHBlYXJBbmltYXRpb25cIjogeyBcInR5cGVcIjogMSwgXCJtb3ZlbWVudFwiOiAwLCBcIm1hc2tcIjogeyBcImdyYXBoaWNcIjogbnVsbCwgXCJ2YWd1ZVwiOiAzMCB9IH0sIFwibW90aW9uQmx1clwiOiB7IFwiZW5hYmxlZFwiOiAwLCBcImRlbGF5XCI6IDIsIFwib3BhY2l0eVwiOiAxMDAsIFwiZGlzc29sdmVTcGVlZFwiOiAzIH0gfSxcbiAgICAgICAgICAgIGxpdmUyZDogeyBcIm1vdGlvbkZhZGVJblRpbWVcIjogMTAwMCwgXCJhcHBlYXJEdXJhdGlvblwiOiAzMCwgXCJkaXNhcHBlYXJEdXJhdGlvblwiOiAzMCwgXCJ6T3JkZXJcIjogMCwgXCJhcHBlYXJFYXNpbmdcIjogeyBcInR5cGVcIjogMCwgXCJpbk91dFwiOiAxIH0sIFwiZGlzYXBwZWFyRWFzaW5nXCI6IHsgXCJ0eXBlXCI6IDAsIFwiaW5PdXRcIjogMSB9LCBcImFwcGVhckFuaW1hdGlvblwiOiB7IFwidHlwZVwiOiAxLCBcIm1vdmVtZW50XCI6IDAsIFwibWFza1wiOiB7IFwiZ3JhcGhpY1wiOiBudWxsLCBcInZhZ3VlXCI6IDMwIH0gfSwgXCJkaXNhcHBlYXJBbmltYXRpb25cIjogeyBcInR5cGVcIjogMSwgXCJtb3ZlbWVudFwiOiAwLCBcIm1hc2tcIjogeyBcImdyYXBoaWNcIjogbnVsbCwgXCJ2YWd1ZVwiOiAzMCB9IH0gfSxcbiAgICAgICAgICAgIG1lc3NhZ2VCb3g6IHsgXCJhcHBlYXJEdXJhdGlvblwiOiAzMCwgXCJkaXNhcHBlYXJEdXJhdGlvblwiOiAzMCwgXCJ6T3JkZXJcIjogMCwgXCJhcHBlYXJFYXNpbmdcIjogeyBcInR5cGVcIjogMCwgXCJpbk91dFwiOiAxIH0sIFwiZGlzYXBwZWFyRWFzaW5nXCI6IHsgXCJ0eXBlXCI6IDAsIFwiaW5PdXRcIjogMSB9LCBcImFwcGVhckFuaW1hdGlvblwiOiB7IFwidHlwZVwiOiAwLCBcIm1vdmVtZW50XCI6IDMsIFwibWFza1wiOiB7IFwiZ3JhcGhpY1wiOiBudWxsLCBcInZhZ3VlXCI6IDMwIH0gfSwgXCJkaXNhcHBlYXJBbmltYXRpb25cIjogeyBcInR5cGVcIjogMCwgXCJtb3ZlbWVudFwiOiAzLCBcIm1hc2tcIjogeyBcImdyYXBoaWNcIjogbnVsbCwgXCJ2YWd1ZVwiOiAzMCB9IH0gfSxcbiAgICAgICAgICAgIGF1ZGlvOiB7IFwibXVzaWNGYWRlSW5EdXJhdGlvblwiOiAwLCBcIm11c2ljRmFkZU91dER1cmF0aW9uXCI6IDAsIFwibXVzaWNWb2x1bWVcIjogMTAwLCBcIm11c2ljUGxheWJhY2tSYXRlXCI6IDEwMCwgXCJzb3VuZFZvbHVtZVwiOiAxMDAsIFwic291bmRQbGF5YmFja1JhdGVcIjogMTAwLCBcInZvaWNlVm9sdW1lXCI6IDEwMCwgXCJ2b2ljZVBsYXliYWNrUmF0ZVwiOiAxMDAgfVxuICAgICAgICB9XG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIFRoZSBnYW1lJ3MgYmFja2xvZy5cbiAgICAgICAgKiBAcHJvcGVydHkgYmFja2xvZ1xuICAgICAgICAqIEB0eXBlIE9iamVjdFtdXG4gICAgICAgICMjI1xuICAgICAgICBAYmFja2xvZyA9IFtdXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIENoYXJhY3RlciBwYXJhbWV0ZXJzIGJ5IGNoYXJhY3RlciBJRC5cbiAgICAgICAgKiBAcHJvcGVydHkgY2hhcmFjdGVyUGFyYW1zXG4gICAgICAgICogQHR5cGUgT2JqZWN0W11cbiAgICAgICAgIyMjXG4gICAgICAgIEBjaGFyYWN0ZXJQYXJhbXMgPSBbXVxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBUaGUgZ2FtZSdzIGNoYXB0ZXJcbiAgICAgICAgKiBAcHJvcGVydHkgY2hhcHRlcnNcbiAgICAgICAgKiBAdHlwZSBncy5Eb2N1bWVudFtdXG4gICAgICAgICMjI1xuICAgICAgICBAY2hhcHRlcnMgPSBbXVxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBUaGUgZ2FtZSdzIGN1cnJlbnQgZGlzcGxheWVkIG1lc3NhZ2VzLiBFc3BlY2lhbGx5IGluIE5WTCBtb2RlIHRoZSBtZXNzYWdlc1xuICAgICAgICAqIG9mIHRoZSBjdXJyZW50IHBhZ2UgYXJlIHN0b3JlZCBoZXJlLlxuICAgICAgICAqIEBwcm9wZXJ0eSBtZXNzYWdlc1xuICAgICAgICAqIEB0eXBlIE9iamVjdFtdXG4gICAgICAgICMjI1xuICAgICAgICBAbWVzc2FnZXMgPSBbXVxuXG4gICAgICAgICMjIypcbiAgICAgICAgKiBDb3VudCBvZiBzYXZlIHNsb3RzLiBEZWZhdWx0IGlzIDEwMC5cbiAgICAgICAgKiBAcHJvcGVydHkgc2F2ZVNsb3RDb3VudFxuICAgICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgICAjIyNcbiAgICAgICAgQHNhdmVTbG90Q291bnQgPSAxMDBcblxuICAgICAgICAjIyMqXG4gICAgICAgICogVGhlIGluZGV4IG9mIHNhdmUgZ2FtZXMuIENvbnRhaW5zIHRoZSBoZWFkZXItaW5mbyBmb3IgZWFjaCBzYXZlIGdhbWUgc2xvdC5cbiAgICAgICAgKiBAcHJvcGVydHkgc2F2ZUdhbWVTbG90c1xuICAgICAgICAqIEB0eXBlIE9iamVjdFtdXG4gICAgICAgICMjI1xuICAgICAgICBAc2F2ZUdhbWVTbG90cyA9IFtdXG5cbiAgICAgICAgIyMjKlxuICAgICAgICAqIFN0b3JlcyBnbG9iYWwgZGF0YSBsaWtlIHRoZSBzdGF0ZSBvZiBwZXJzaXN0ZW50IGdhbWUgdmFyaWFibGVzLlxuICAgICAgICAqIEBwcm9wZXJ0eSBnbG9iYWxEYXRhXG4gICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICMjI1xuICAgICAgICBAZ2xvYmFsRGF0YSA9IG51bGxcblxuICAgICAgICAjIyMqXG4gICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSBnYW1lIHJ1bnMgaW4gZWRpdG9yJ3MgbGl2ZS1wcmV2aWV3LlxuICAgICAgICAqIEBwcm9wZXJ0eSBpbkxpdmVQcmV2aWV3XG4gICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICMjI1xuICAgICAgICBAaW5MaXZlUHJldmlldyA9IG5vXG5cblxuICAgICMjIypcbiAgICAqIEluaXRpYWxpemVzIHRoZSBHYW1lTWFuYWdlciwgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgdGhlIGFjdHVhbCBnYW1lIHN0YXJ0cy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICAjIyNcbiAgICBpbml0aWFsaXplOiAtPlxuICAgICAgICBAaW5pdGlhbGl6ZWQgPSB5ZXNcbiAgICAgICAgQGluTGl2ZVByZXZpZXcgPSAkUEFSQU1TLnByZXZpZXc/XG4gICAgICAgIEBzYXZlU2xvdENvdW50ID0gUmVjb3JkTWFuYWdlci5zeXN0ZW0uc2F2ZVNsb3RDb3VudCB8fCAxMDBcbiAgICAgICAgQHRlbXBGaWVsZHMgPSBuZXcgZ3MuR2FtZVRlbXAoKVxuICAgICAgICB3aW5kb3cuJHRlbXBGaWVsZHMgPSBAdGVtcEZpZWxkc1xuXG4gICAgICAgIEBjcmVhdGVTYXZlR2FtZUluZGV4KClcbiAgICAgICAgQHZhcmlhYmxlU3RvcmUgPSBuZXcgZ3MuVmFyaWFibGVTdG9yZSgpXG4gICAgICAgIERhdGFNYW5hZ2VyLmdldERvY3VtZW50c0J5VHlwZShcInBlcnNpc3RlbnRfdmFyaWFibGVzXCIpXG4gICAgICAgIEB2YXJpYWJsZVN0b3JlLnNldHVwRG9tYWlucyhEYXRhTWFuYWdlci5nZXREb2N1bWVudHNCeVR5cGUoXCJnbG9iYWxfdmFyaWFibGVzXCIpLnNlbGVjdCAodikgLT4gdi5pdGVtcy5kb21haW58fFwiXCIpXG4gICAgICAgIEB2YXJpYWJsZVN0b3JlLnBlcnNpc3RlbnROdW1iZXJzQnlEb21haW4gPSBAZ2xvYmFsRGF0YS5wZXJzaXN0ZW50TnVtYmVycyA/IEB2YXJpYWJsZVN0b3JlLnBlcnNpc3RlbnROdW1iZXJzQnlEb21haW5cbiAgICAgICAgQHZhcmlhYmxlU3RvcmUucGVyc2lzdGVudEJvb2xlYW5zQnlEb21haW4gPSBAZ2xvYmFsRGF0YS5wZXJzaXN0ZW50Qm9vbGVhbnMgPyBAdmFyaWFibGVTdG9yZS5wZXJzaXN0ZW50Qm9vbGVhbnNCeURvbWFpblxuICAgICAgICBAdmFyaWFibGVTdG9yZS5wZXJzaXN0ZW50U3RyaW5nc0J5RG9tYWluID0gQGdsb2JhbERhdGEucGVyc2lzdGVudFN0cmluZ3MgPyBAdmFyaWFibGVTdG9yZS5wZXJzaXN0ZW50U3RyaW5nc0J5RG9tYWluXG4gICAgICAgIEB2YXJpYWJsZVN0b3JlLnBlcnNpc3RlbnRMaXN0c0J5RG9tYWluID0gQGdsb2JhbERhdGEucGVyc2lzdGVudExpc3RzID8gQHZhcmlhYmxlU3RvcmUucGVyc2lzdGVudExpc3RzQnlEb21haW5cblxuICAgICAgICBAc2NlbmVWaWV3cG9ydCA9IG5ldyBncy5PYmplY3RfVmlld3BvcnQobmV3IFZpZXdwb3J0KDAsIDAsIEdyYXBoaWNzLndpZHRoLCBHcmFwaGljcy5oZWlnaHQsIEdyYXBoaWNzLnZpZXdwb3J0KSlcbiAgICAgICAgZm9yIGNoYXJhY3RlciBpbiBSZWNvcmRNYW5hZ2VyLmNoYXJhY3RlcnNBcnJheVxuICAgICAgICAgICAgaWYgY2hhcmFjdGVyP1xuICAgICAgICAgICAgICAgIEBjaGFyYWN0ZXJQYXJhbXNbY2hhcmFjdGVyLmluZGV4XSA9IHt9XG4gICAgICAgICAgICAgICAgaWYgY2hhcmFjdGVyLnBhcmFtcz9cbiAgICAgICAgICAgICAgICAgICAgZm9yIHBhcmFtIGluIGNoYXJhY3Rlci5wYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjaGFyYWN0ZXJQYXJhbXNbY2hhcmFjdGVyLmluZGV4XVtwYXJhbS5uYW1lXSA9IHBhcmFtLnZhbHVlXG5cblxuICAgICAgICBAc2V0dXBDb21tb25FdmVudHMoKVxuXG4gICAgICAgIGZvciBpIGluIFswLi4uUmVjb3JkTWFuYWdlci5jaGFyYWN0ZXJzXVxuICAgICAgICAgICAgQHNldHRpbmdzLnZvaWNlc1BlckNoYXJhY3RlcltpXSA9IDEwMFxuXG4gICAgICAgIEBjaGFwdGVycyA9IERhdGFNYW5hZ2VyLmdldERvY3VtZW50c0J5VHlwZShcInZuLmNoYXB0ZXJcIilcbiAgICAgICAgQGNoYXB0ZXJzLnNvcnQgKGEsIGIpIC0+XG4gICAgICAgICAgICBpZiBhLml0ZW1zLm9yZGVyID4gYi5pdGVtcy5vcmRlclxuICAgICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICBlbHNlIGlmIGEuaXRlbXMub3JkZXIgPCBiLml0ZW1zLm9yZGVyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIDBcblxuICAgICMjIypcbiAgICAqIFNldHMgdXAgY29tbW9uIGV2ZW50cy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNldHVwQ29tbW9uRXZlbnRzXG4gICAgIyMjXG4gICAgc2V0dXBDb21tb25FdmVudHM6IC0+XG4gICAgICAgIGZvciBldmVudCBpbiBAY29tbW9uRXZlbnRzXG4gICAgICAgICAgICBldmVudD8uZGlzcG9zZSgpXG5cbiAgICAgICAgQGNvbW1vbkV2ZW50cyA9IFtdXG4gICAgICAgIGZvciBldmVudCBpbiBSZWNvcmRNYW5hZ2VyLmNvbW1vbkV2ZW50c1xuICAgICAgICAgICAgb2JqZWN0ID0gbmV3IGdzLk9iamVjdF9Db21tb25FdmVudCgpXG4gICAgICAgICAgICBvYmplY3QucmVjb3JkID0gT2JqZWN0LmRlZXBDb3B5KGV2ZW50KVxuICAgICAgICAgICAgb2JqZWN0LnJpZCA9IGV2ZW50LmluZGV4XG4gICAgICAgICAgICBAY29tbW9uRXZlbnRzW2V2ZW50LmluZGV4XSA9IG9iamVjdFxuICAgICAgICAgICAgQGNvbW1vbkV2ZW50cy5wdXNoKG9iamVjdClcblxuICAgICMjIypcbiAgICAqIFByZWxvYWRzIHJlc291cmNlcyBmb3IgY29tbW9uIGV2ZW50cyB3aXRoIGF1dG8tcHJlbG9hZCBvcHRpb24gZW5hYmxlZC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHByZWxvYWRDb21tb25FdmVudHNcbiAgICAjIyNcbiAgICBwcmVsb2FkQ29tbW9uRXZlbnRzOiAtPlxuICAgICAgICBmb3IgZXZlbnQgaW4gUmVjb3JkTWFuYWdlci5jb21tb25FdmVudHNcbiAgICAgICAgICAgIGNvbnRpbnVlIGlmIG5vdCBldmVudFxuICAgICAgICAgICAgaWYgZXZlbnQuc3RhcnRDb25kaXRpb24gPT0gMSBhbmQgZXZlbnQuYXV0b1ByZWxvYWRcbiAgICAgICAgICAgICAgICBncy5SZXNvdXJjZUxvYWRlci5sb2FkRXZlbnRDb21tYW5kc0dyYXBoaWNzKGV2ZW50LmNvbW1hbmRzKVxuXG4gICAgIyMjKlxuICAgICogU2V0cyB1cCBjdXJzb3IgZGVwZW5kaW5nIG9uIHN5c3RlbSBzZXR0aW5ncy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNldHVwQ3Vyc29yXG4gICAgIyMjXG4gICAgc2V0dXBDdXJzb3I6IC0+XG4gICAgICAgIGlmIFJlY29yZE1hbmFnZXIuc3lzdGVtLmN1cnNvcj8ubmFtZVxuICAgICAgICAgICAgYml0bWFwID0gUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChSZWNvcmRNYW5hZ2VyLnN5c3RlbS5jdXJzb3IpKVxuICAgICAgICAgICAgR3JhcGhpY3Muc2V0Q3Vyc29yQml0bWFwKGJpdG1hcCwgUmVjb3JkTWFuYWdlci5zeXN0ZW0uY3Vyc29yLmh4LCBSZWNvcmRNYW5hZ2VyLnN5c3RlbS5jdXJzb3IuaHkpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEdyYXBoaWNzLnNldEN1cnNvckJpdG1hcChudWxsKVxuXG4gICAgIyMjKlxuICAgICogRGlzcG9zZXMgdGhlIEdhbWVNYW5hZ2VyLiBTaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBxdWl0IHRoZSBnYW1lLlxuICAgICpcbiAgICAqIEBtZXRob2QgZGlzcG9zZVxuICAgICMjI1xuICAgIGRpc3Bvc2U6IC0+XG5cbiAgICAjIyMqXG4gICAgKiBRdWl0cyB0aGUgZ2FtZS4gVGhlIGltcGxlbWVudGF0aW9uIGRlcGVuZHMgb24gdGhlIHBsYXRmb3JtLiBTbyBmb3IgZXhhbXBsZSBvbiBtb2JpbGVcbiAgICAqIGRldmljZXMgdGhpcyBtZXRob2QgaGFzIG5vIGVmZmVjdC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGV4aXRcbiAgICAjIyNcbiAgICBleGl0OiAtPiBBcHBsaWNhdGlvbi5leGl0KClcblxuICAgICMjIypcbiAgICAqIFJlc2V0cyB0aGUgR2FtZU1hbmFnZXIgYnkgZGlzcG9zaW5nIGFuZCByZS1pbml0aWFsaXppbmcgaXQuXG4gICAgKlxuICAgICogQG1ldGhvZCByZXNldFxuICAgICMjI1xuICAgIHJlc2V0OiAtPlxuICAgICAgICBAaW5pdGlhbGl6ZWQgPSBub1xuICAgICAgICBAaW50ZXJwcmV0ZXIgPSBudWxsXG4gICAgICAgIEBkaXNwb3NlKClcbiAgICAgICAgQGluaXRpYWxpemUoKVxuXG4gICAgIyMjKlxuICAgICogU3RhcnRzIGEgbmV3IGdhbWUuXG4gICAgKlxuICAgICogQG1ldGhvZCBuZXdHYW1lXG4gICAgIyMjXG4gICAgbmV3R2FtZTogLT5cbiAgICAgICAgQG1lc3NhZ2VzID0gW11cbiAgICAgICAgQHZhcmlhYmxlU3RvcmUuY2xlYXJBbGxHbG9iYWxWYXJpYWJsZXMoKVxuICAgICAgICBAdmFyaWFibGVTdG9yZS5jbGVhckFsbExvY2FsVmFyaWFibGVzKClcbiAgICAgICAgQHRlbXBTZXR0aW5ncy5za2lwID0gbm9cbiAgICAgICAgQHRlbXBGaWVsZHMuY2xlYXIoKVxuICAgICAgICBAdGVtcEZpZWxkcy5pbkdhbWUgPSB5ZXNcbiAgICAgICAgQHNldHVwQ29tbW9uRXZlbnRzKClcbiAgICAgICAgQHRlbXBTZXR0aW5ncy5tZW51QWNjZXNzID0geWVzXG4gICAgICAgIEB0ZW1wU2V0dGluZ3Muc2F2ZU1lbnVBY2Nlc3MgPSB5ZXNcbiAgICAgICAgQHRlbXBTZXR0aW5ncy5sb2FkTWVudUFjY2VzcyA9IHllc1xuICAgICAgICBAdGVtcFNldHRpbmdzLmJhY2tsb2dBY2Nlc3MgPSB5ZXNcblxuXG4gICAgIyMjKlxuICAgICogRXhpc3RzIHRoZSBnYW1lIGFuZCByZXNldHMgdGhlIEdhbWVNYW5hZ2VyIHdoaWNoIGlzIGltcG9ydGFudCBiZWZvcmUgZ29pbmcgYmFjayB0b1xuICAgICogdGhlIG1haW4gbWVudSBvciB0aXRsZSBzY3JlZW4uXG4gICAgKlxuICAgICogQG1ldGhvZCBleGl0R2FtZVxuICAgICMjI1xuICAgIGV4aXRHYW1lOiAtPlxuICAgICAgICBAdGVtcEZpZWxkcy5pbkdhbWUgPSBub1xuICAgICAgICBAdGVtcEZpZWxkcy5pc0V4aXRpbmdHYW1lID0geWVzXG5cbiAgICAjIyMqXG4gICAgKiBVcGRhdGVzIHRoZSBHYW1lTWFuYWdlci4gU2hvdWxkIGJlIGNhbGxlZCBvbmNlIHBlciBmcmFtZS5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICMjI1xuICAgIHVwZGF0ZTogLT5cblxuICAgICMjIypcbiAgICAqIENyZWF0ZXMgdGhlIGluZGV4IG9mIGFsbCBzYXZlLWdhbWVzLiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIGEgbmV3IHNhdmUgZ2FtZVxuICAgICogaXMgY3JlYXRlZC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGNyZWF0ZVNhdmVHYW1lSW5kZXhcbiAgICAqIEBwcm90ZWN0ZWRcbiAgICAjIyNcbiAgICBjcmVhdGVTYXZlR2FtZUluZGV4OiAtPlxuICAgICAgICBAc2F2ZUdhbWVTbG90cyA9IFtdXG4gICAgICAgIGZvciBpIGluIFswLi4uQHNhdmVTbG90Q291bnRdXG4gICAgICAgICAgICBpZiBHYW1lU3RvcmFnZS5leGlzdHMoXCJTYXZlR2FtZV8je2l9X0hlYWRlclwiKVxuICAgICAgICAgICAgICAgIGhlYWRlciA9IEdhbWVTdG9yYWdlLmdldE9iamVjdChcIlNhdmVHYW1lXyN7aX1fSGVhZGVyXCIpXG4gICAgICAgICAgICAgICAgY2hhcHRlciA9IERhdGFNYW5hZ2VyLmdldERvY3VtZW50KGhlYWRlci5jaGFwdGVyVWlkKVxuICAgICAgICAgICAgICAgIHNjZW5lID0gRGF0YU1hbmFnZXIuZ2V0RG9jdW1lbnRTdW1tYXJ5KGhlYWRlci5zY2VuZVVpZClcbiAgICAgICAgICAgICAgICBpbWFnZSA9IGhlYWRlci5pbWFnZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGhlYWRlciA9IG51bGxcbiAgICAgICAgICAgICAgICBjaGFwZXIgPSBudWxsXG4gICAgICAgICAgICAgICAgc2NlbmUgPSBudWxsXG5cbiAgICAgICAgICAgIGlmIGNoYXB0ZXI/IGFuZCBzY2VuZT8gYW5kICFAaW5MaXZlUHJldmlld1xuICAgICAgICAgICAgICAgIEBzYXZlR2FtZVNsb3RzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBoZWFkZXIuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgY2hhcHRlcjogY2hhcHRlci5pdGVtcy5uYW1lIHx8IFwiREVMRVRFRFwiXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lOiBzY2VuZS5pdGVtcy5uYW1lIHx8IFwiREVMRVRFRFwiLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogaW1hZ2UgI2NoYXB0ZXIuaXRlbXMuY29tbWFuZHNbMF0ucGFyYW1zLnNhdmVHYW1lR3JhcGhpYz8ubmFtZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQHNhdmVHYW1lU2xvdHMucHVzaCh7IFwiZGF0ZVwiOiBcIlwiLCBcImNoYXB0ZXJcIjogXCJcIiwgXCJzY2VuZVwiOiBcIlwiLCBcImltYWdlXCI6IG51bGwgfSlcblxuICAgICAgICByZXR1cm4gQHNhdmVHYW1lU2xvdHNcblxuICAgICMjIypcbiAgICAqIFJlc2V0cyB0aGUgZ2FtZSdzIHNldHRpbmdzIHRvIGl0cyBkZWZhdWx0IHZhbHVlcy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHJlc2V0U2V0dGluZ3NcbiAgICAjIyNcbiAgICByZXNldFNldHRpbmdzOiAtPlxuICAgICAgICBAc2V0dGluZ3MgPSB7IHZlcnNpb246IDM0MiwgcmVuZGVyZXI6IDAsIGZpbHRlcjogMSwgY29uZmlybWF0aW9uOiB5ZXMsIGFkanVzdEFzcGVjdFJhdGlvOiBubywgYWxsb3dTa2lwOiB5ZXMsIGFsbG93U2tpcFVucmVhZE1lc3NhZ2VzOiB5ZXMsICBhbGxvd1ZpZGVvU2tpcDogeWVzLCBza2lwVm9pY2VPbkFjdGlvbjogeWVzLCBhbGxvd0Nob2ljZVNraXA6IG5vLCB2b2ljZXNCeUNoYXJhY3RlcjogW10sIHRpbWVNZXNzYWdlVG9Wb2ljZTogdHJ1ZSwgIFwiYXV0b01lc3NhZ2VcIjogeyBlbmFibGVkOiBmYWxzZSwgdGltZTogMCwgd2FpdEZvclZvaWNlOiB5ZXMsIHN0b3BPbkFjdGlvbjogbm8gfSwgIFwidm9pY2VFbmFibGVkXCI6IHRydWUsIFwiYmdtRW5hYmxlZFwiOiB0cnVlLCBcInNvdW5kRW5hYmxlZFwiOiB0cnVlLCBcInZvaWNlVm9sdW1lXCI6IDEwMCwgXCJiZ21Wb2x1bWVcIjogMTAwLCBcInNlVm9sdW1lXCI6IDEwMCwgXCJtZXNzYWdlU3BlZWRcIjogNCwgXCJmdWxsU2NyZWVuXCI6IG5vLCBcImFzcGVjdFJhdGlvXCI6IDAgfVxuICAgICAgICBAc2F2ZUdhbWVTbG90cyA9IFtdXG4gICAgICAgIGZvciBpIGluIFswLi4uQHNhdmVTbG90Q291bnRdXG4gICAgICAgICAgICBHYW1lU3RvcmFnZS5yZW1vdmUoXCJTYXZlR2FtZV8je2l9X0hlYWRlclwiKVxuICAgICAgICAgICAgR2FtZVN0b3JhZ2UucmVtb3ZlKFwiU2F2ZUdhbWVfI3tpfVwiKVxuXG4gICAgICAgICAgICBAc2F2ZUdhbWVTbG90cy5wdXNoKHsgXCJkYXRlXCI6IFwiXCIsIFwiY2hhcHRlclwiOiBcIlwiLCBcInNjZW5lXCI6IFwiXCIsIFwidGh1bWJcIjogXCJcIiB9KVxuXG4gICAgICAgIEdhbWVTdG9yYWdlLnNldE9iamVjdChcInNldHRpbmdzXCIsIEBzZXR0aW5ncylcblxuXG5cbiAgICAjIyMqXG4gICAgKiBTYXZlcyBjdXJyZW50IGdhbWUgc2V0dGluZ3MuXG4gICAgKlxuICAgICogQG1ldGhvZCBzYXZlU2V0dGluZ3NcbiAgICAjIyNcbiAgICBzYXZlU2V0dGluZ3M6IC0+XG4gICAgICAgIEdhbWVTdG9yYWdlLnNldE9iamVjdChcInNldHRpbmdzXCIsIEBzZXR0aW5ncylcblxuICAgICMjIypcbiAgICAqIFNhdmVzIGN1cnJlbnQgZ2xvYmFsIGRhdGEuXG4gICAgKlxuICAgICogQG1ldGhvZCBzYXZlR2xvYmFsRGF0YVxuICAgICMjI1xuICAgIHNhdmVHbG9iYWxEYXRhOiAtPlxuICAgICAgICBAZ2xvYmFsRGF0YS5wZXJzaXN0ZW50TnVtYmVycyA9IEB2YXJpYWJsZVN0b3JlLnBlcnNpc3RlbnROdW1iZXJzQnlEb21haW5cbiAgICAgICAgQGdsb2JhbERhdGEucGVyc2lzdGVudExpc3RzID0gQHZhcmlhYmxlU3RvcmUucGVyc2lzdGVudExpc3RzQnlEb21haW5cbiAgICAgICAgQGdsb2JhbERhdGEucGVyc2lzdGVudEJvb2xlYW5zID0gQHZhcmlhYmxlU3RvcmUucGVyc2lzdGVudEJvb2xlYW5zQnlEb21haW5cbiAgICAgICAgQGdsb2JhbERhdGEucGVyc2lzdGVudFN0cmluZ3MgPSBAdmFyaWFibGVTdG9yZS5wZXJzaXN0ZW50U3RyaW5nc0J5RG9tYWluXG4gICAgICAgIEdhbWVTdG9yYWdlLnNldE9iamVjdChcImdsb2JhbERhdGFcIiwgQGdsb2JhbERhdGEpXG5cbiAgICAjIyMqXG4gICAgKiBSZXNldHMgY3VycmVudCBnbG9iYWwgZGF0YS4gQWxsIHN0b3JlZCBkYXRhIGFib3V0IHJlYWQgbWVzc2FnZXMsIHBlcnNpc3RlbnQgdmFyaWFibGVzIGFuZFxuICAgICogQ0cgZ2FsbGVyeSB3aWxsIGJlIGRlbGV0ZWQuXG4gICAgKlxuICAgICogQG1ldGhvZCByZXNldEdsb2JhbERhdGFcbiAgICAjIyNcbiAgICByZXNldEdsb2JhbERhdGE6IC0+XG4gICAgICAgIHZlcnNpb24gPSBAZ2xvYmFsRGF0YT8udmVyc2lvblxuICAgICAgICBkYXRhID0gQGdsb2JhbERhdGFcblxuICAgICAgICBAZ2xvYmFsRGF0YSA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2VzOiB7fSwgY2dHYWxsZXJ5OiB7fSwgdmVyc2lvbjogMzQyLFxuICAgICAgICAgICAgcGVyc2lzdGVudE51bWJlcnM6IHsgXCIwXCI6IFtdLCBcImNvbS5kZWdpY2Eudm5tLmRlZmF1bHRcIjogW10gfSxcbiAgICAgICAgICAgIHBlcnNpc3RlbnRTdHJpbmdzOiB7IFwiMFwiOiBbXSwgXCJjb20uZGVnaWNhLnZubS5kZWZhdWx0XCI6IFtdIH0sXG4gICAgICAgICAgICBwZXJzaXN0ZW50Qm9vbGVhbnM6IHsgXCIwXCI6IFtdLCBcImNvbS5kZWdpY2Eudm5tLmRlZmF1bHRcIjogW10gfSxcbiAgICAgICAgICAgIHBlcnNpc3RlbnRMaXN0czogeyBcIjBcIjogW10sIFwiY29tLmRlZ2ljYS52bm0uZGVmYXVsdFwiOiBbXSB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgY2csIGkgaW4gUmVjb3JkTWFuYWdlci5jZ0dhbGxlcnlBcnJheVxuICAgICAgICAgICAgaWYgY2c/XG4gICAgICAgICAgICAgICAgQGdsb2JhbERhdGEuY2dHYWxsZXJ5W2NnLmluZGV4XSA9IHsgdW5sb2NrZWQ6IG5vIH1cblxuICAgICAgICBHYW1lU3RvcmFnZS5zZXRPYmplY3QoXCJnbG9iYWxEYXRhXCIsIEBnbG9iYWxEYXRhKVxuXG4gICAgICAgIEBtaWdyYXRlR2xvYmFsRGF0YShkYXRhLCB2ZXJzaW9uKzEsIEBnbG9iYWxEYXRhLnZlcnNpb24pXG5cbiAgICBtaWdyYXRlR2xvYmFsRGF0YTogKGRhdGEsIGZyb20sIHRvKSAtPlxuICAgICAgICBmb3IgaSBpbiBbZnJvbS4udG9dXG4gICAgICAgICAgICBpZiB0aGlzW1wibWlncmF0ZUdsb2JhbERhdGEje2l9XCJdP1xuICAgICAgICAgICAgICAgIHRoaXNbXCJtaWdyYXRlR2xvYmFsRGF0YSN7aX1cIl0oZGF0YSlcblxuICAgIG1pZ3JhdGVHbG9iYWxEYXRhMzQyOiAoZGF0YSkgLT5cbiAgICAgICAgaWYgZGF0YT9cbiAgICAgICAgICAgIEBnbG9iYWxEYXRhLnBlcnNpc3RlbnROdW1iZXJzWzBdID0gZGF0YS5wZXJzaXN0ZW50TnVtYmVyc1swXSB8fCBbXVxuICAgICAgICAgICAgQGdsb2JhbERhdGEucGVyc2lzdGVudFN0cmluZ3NbMF0gPSBkYXRhLnBlcnNpc3RlbnRTdHJpbmdzWzBdIHx8IFtdXG4gICAgICAgICAgICBAZ2xvYmFsRGF0YS5wZXJzaXN0ZW50Qm9vbGVhbnNbMF0gPSBkYXRhLnBlcnNpc3RlbnRCb29sZWFuc1swXSB8fCBbXVxuICAgICAgICAgICAgQGdsb2JhbERhdGEucGVyc2lzdGVudExpc3RzWzBdID0gZGF0YS5wZXJzaXN0ZW50TGlzdHNbMF0gfHwgW11cbiAgICAgICAgICAgIEBnbG9iYWxEYXRhLnBlcnNpc3RlbnROdW1iZXJzW1wiY29tLmRlZ2ljYS52bm0uZGVmYXVsdFwiXSA9IGRhdGEucGVyc2lzdGVudE51bWJlcnNbMF0gfHwgW11cbiAgICAgICAgICAgIEBnbG9iYWxEYXRhLnBlcnNpc3RlbnRTdHJpbmdzW1wiY29tLmRlZ2ljYS52bm0uZGVmYXVsdFwiXSA9IGRhdGEucGVyc2lzdGVudFN0cmluZ3NbMF0gfHwgW11cbiAgICAgICAgICAgIEBnbG9iYWxEYXRhLnBlcnNpc3RlbnRCb29sZWFuc1tcImNvbS5kZWdpY2Eudm5tLmRlZmF1bHRcIl0gPSBkYXRhLnBlcnNpc3RlbnRCb29sZWFuc1swXSB8fCBbXVxuICAgICAgICAgICAgQGdsb2JhbERhdGEucGVyc2lzdGVudExpc3RzW1wiY29tLmRlZ2ljYS52bm0uZGVmYXVsdFwiXSA9IGRhdGEucGVyc2lzdGVudExpc3RzWzBdIHx8IFtdXG5cbiAgICByZWFkU2F2ZUdhbWU6IChzYXZlR2FtZSkgLT5cbiAgICB3cml0ZVNhdmVHYW1lOiAoc2F2ZUdhbWUpIC0+XG5cbiAgICBwcmVwYXJlU2F2ZUdhbWU6IChzbmFwc2hvdCkgLT5cbiAgICAgICAgaWYgc25hcHNob3RcbiAgICAgICAgICAgIHNuYXBzaG90ID0gUmVzb3VyY2VNYW5hZ2VyLmdldEN1c3RvbUJpdG1hcChcIiRzbmFwc2hvdFwiKVxuICAgICAgICAgICAgc25hcHNob3Q/LmRpc3Bvc2UoKVxuICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLnNldEN1c3RvbUJpdG1hcChcIiRzbmFwc2hvdFwiLCBHcmFwaGljcy5zbmFwc2hvdCgpKVxuXG4gICAgICAgIGNvbnRleHQgPSBuZXcgZ3MuT2JqZWN0Q29kZWNDb250ZXh0KClcbiAgICAgICAgY29udGV4dC5kZWNvZGVkT2JqZWN0U3RvcmUucHVzaChHcmFwaGljcy52aWV3cG9ydClcbiAgICAgICAgY29udGV4dC5kZWNvZGVkT2JqZWN0U3RvcmUucHVzaChAc2NlbmUpXG4gICAgICAgIGNvbnRleHQuZGVjb2RlZE9iamVjdFN0b3JlLnB1c2goQHNjZW5lLmJlaGF2aW9yKVxuXG4gICAgICAgIG1lc3NhZ2VCb3hJZHMgPSBbXCJtZXNzYWdlQm94XCIsIFwibnZsTWVzc2FnZUJveFwiLCBcIm1lc3NhZ2VNZW51XCJdO1xuICAgICAgICBtZXNzYWdlSWRzID0gW1wiZ2FtZU1lc3NhZ2VfbWVzc2FnZVwiLCBcIm52bEdhbWVNZXNzYWdlX21lc3NhZ2VcIl07XG4gICAgICAgIG1lc3NhZ2VCb3hlcyA9IG1lc3NhZ2VCb3hJZHMuc2VsZWN0IChpZCkgPT4gQHNjZW5lLmJlaGF2aW9yLm9iamVjdE1hbmFnZXIub2JqZWN0QnlJZChpZClcbiAgICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlSWRzLnNlbGVjdCAoaWQpID0+IEBzY2VuZS5iZWhhdmlvci5vYmplY3RNYW5hZ2VyLm9iamVjdEJ5SWQoaWQpXG5cbiAgICAgICAgc2NlbmVEYXRhID0ge31cbiAgICAgICAgc2F2ZUdhbWUgPSB7fVxuICAgICAgICBzYXZlR2FtZS5lbmNvZGVkT2JqZWN0U3RvcmUgPSBudWxsXG4gICAgICAgIHNhdmVHYW1lLnNjZW5lVWlkID0gQHNjZW5lLnNjZW5lRG9jdW1lbnQudWlkXG4gICAgICAgIHNhdmVHYW1lLmRhdGEgPSB7XG4gICAgICAgICAgICByZXNvdXJjZUNvbnRleHQ6IEBzY2VuZS5iZWhhdmlvci5yZXNvdXJjZUNvbnRleHQudG9EYXRhQnVuZGxlKCksXG4gICAgICAgICAgICBjdXJyZW50Q2hhcmFjdGVyOiBAc2NlbmUuY3VycmVudENoYXJhY3RlcixcbiAgICAgICAgICAgIGNoYXJhY3RlclBhcmFtczogQGNoYXJhY3RlclBhcmFtcyxcbiAgICAgICAgICAgIGZyYW1lQ291bnQ6IEdyYXBoaWNzLmZyYW1lQ291bnQsXG4gICAgICAgICAgICB0ZW1wRmllbGRzOiBAdGVtcEZpZWxkcyxcbiAgICAgICAgICAgIHZpZXdwb3J0OiBAc2NlbmUudmlld3BvcnQsXG4gICAgICAgICAgICBjaGFyYWN0ZXJzOiBAc2NlbmUuY2hhcmFjdGVycyxcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWVzOiBSZWNvcmRNYW5hZ2VyLmNoYXJhY3RlcnNBcnJheS5zZWxlY3QoKGMpIC0+IHsgbmFtZTogYy5uYW1lLCBpbmRleDogYy5pbmRleCB9KSxcbiAgICAgICAgICAgIGJhY2tncm91bmRzOiBAc2NlbmUuYmFja2dyb3VuZHMsXG4gICAgICAgICAgICBwaWN0dXJlczogQHNjZW5lLnBpY3R1cmVDb250YWluZXIuc3ViT2JqZWN0c0J5RG9tYWluLFxuICAgICAgICAgICAgdGV4dHM6IEBzY2VuZS50ZXh0Q29udGFpbmVyLnN1Yk9iamVjdHNCeURvbWFpbixcbiAgICAgICAgICAgIHZpZGVvczogQHNjZW5lLnZpZGVvQ29udGFpbmVyLnN1Yk9iamVjdHNCeURvbWFpbixcbiAgICAgICAgICAgIHZpZXdwb3J0czogQHNjZW5lLnZpZXdwb3J0Q29udGFpbmVyLnN1Yk9iamVjdHMsXG4gICAgICAgICAgICBjb21tb25FdmVudHM6IEBzY2VuZS5jb21tb25FdmVudENvbnRhaW5lci5zdWJPYmplY3RzLFxuICAgICAgICAgICAgaG90c3BvdHM6IEBzY2VuZS5ob3RzcG90Q29udGFpbmVyLnN1Yk9iamVjdHNCeURvbWFpbixcbiAgICAgICAgICAgIGludGVycHJldGVyOiBAc2NlbmUuaW50ZXJwcmV0ZXIsXG4gICAgICAgICAgICBjaG9pY2VzOiBAc2NlbmUuY2hvaWNlcyxcbiAgICAgICAgICAgIG1lc3NhZ2VCb3hlczogbWVzc2FnZUJveGVzLnNlbGVjdCgobWIsIGkpID0+IHsgdmlzaWJsZTogbWIudmlzaWJsZSwgaWQ6IG1iLmlkLCBtZXNzYWdlOiBtZXNzYWdlc1tpXSB9KSxcbiAgICAgICAgICAgIGJhY2tsb2c6IEBiYWNrbG9nLFxuICAgICAgICAgICAgdmFyaWFibGVTdG9yZTogQHZhcmlhYmxlU3RvcmUsXG4gICAgICAgICAgICBkZWZhdWx0czogQGRlZmF1bHRzLFxuICAgICAgICAgICAgdHJhbnNpdGlvbkRhdGE6IFNjZW5lTWFuYWdlci50cmFuc2l0aW9uRGF0YSxcbiAgICAgICAgICAgIGF1ZGlvOiB7IGF1ZGlvQnVmZmVyczogQXVkaW9NYW5hZ2VyLmF1ZGlvQnVmZmVycywgYXVkaW9CdWZmZXJzQnlMYXllcjogQXVkaW9NYW5hZ2VyLmF1ZGlvQnVmZmVyc0J5TGF5ZXIsIGF1ZGlvTGF5ZXJzOiBBdWRpb01hbmFnZXIuYXVkaW9MYXllcnMsIHNvdW5kUmVmZXJlbmNlczogQXVkaW9NYW5hZ2VyLnNvdW5kUmVmZXJlbmNlcyB9LFxuICAgICAgICAgICAgbWVzc2FnZUFyZWFzOiBAc2NlbmUubWVzc2FnZUFyZWFDb250YWluZXIuc3ViT2JqZWN0c0J5RG9tYWluXG4gICAgICAgIH1cblxuICAgICAgICBzYXZlR2FtZS5kYXRhID0gZ3MuT2JqZWN0Q29kZWMuZW5jb2RlKHNhdmVHYW1lLmRhdGEsIGNvbnRleHQpXG4gICAgICAgIHNhdmVHYW1lLmVuY29kZWRPYmplY3RTdG9yZSA9IGNvbnRleHQuZW5jb2RlZE9iamVjdFN0b3JlXG5cbiAgICAgICAgQHNhdmVHYW1lID0gc2F2ZUdhbWVcblxuICAgIGNyZWF0ZVNhdmVHYW1lU2xvdDogKGhlYWRlcikgLT5cbiAgICAgICAgc2xvdCA9IHtcbiAgICAgICAgICAgIFwiZGF0ZVwiOiBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpLFxuICAgICAgICAgICAgXCJjaGFwdGVyXCI6IEBzY2VuZS5jaGFwdGVyLml0ZW1zLm5hbWUsXG4gICAgICAgICAgICBcInNjZW5lXCI6IEBzY2VuZS5zY2VuZURvY3VtZW50Lml0ZW1zLm5hbWUsXG4gICAgICAgICAgICBcImltYWdlXCI6IGhlYWRlci5pbWFnZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNsb3Q7XG5cbiAgICBjcmVhdGVTYXZlR2FtZUhlYWRlcjogKHRodW1iV2lkdGgsIHRodW1iSGVpZ2h0KSAtPlxuICAgICAgICB0aHVtYkltYWdlID0gQGNyZWF0ZVNhdmVHYW1lVGh1bWJJbWFnZSh0aHVtYldpZHRoLCB0aHVtYkhlaWdodClcblxuICAgICAgICBoZWFkZXIgPSB7XG4gICAgICAgICAgICBcImRhdGVcIjogbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSxcbiAgICAgICAgICAgIFwiY2hhcHRlclVpZFwiOiBAc2NlbmUuY2hhcHRlci51aWQsXG4gICAgICAgICAgICBcInNjZW5lVWlkXCI6IEBzY2VuZS5zY2VuZURvY3VtZW50LnVpZCxcbiAgICAgICAgICAgIFwiaW1hZ2VcIjogdGh1bWJJbWFnZT8uaW1hZ2UudG9EYXRhVVJMKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRodW1iSW1hZ2U/LmRpc3Bvc2UoKVxuXG4gICAgICAgIHJldHVybiBoZWFkZXJcblxuICAgIGNyZWF0ZVNhdmVHYW1lVGh1bWJJbWFnZTogKHdpZHRoLCBoZWlnaHQpIC0+XG4gICAgICAgIHNuYXBzaG90ID0gUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChcIiRzbmFwc2hvdFwiKVxuICAgICAgICB0aHVtYkltYWdlID0gbnVsbFxuXG4gICAgICAgIGlmIHNuYXBzaG90IGFuZCBzbmFwc2hvdC5sb2FkZWRcbiAgICAgICAgICAgIGlmIHdpZHRoIGFuZCBoZWlnaHRcbiAgICAgICAgICAgICAgICB0aHVtYkltYWdlID0gbmV3IEJpdG1hcCh3aWR0aCwgaGVpZ2h0KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRodW1iSW1hZ2UgPSBuZXcgQml0bWFwKEdyYXBoaWNzLndpZHRoIC8gOCwgR3JhcGhpY3MuaGVpZ2h0IC8gOClcbiAgICAgICAgICAgIHRodW1iSW1hZ2Uuc3RyZXRjaEJsdChuZXcgUmVjdCgwLCAwLCB0aHVtYkltYWdlLndpZHRoLCB0aHVtYkltYWdlLmhlaWdodCksIHNuYXBzaG90LCBuZXcgUmVjdCgwLCAwLCBzbmFwc2hvdC53aWR0aCwgc25hcHNob3QuaGVpZ2h0KSlcblxuICAgICAgICByZXR1cm4gdGh1bWJJbWFnZVxuXG4gICAgc3RvcmVTYXZlR2FtZTogKG5hbWUsIHNhdmVHYW1lLCBoZWFkZXIpIC0+XG4gICAgICAgIGlmIGhlYWRlclxuICAgICAgICAgICAgR2FtZVN0b3JhZ2Uuc2V0RGF0YShcIiN7bmFtZX1fSGVhZGVyXCIsIEpTT04uc3RyaW5naWZ5KGhlYWRlcikpXG5cbiAgICAgICAgR2FtZVN0b3JhZ2Uuc2V0RGF0YShuYW1lLCBKU09OLnN0cmluZ2lmeShzYXZlR2FtZSkpXG5cbiAgICAjIyMqXG4gICAgKiBTYXZlcyB0aGUgY3VycmVudCBnYW1lIGF0IHRoZSBzcGVjaWZpZWQgc2xvdC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNhdmVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBzbG90IC0gVGhlIHNsb3Qgd2hlcmUgdGhlIGdhbWUgc2hvdWxkIGJlIHNhdmVkIGF0LlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHRodW1iV2lkdGggLSBUaGUgd2lkdGggZm9yIHRoZSBzbmFwc2hvdC10aHVtYi4gWW91IGNhbiBzcGVjaWZ5IDxiPm51bGw8L2I+IG9yIDAgdG8gdXNlIGFuIGF1dG8gY2FsY3VsYXRlZCB3aWR0aC5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aHVtYkhlaWdodCAtIFRoZSBoZWlnaHQgZm9yIHRoZSBzbmFwc2hvdC10aHVtYi4gWW91IGNhbiBzcGVjaWZ5IDxiPm51bGw8L2I+IG9yIDAgdG8gdXNlIGFuIGF1dG8gY2FsY3VsYXRlZCBoZWlnaHQuXG4gICAgIyMjXG4gICAgc2F2ZTogKHNsb3QsIHRodW1iV2lkdGgsIHRodW1iSGVpZ2h0KSAtPlxuICAgICAgICBpZiBAc2F2ZUdhbWVcbiAgICAgICAgICAgIGhlYWRlciA9IEBjcmVhdGVTYXZlR2FtZUhlYWRlcih0aHVtYldpZHRoLCB0aHVtYkhlaWdodClcbiAgICAgICAgICAgIEBzYXZlR2FtZVNsb3RzW3Nsb3RdID0gQGNyZWF0ZVNhdmVHYW1lU2xvdChoZWFkZXIpXG4gICAgICAgICAgICBAc3RvcmVTYXZlR2FtZShcIlNhdmVHYW1lXyN7c2xvdH1cIiwgQHNhdmVHYW1lLCBoZWFkZXIpXG4gICAgICAgICAgICBAc2NlbmVEYXRhID0ge31cblxuICAgICAgICAgICAgcmV0dXJuIEBzYXZlR2FtZVxuXG4gICAgcmVzdG9yZTogKHNhdmVHYW1lKSAtPlxuICAgICAgICBAYmFja2xvZyA9IHNhdmVHYW1lLmRhdGEuYmFja2xvZ1xuICAgICAgICBAZGVmYXVsdHMgPSBzYXZlR2FtZS5kYXRhLmRlZmF1bHRzXG4gICAgICAgIEB2YXJpYWJsZVN0b3JlLnJlc3RvcmUoc2F2ZUdhbWUuZGF0YS52YXJpYWJsZVN0b3JlKVxuICAgICAgICBAc2NlbmVEYXRhID0gc2F2ZUdhbWUuZGF0YVxuICAgICAgICBAc2F2ZUdhbWUgPSBudWxsXG4gICAgICAgIEBsb2FkZWRTYXZlR2FtZSA9IG51bGxcbiAgICAgICAgQHRlbXBGaWVsZHMgPSBzYXZlR2FtZS5kYXRhLnRlbXBGaWVsZHNcbiAgICAgICAgQGNoYXJhY3RlclBhcmFtcyA9IHNhdmVHYW1lLmRhdGEuY2hhcmFjdGVyUGFyYW1zXG4gICAgICAgIHdpbmRvdy4kdGVtcEZpZWxkcyA9IEB0ZW1wRmllbGRzXG4gICAgICAgIHdpbmRvdy4kZGF0YUZpZWxkcy5iYWNrbG9nID0gQGJhY2tsb2dcblxuXG4gICAgcHJlcGFyZUxvYWRHYW1lOiAtPlxuICAgICAgICBBdWRpb01hbmFnZXIuc3RvcEFsbE11c2ljKDMwKVxuXG4gICAgIyMjKlxuICAgICogTG9hZHMgdGhlIGdhbWUgZnJvbSB0aGUgc3BlY2lmaWVkIHNhdmUgZ2FtZSBzbG90LiBUaGlzIG1ldGhvZCB0cmlnZ2Vyc1xuICAgICogYSBhdXRvbWF0aWMgc2NlbmUgY2hhbmdlLlxuICAgICpcbiAgICAqIEBtZXRob2QgbG9hZFxuICAgICogQHBhcmFtIHtudW1iZXJ9IHNsb3QgLSBUaGUgc2xvdCB3aGVyZSB0aGUgZ2FtZSBzaG91bGQgYmUgbG9hZGVkIGZyb20uXG4gICAgIyMjXG4gICAgbG9hZDogKHNsb3QpIC0+XG4gICAgICAgIHJldHVybiBpZiAhQHNhdmVHYW1lU2xvdHNbc2xvdF0gb3IgQHNhdmVHYW1lU2xvdHNbc2xvdF0uZGF0ZS50cmltKCkubGVuZ3RoID09IDBcblxuICAgICAgICBAcHJlcGFyZUxvYWRHYW1lKClcbiAgICAgICAgQGxvYWRlZFNhdmVHYW1lID0gQGxvYWRTYXZlR2FtZShcIlNhdmVHYW1lXyN7c2xvdH1cIilcblxuXG4gICAgICAgIGdzLkF1ZGlvLnJlc2V0KClcbiAgICAgICAgZ3MuR2xvYmFsRXZlbnRNYW5hZ2VyLmNsZWFyKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLnN3aXRjaFRvKG5ldyB2bi5PYmplY3RfU2NlbmUoKSlcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmNsZWFyKClcblxuXG4gICAgbG9hZFNhdmVHYW1lOiAobmFtZSkgLT4gSlNPTi5wYXJzZShHYW1lU3RvcmFnZS5nZXREYXRhKG5hbWUpKVxuXG5cbiAgICAjIyMqXG4gICAgKiBHZXRzIHRoZSBzYXZlIGdhbWUgZGF0YSBmb3IgYSBzcGVjaWZpZWQgc2xvdC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGdldFNhdmVHYW1lXG4gICAgKiBAcGFyYW0ge251bWJlcn0gc2xvdCAtIFRoZSBzbG90IHRvIGdldCB0aGUgc2F2ZSBkYXRhIGZyb20uXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBzYXZlIGdhbWUgZGF0YS5cbiAgICAjIyNcbiAgICBnZXRTYXZlR2FtZTogKHNsb3QpIC0+IEpTT04ucGFyc2UoR2FtZVN0b3JhZ2UuZ2V0RGF0YShcIlNhdmVHYW1lXyN7c2xvdH1cIikpXG5cbndpbmRvdy5HYW1lTWFuYWdlciA9IG5ldyBHYW1lTWFuYWdlcigpXG5ncy5HYW1lTWFuYWdlciA9IHdpbmRvdy5HYW1lTWFuYWdlciJdfQ==
//# sourceURL=GameManager_22.js