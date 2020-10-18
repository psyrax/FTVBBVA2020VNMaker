var ResourceLoader;

ResourceLoader = (function() {

  /**
  * The resource helps to load a bunch of resources from different kind of
  * data structures.
  *
  * @module gs
  * @class ResourceLoader
  * @memberof gs
  * @constructor
  * @static
   */
  function ResourceLoader() {
    this.loadedScenesByUid = {};
    this.loadedCommonEventsById = [];
  }


  /**
  * Loads all graphics for the specified list of custom layout types/templates
  *
  * @method loadUiTypesGraphics
  * @param {Object[]} types - An array of custom layout types/templates
  * @static
   */

  ResourceLoader.prototype.loadUiTypesGraphics = function(types) {
    var k;
    for (k in types) {
      this.loadUiLayoutGraphics(types[k]);
    }
    return null;
  };


  /**
  * Loads all graphics for the specified layout-descriptor.
  *
  * @method loadUiGraphicsFromObject
  * @param {Object} layout - The layout descriptor.
  * @static
   */

  ResourceLoader.prototype.loadUiGraphicsFromObject = function(layout) {
    var k;
    for (k in layout) {
      if (k === "image" || k === "fullImage") {
        ResourceManager.getBitmap("Graphics/Pictures/" + layout[k]);
      } else if (k === "video") {
        ResourceManager.getVideo("Movies/" + layout[k]);
      }
    }
    return null;
  };


  /**
  * Loads all graphics for the specified layout-descriptor.
  *
  * @method loadUiDataFieldsGraphics
  * @param {Object} layout - The layout descriptor.
  * @static
   */

  ResourceLoader.prototype.loadUiDataFieldsGraphics = function(layout) {
    var image, j, k, l, len, o, ref;
    for (k in layout) {
      if (layout[k] instanceof Array) {
        ref = layout[k];
        for (l = 0, len = ref.length; l < len; l++) {
          o = ref[l];
          for (j in o) {
            if (j === "image" || j === "fullImage") {
              image = o[j];
              if (!image) {
                continue;
              }
              if (image.startsWith("data:")) {
                ResourceManager.getBitmap(o[j]);
              } else {
                ResourceManager.getBitmap("Graphics/Pictures/" + o[j]);
              }
            }
          }
        }
      }
    }
    return null;
  };


  /**
  * Loads all graphics for the specified layout-descriptor.
  *
  * @method loadUiDataFieldsGraphics
  * @param {Object} layout - The layout descriptor.
  * @static
   */

  ResourceLoader.prototype.loadUiLayoutGraphics = function(layout) {
    var action, actions, animation, control, descriptor, graphic, image, imageFolder, l, len, len1, len10, len11, len2, len3, len4, len5, len6, len7, len8, len9, m, music, musicFile, n, object, p, q, r, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, s, sel, sound, soundFile, style, sub, t, u, v, video, w, x;
    if (layout.preload != null) {
      if (layout.preload.graphics != null) {
        ref = layout.preload.graphics;
        for (l = 0, len = ref.length; l < len; l++) {
          graphic = ref[l];
          if (graphic.name != null) {
            ResourceManager.getBitmap((ui.Component_FormulaHandler.fieldValue(null, graphic.folder) || 'Graphics/Pictures') + "/" + (ui.Component_FormulaHandler.fieldValue(null, graphic.name)));
          } else {
            object = ui.Component_FormulaHandler.fieldValue(null, graphic.path);
            for (m = 0, len1 = object.length; m < len1; m++) {
              sub = object[m];
              if (sub != null) {
                image = ui.Component_FormulaHandler.fieldValue(sub, graphic.image);
                if ((image != null ? image.name : void 0) != null) {
                  ResourceManager.getBitmap(ResourceManager.getPath(image));
                } else if (image != null) {
                  ResourceManager.getBitmap("Graphics/Pictures/" + image);
                }
              }
            }
          }
        }
      }
      if (layout.preload.videos != null) {
        ref1 = layout.preload.videos;
        for (n = 0, len2 = ref1.length; n < len2; n++) {
          video = ref1[n];
          if (video.name != null) {
            ResourceManager.getVideo((video.folder || 'Movies') + "/" + video.name);
          }
        }
      }
      if (layout.preload.music != null) {
        ref2 = layout.preload.music;
        for (p = 0, len3 = ref2.length; p < len3; p++) {
          music = ref2[p];
          if (music != null) {
            musicFile = ui.Component_FormulaHandler.fieldValue(layout, music.name || music);
            if (typeof musicFile === "object") {
              musicFile = musicFile.name;
            }
            if (musicFile) {
              ResourceManager.getAudioBuffer((music.folder || 'Audio/Music') + "/" + musicFile);
            }
          }
        }
      }
      if (layout.preload.sounds != null) {
        ref3 = layout.preload.sounds;
        for (q = 0, len4 = ref3.length; q < len4; q++) {
          sound = ref3[q];
          if (sound != null) {
            soundFile = ui.Component_FormulaHandler.fieldValue(layout, sound.name || sound);
            if (typeof soundFile === "object") {
              soundFile = soundFile.name;
            }
            if (soundFile) {
              ResourceManager.getAudioBuffer((sound.folder || 'Audio/Sounds') + "/" + soundFile);
            }
          }
        }
      }
    }
    if (layout.images != null) {
      ref4 = layout.images;
      for (r = 0, len5 = ref4.length; r < len5; r++) {
        image = ref4[r];
        image = ui.Component_FormulaHandler.fieldValue(layout, image);
        if (image != null ? image.name : void 0) {
          ResourceManager.getBitmap(ResourceManager.getPath(image));
        } else {
          ResourceManager.getBitmap("Graphics/Pictures/" + image);
        }
      }
    }
    if (layout.animations != null) {
      ref5 = layout.animations;
      for (s = 0, len6 = ref5.length; s < len6; s++) {
        descriptor = ref5[s];
        ref6 = descriptor.flow;
        for (t = 0, len7 = ref6.length; t < len7; t++) {
          animation = ref6[t];
          switch (animation.type) {
            case "sound":
              ResourceManager.getAudioBuffer(ResourceManager.getPath(animation.sound));
              break;
            case "changeImages":
              ref7 = animation.images;
              for (u = 0, len8 = ref7.length; u < len8; u++) {
                image = ref7[u];
                ResourceManager.getBitmap("Graphics/Pictures/" + image);
              }
              break;
            case "maskTo":
              ResourceManager.getBitmap(ResourceManager.getPath(animation.mask));
          }
          if (animation.sound != null) {
            ResourceManager.getAudioBuffer(ResourceManager.getPath(animation.sound));
          }
        }
      }
    }
    if (layout.image != null) {
      image = ui.Component_FormulaHandler.fieldValue(layout, layout.image);
      if (image != null ? image.name : void 0) {
        ResourceManager.getBitmap(ResourceManager.getPath(image));
      } else if (layout.imageFolder != null) {
        imageFolder = ui.Component_FormulaHandler.fieldValue(layout, layout.imageFolder);
        ResourceManager.getBitmap(imageFolder + "/" + image);
      } else {
        ResourceManager.getBitmap("Graphics/Pictures/" + image);
      }
    }
    if (layout.video != null) {
      ResourceManager.getVideo("Movies/" + layout.video);
    }
    if (layout.customFields != null) {
      this.loadUiGraphicsFromObject(layout.customFields);
    }
    if (((ref8 = layout.customFields) != null ? ref8.actions : void 0) != null) {
      ref9 = layout.customFields.actions;
      for (v = 0, len9 = ref9.length; v < len9; v++) {
        action = ref9[v];
        if (action.name === "playVoice" || action.name === "playSound") {
          AudioManager.loadSound(action.params.name);
        }
      }
    }
    if ((layout.actions != null) || (layout.action != null)) {
      actions = layout.action != null ? [layout.action] : layout.actions;
      for (w = 0, len10 = actions.length; w < len10; w++) {
        action = actions[w];
        if (action.name === "playVoice" || action.name === "playSound") {
          AudioManager.loadSound(action.params.name);
        }
      }
    }
    if (layout.params) {
      this.loadUiLayoutGraphics(layout.params);
    }
    if (layout.template != null) {
      this.loadUiLayoutGraphics(layout.template);
    }
    if ((layout.style != null) && (ui.UiFactory.styles[layout.style] != null)) {
      this.loadUiLayoutGraphics(ui.UiFactory.styles[layout.style]);
      for (sel in ui.UIManager.selectors) {
        style = ui.UIManager.styles[layout.style + ":" + sel];
        if (style) {
          this.loadUiLayoutGraphics(style);
        }
      }
    }
    if (ui.UiFactory.customTypes[layout.type] != null) {
      this.loadUiLayoutGraphics(ui.UiFactory.customTypes[layout.type]);
    }
    if (layout.controls != null) {
      ref10 = layout.controls;
      results = [];
      for (x = 0, len11 = ref10.length; x < len11; x++) {
        control = ref10[x];
        results.push(this.loadUiLayoutGraphics(control));
      }
      return results;
    }
  };


  /**
  * Loads all system sounds.
  *
  * @method loadSystemSounds
  * @static
   */

  ResourceLoader.prototype.loadSystemSounds = function() {
    var l, len, ref, results, sound;
    ref = RecordManager.system.sounds;
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      sound = ref[l];
      results.push(AudioManager.loadSound(sound));
    }
    return results;
  };


  /**
  * Loads all system graphics.
  *
  * @method loadSystemGraphics
  * @static
   */

  ResourceLoader.prototype.loadSystemGraphics = function() {
    var l, len, ref, ref1, ref2, ref3, ref4, slot;
    ref = GameManager.saveGameSlots;
    for (l = 0, len = ref.length; l < len; l++) {
      slot = ref[l];
      if ((slot.thumb != null) && slot.thumb.length > 0) {
        ResourceManager.getBitmap(slot.thumb);
      }
    }
    if ((ref1 = RecordManager.system.cursor) != null ? ref1.name : void 0) {
      ResourceManager.getBitmap(ResourceManager.getPath(RecordManager.system.cursor));
    }
    if ((ref2 = RecordManager.system.titleScreen) != null ? ref2.name : void 0) {
      ResourceManager.getBitmap(ResourceManager.getPath(RecordManager.system.titleScreen));
    }
    if ((ref3 = RecordManager.system.languageScreen) != null ? ref3.name : void 0) {
      ResourceManager.getBitmap(ResourceManager.getPath(RecordManager.system.languageScreen));
    }
    if ((ref4 = RecordManager.system.menuBackground) != null ? ref4.name : void 0) {
      ResourceManager.getBitmap(ResourceManager.getPath(RecordManager.system.menuBackground));
    }
    return null;
  };


  /**
  * Loads all resources needed by the specified list of commands.
  *
  * @method loadEventCommandsGraphics
  * @param {Object[]} commands - The list of commands.
  * @return {boolean} Indicates if data needs to be loaded.
  * @static
   */

  ResourceLoader.prototype.loadEventCommandsData = function(commands) {
    this.loadedScenesByUid = {};
    return this._loadEventCommandsData(commands);
  };

  ResourceLoader.prototype._loadEventCommandsData = function(commands) {
    var command, l, len, result, sceneDocument;
    if (commands == null) {
      return false;
    }
    result = false;
    for (l = 0, len = commands.length; l < len; l++) {
      command = commands[l];
      switch (command.id) {
        case "vn.Choice":
          if (command.params.action.scene) {
            sceneDocument = DataManager.getDocument(command.params.action.scene.uid);
            if (sceneDocument) {
              if (!result) {
                result = !sceneDocument.loaded;
              }
              if (sceneDocument.loaded && !this.loadedScenesByUid[sceneDocument.uid]) {
                this.loadedScenesByUid[sceneDocument.uid] = true;
                if (!result) {
                  result = this._loadEventCommandsData(sceneDocument.items.commands);
                }
              }
            }
          }
          break;
        case "vn.CallScene":
          if (command.params.scene) {
            sceneDocument = DataManager.getDocument(command.params.scene.uid);
            if (sceneDocument) {
              if (!result) {
                result = !sceneDocument.loaded;
              }
              if (sceneDocument.loaded && !this.loadedScenesByUid[sceneDocument.uid]) {
                this.loadedScenesByUid[sceneDocument.uid] = true;
                if (!result) {
                  result = this._loadEventCommandsData(sceneDocument.items.commands);
                }
              }
            }
          }
      }
    }
    return result;
  };


  /**
  * Preloads all resources needed by the specified common event.
  *
  * @method loadCommonEventResources
  * @param {string} eventId - ID of the common event to preload the resources for.
  * @static
   */

  ResourceLoader.prototype.loadCommonEventResources = function(eventId) {
    var commonEvent;
    commonEvent = RecordManager.commonEvents[eventId];
    if ((commonEvent != null) && !this.loadedCommonEventsById[eventId]) {
      this.loadedCommonEventsById[eventId] = true;
      return this._loadEventCommandsGraphics(commonEvent.commands);
    }
  };


  /**
  * Loads all resources needed by the specified list of commands.
  *
  * @method loadEventCommandsGraphics
  * @param {Object[]} commands - The list of commands.
  * @static
   */

  ResourceLoader.prototype.loadEventCommandsGraphics = function(commands) {
    this.loadedScenesByUid = {};
    this.loadedCommonEventsById = [];
    return this._loadEventCommandsGraphics(commands);
  };

  ResourceLoader.prototype._loadEventCommandsGraphics = function(commands) {
    var actor, actorId, animation, animationId, character, command, commonEvent, effect, eid, enemy, expression, expressionId, hotspot, i, i1, image, j1, l, len, len1, len10, len11, len12, len13, len14, len15, len2, len3, len4, len5, len6, len7, len8, len9, m, moveCommand, n, p, param, q, r, record, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref26, ref27, ref28, ref29, ref3, ref30, ref31, ref32, ref33, ref34, ref35, ref36, ref37, ref38, ref39, ref4, ref40, ref41, ref42, ref5, ref6, ref7, ref8, ref9, s, sceneDocument, sound, t, u, v, w, x, y, z;
    if (commands == null) {
      return;
    }
    for (l = 0, len = commands.length; l < len; l++) {
      command = commands[l];
      switch (command.id) {
        case "gs.StartTimer":
          if (command.params.action.type === 1) {
            this.loadCommonEventResources(command.params.action.data.commonEventId);
          }
          break;
        case "gs.CallCommonEvent":
          commonEvent = RecordManager.commonEvents[command.params.commonEventId];
          if (commonEvent != null) {
            ref = commonEvent.parameters;
            for (i = m = 0, len1 = ref.length; m < len1; i = ++m) {
              param = ref[i];
              if (param.stringValueType === "sceneId" && ((ref1 = command.params.parameters) != null ? ref1.values[i] : void 0)) {
                sceneDocument = DataManager.getDocument(command.params.parameters.values[i]);
                if (sceneDocument && !this.loadedScenesByUid[sceneDocument.uid]) {
                  this.loadedScenesByUid[sceneDocument.uid] = true;
                  this._loadEventCommandsGraphics(sceneDocument.items.commands);
                }
              }
            }
            if (!this.loadedCommonEventsById[command.params.commonEventId]) {
              this.loadedCommonEventsById[command.params.commonEventId] = true;
              this._loadEventCommandsGraphics(commonEvent.commands);
            }
          }
          break;
        case "vn.CallScene":
          sceneDocument = DataManager.getDocument(command.params.scene.uid);
          if (sceneDocument && !this.loadedScenesByUid[sceneDocument.uid]) {
            this.loadedScenesByUid[sceneDocument.uid] = true;
            this._loadEventCommandsGraphics(sceneDocument.items.commands);
          }
          break;
        case "gs.ChangeTransition":
          ResourceManager.getBitmap(ResourceManager.getPath(command.params.graphic));
          break;
        case "gs.ScreenTransition":
          ResourceManager.getBitmap(ResourceManager.getPath(command.params.graphic));
          break;
        case "vn.ChangeBackground":
          if (command.params.graphic != null) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.graphic));
          }
          if (((ref2 = command.params.animation) != null ? ref2.type : void 0) === gs.AnimationTypes.MASKING && ((ref3 = command.params.animation.mask) != null ? ref3.graphic : void 0)) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.animation.mask.graphic));
          }
          break;
        case "vn.L2DJoinScene":
          if (command.params.model != null) {
            ResourceManager.getLive2DModel(ResourceManager.getPath(command.params.model));
          }
          break;
        case "vn.CharacterJoinScene":
          character = RecordManager.characters[command.params.characterId];
          if (character != null) {
            expressionId = (ref4 = command.params.expressionId) != null ? ref4 : character.defaultExpressionId;
            if (expressionId != null) {
              record = RecordManager.characterExpressions[expressionId];
              if (record != null) {
                if (record.idle) {
                  ref5 = record.idle;
                  for (n = 0, len2 = ref5.length; n < len2; n++) {
                    image = ref5[n];
                    ResourceManager.getBitmap(ResourceManager.getPath(image.resource));
                  }
                }
                if (record.talking) {
                  ref6 = record.talking;
                  for (p = 0, len3 = ref6.length; p < len3; p++) {
                    image = ref6[p];
                    ResourceManager.getBitmap(ResourceManager.getPath(image.resource));
                  }
                }
              }
            }
          }
          if (command.params.animation.type === gs.AnimationTypes.MASKING && (command.params.animation.mask.graphic != null)) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.animation.mask.graphic));
          }
          break;
        case "vn.CharacterChangeExpression":
          record = RecordManager.characterExpressions[command.params.expressionId];
          if (record != null) {
            ref7 = record.idle;
            for (q = 0, len4 = ref7.length; q < len4; q++) {
              image = ref7[q];
              ResourceManager.getBitmap(ResourceManager.getPath(image.resource));
            }
            ref8 = record.talking;
            for (r = 0, len5 = ref8.length; r < len5; r++) {
              image = ref8[r];
              ResourceManager.getBitmap(ResourceManager.getPath(image.resource));
            }
          }
          if (command.params.animation.type === gs.AnimationTypes.MASKING && (command.params.animation.mask.graphic != null)) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.animation.mask.graphic));
          }
          break;
        case "gs.ShowPartialMessage":
          if (command.params.voice != null) {
            AudioManager.loadSound(command.params.voice);
          }
          break;
        case "vn.Choice":
          if (command.params.action.scene) {
            sceneDocument = DataManager.getDocument(command.params.action.scene.uid);
            if (sceneDocument && !this.loadedScenesByUid[sceneDocument.uid]) {
              this.loadedScenesByUid[sceneDocument.uid] = true;
              this._loadEventCommandsGraphics(sceneDocument.items.commands);
            }
          }
          if (command.params.action.commonEventId) {
            this.loadCommonEventResources(command.params.action.commonEventId);
          }
          break;
        case "gs.ShowMessage":
        case "gs.ShowMessageNVL":
        case "gs.ShowText":
          if (command.params.animations != null) {
            ref9 = command.params.animations;
            for (s = 0, len6 = ref9.length; s < len6; s++) {
              eid = ref9[s];
              animation = RecordManager.animations[eid];
              if ((animation != null) && animation.graphic.name) {
                ResourceManager.getBitmap(ResourceManager.getPath(animation.graphic));
              }
            }
          }
          if (command.params.expressions != null) {
            ref10 = command.params.expressions;
            for (t = 0, len7 = ref10.length; t < len7; t++) {
              eid = ref10[t];
              expression = RecordManager.characterExpressions[eid];
              if (expression != null) {
                if (expression.idle) {
                  ref11 = expression.idle;
                  for (u = 0, len8 = ref11.length; u < len8; u++) {
                    image = ref11[u];
                    ResourceManager.getBitmap(ResourceManager.getPath(image.resource));
                  }
                }
                if (expression.talking) {
                  ref12 = expression.talking;
                  for (v = 0, len9 = ref12.length; v < len9; v++) {
                    image = ref12[v];
                    ResourceManager.getBitmap(ResourceManager.getPath(image.resource));
                  }
                }
              }
            }
          }
          if (command.params.voice != null) {
            AudioManager.loadSound(command.params.voice);
          }
          record = RecordManager.characterExpressions[command.params.expressionId];
          if (record != null) {
            if (record.idle) {
              ref13 = record.idle;
              for (w = 0, len10 = ref13.length; w < len10; w++) {
                image = ref13[w];
                ResourceManager.getBitmap(ResourceManager.getPath(image.resource));
              }
            }
            if (record.talking) {
              ref14 = record.talking;
              for (x = 0, len11 = ref14.length; x < len11; x++) {
                image = ref14[x];
                ResourceManager.getBitmap(ResourceManager.getPath(image.resource));
              }
            }
          }
          break;
        case "gs.AddHotspot":
          if ((ref15 = command.params.baseGraphic) != null ? ref15.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.baseGraphic));
          }
          if ((ref16 = command.params.hoverGraphic) != null ? ref16.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.hoverGraphic));
          }
          if ((ref17 = command.params.selectedGraphic) != null ? ref17.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.selectedGraphic));
          }
          if ((ref18 = command.params.selectedHoverGraphic) != null ? ref18.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.selectedHoverGraphic));
          }
          if ((ref19 = command.params.unselectedGraphic) != null ? ref19.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.unselectedGraphic));
          }
          if (command.params.actions != null) {
            if (command.params.actions.onClick.type === 1) {
              this.loadCommonEventResources(command.params.actions.onClick.commonEventId);
            }
            if (command.params.actions.onEnter.type === 1) {
              this.loadCommonEventResources(command.params.actions.onEnter.commonEventId);
            }
            if (command.params.actions.onLeave.type === 1) {
              this.loadCommonEventResources(command.params.actions.onLeave.commonEventId);
            }
            if (command.params.actions.onSelect.type === 1) {
              this.loadCommonEventResources(command.params.actions.onSelect.commonEventId);
            }
            if (command.params.actions.onDeselect.type === 1) {
              this.loadCommonEventResources(command.params.actions.onDeselect.commonEventId);
            }
            if (command.params.actions.onDrag.type === 1) {
              this.loadCommonEventResources(command.params.actions.onDrag.commonEventId);
            }
            if (command.params.actions.onDrop.type === 1) {
              this.loadCommonEventResources(command.params.actions.onDrop.commonEventId);
            }
            if (command.params.actions.onDropReceive.type === 1) {
              this.loadCommonEventResources(command.params.actions.onDropReceive.commonEventId);
            }
          }
          break;
        case "gs.ShowPicture":
          if ((ref20 = command.params.graphic) != null ? ref20.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.graphic));
          }
          if (((ref21 = command.params.animation) != null ? ref21.type : void 0) === gs.AnimationTypes.MASKING) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.animation.mask.graphic));
          }
          break;
        case "gs.ShowImageMap":
          if ((ref22 = command.params.ground) != null ? ref22.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.ground));
          }
          if ((ref23 = command.params.hover) != null ? ref23.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.hover));
          }
          if ((ref24 = command.params.unselected) != null ? ref24.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.unselected));
          }
          if ((ref25 = command.params.selected) != null ? ref25.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.selected));
          }
          if ((ref26 = command.params.selectedHover) != null ? ref26.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.selectedHover));
          }
          ref27 = command.params.hotspots;
          for (y = 0, len12 = ref27.length; y < len12; y++) {
            hotspot = ref27[y];
            AudioManager.loadSound(hotspot.data.onHoverSound);
            AudioManager.loadSound(hotspot.data.onClickSound);
            if (hotspot.data.action === 2) {
              commonEvent = RecordManager.commonEvents[hotspot.data.commonEventId];
              if ((commonEvent != null) && !this.loadedCommonEventsById[hotspot.data.commonEventId]) {
                this.loadedCommonEventsById[hotspot.data.commonEventId] = true;
                this._loadEventCommandsGraphics(commonEvent.commands);
              }
            }
          }
          break;
        case "gs.MovePicturePath":
        case "vn.MoveCharacterPath":
        case "vn.ScrollBackgroundPath":
        case "gs.MoveVideoPath":
          if (command.params.path.effects != null) {
            ref28 = command.params.path.effects.data;
            for (z = 0, len13 = ref28.length; z < len13; z++) {
              effect = ref28[z];
              AudioManager.loadSound(effect.sound);
            }
          }
          break;
        case "gs.MaskPicture":
        case "vn.MaskCharacter":
        case "vn.MaskBackground":
        case "gs.MaskVideo":
          if (command.params.mask.sourceType === 0 && ((ref29 = command.params.mask.graphic) != null ? ref29.name : void 0)) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.mask.graphic));
          }
          if (command.params.mask.sourceType === 1 && ((ref30 = command.params.mask.video) != null ? ref30.name : void 0)) {
            ResourceManager.getVideo(ResourceManager.getPath(command.params.mask.video));
          }
          break;
        case "gs.PlayPictureAnimation":
          animationId = command.params.animationId;
          if ((animationId != null) && (animationId.scope == null)) {
            animation = RecordManager.animations[animationId];
            if (animation && ((ref31 = animation.graphic) != null ? ref31.name : void 0)) {
              ResourceManager.getBitmap(ResourceManager.getPath(animation.graphic));
            }
          }
          break;
        case "gs.ShowBattleAnimation":
          animationId = command.params.animationId;
          if ((animationId != null) && (animationId.scope == null)) {
            animation = RecordManager.animations[animationId];
            this.loadComplexAnimation(animation);
          }
          break;
        case "gs.InputName":
          actorId = command.params.actorId;
          if ((actorId != null) && (actorId.scope == null)) {
            actor = RecordManager.actors[actorId];
            if (actor != null) {
              ResourceManager.getBitmap("Graphics/Faces/" + ((ref32 = actor.faceGraphic) != null ? ref32.name : void 0));
            }
          }
          break;
        case "gs.ChangeTileset":
          if ((ref33 = command.params.graphic) != null ? ref33.name : void 0) {
            ResourceManager.getBitmap("Graphics/Tilesets/" + command.params.graphic.name);
          }
          break;
        case "gs.ChangeMapParallaxBackground":
          if ((ref34 = command.params.parallaxBackground) != null ? ref34.name : void 0) {
            ResourceManager.getBitmap("Graphics/Pictures/" + command.params.parallaxBackground.name);
          }
          break;
        case "gs.ChangeActorGraphic":
          if (command.params.changeCharacter && ((ref35 = command.params.characterGraphic) != null ? ref35.name : void 0)) {
            ResourceManager.getBitmap("Graphics/Characters/" + command.params.characterGraphic.name);
          }
          if (command.params.changeFace && ((ref36 = command.params.faceGraphic) != null ? ref36.name : void 0)) {
            ResourceManager.getBitmap("Graphics/Faces/" + command.params.faceGraphic.name);
          }
          break;
        case "gs.MoveEvent":
          ref37 = command.params.commands;
          for (i1 = 0, len14 = ref37.length; i1 < len14; i1++) {
            moveCommand = ref37[i1];
            switch (moveCommand.id) {
              case 44:
                ResourceManager.getBitmap("Graphics/Characters/" + moveCommand.resource.name);
                break;
              case 47:
                AudioManager.loadSound(moveCommand.resource);
            }
          }
          break;
        case "gs.TransformEnemy":
          if (((ref38 = command.params) != null ? ref38.targetId.scope : void 0) == null) {
            enemy = RecordManager.enemies[command.params.targetId];
            this.loadActorBattleAnimations(enemy);
          }
          break;
        case "gs.PlayMusic":
          if (command.params.music != null) {
            AudioManager.loadMusic(command.params.music);
          }
          break;
        case "gs.PlayVideo":
        case "gs.ShowVideo":
          if ((ref39 = command.params.video) != null ? ref39.name : void 0) {
            ResourceManager.getVideo(ResourceManager.getPath(command.params.video));
          }
          if (((ref40 = command.params.animation) != null ? ref40.type : void 0) === gs.AnimationTypes.MASKING) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.animation.mask.graphic));
          }
          break;
        case "gs.PlaySound":
          if (command.params.sound != null) {
            AudioManager.loadSound(command.params.sound);
          }
          break;
        case "vn.ChangeSounds":
          ref41 = command.params.sounds;
          for (j1 = 0, len15 = ref41.length; j1 < len15; j1++) {
            sound = ref41[j1];
            if (sound != null) {
              AudioManager.loadSound(sound);
            }
          }
          break;
        case "gs.ChangeScreenCursor":
          if ((ref42 = command.params.graphic) != null ? ref42.name : void 0) {
            ResourceManager.getBitmap(ResourceManager.getPath(command.params.graphic));
          }
      }
    }
    return null;
  };


  /**
  * Loads all resources for the specified animation.
  *
  * @method loadAnimation
  * @param {Object} animation - The animation-record.
  * @static
   */

  ResourceLoader.prototype.loadAnimation = function(animation) {
    if ((animation != null) && (animation.graphic != null)) {
      return ResourceManager.getBitmap("Graphics/SimpleAnimations/" + animation.graphic.name);
    }
  };

  return ResourceLoader;

})();

gs.ResourceLoader = new ResourceLoader();

window.ResourceLoader = gs.ResourceLoader;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUE7O0FBQU07O0FBQ0Y7Ozs7Ozs7Ozs7RUFVYSx3QkFBQTtJQUNULElBQUMsQ0FBQSxpQkFBRCxHQUFxQjtJQUNyQixJQUFDLENBQUEsc0JBQUQsR0FBMEI7RUFGakI7OztBQUliOzs7Ozs7OzsyQkFPQSxtQkFBQSxHQUFxQixTQUFDLEtBQUQ7QUFDakIsUUFBQTtBQUFBLFNBQUEsVUFBQTtNQUNJLElBQUMsQ0FBQSxvQkFBRCxDQUFzQixLQUFNLENBQUEsQ0FBQSxDQUE1QjtBQURKO0FBR0EsV0FBTztFQUpVOzs7QUFNckI7Ozs7Ozs7OzJCQU9BLHdCQUFBLEdBQTBCLFNBQUMsTUFBRDtBQUN0QixRQUFBO0FBQUEsU0FBQSxXQUFBO01BQ0ksSUFBRyxDQUFBLEtBQUssT0FBTCxJQUFnQixDQUFBLEtBQUssV0FBeEI7UUFDSSxlQUFlLENBQUMsU0FBaEIsQ0FBMEIsb0JBQUEsR0FBcUIsTUFBTyxDQUFBLENBQUEsQ0FBdEQsRUFESjtPQUFBLE1BRUssSUFBRyxDQUFBLEtBQUssT0FBUjtRQUNELGVBQWUsQ0FBQyxRQUFoQixDQUF5QixTQUFBLEdBQVUsTUFBTyxDQUFBLENBQUEsQ0FBMUMsRUFEQzs7QUFIVDtBQUtBLFdBQU87RUFOZTs7O0FBUTFCOzs7Ozs7OzsyQkFPQSx3QkFBQSxHQUEwQixTQUFDLE1BQUQ7QUFDdEIsUUFBQTtBQUFBLFNBQUEsV0FBQTtNQUNJLElBQUcsTUFBTyxDQUFBLENBQUEsQ0FBUCxZQUFxQixLQUF4QjtBQUNJO0FBQUEsYUFBQSxxQ0FBQTs7QUFDSSxlQUFBLE1BQUE7WUFDSSxJQUFHLENBQUEsS0FBSyxPQUFMLElBQWdCLENBQUEsS0FBSyxXQUF4QjtjQUNJLEtBQUEsR0FBUSxDQUFFLENBQUEsQ0FBQTtjQUVWLElBQUcsQ0FBSSxLQUFQO0FBQ0kseUJBREo7O2NBR0EsSUFBRyxLQUFLLENBQUMsVUFBTixDQUFpQixP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OztBQWxPUjtBQURKO0FBcU9BLFdBQU87RUF4T2lCOzs7QUEwTzVCOzs7Ozs7OzsyQkFPQSxhQUFBLEdBQWUsU0FBQyxTQUFEO0lBQ1gsSUFBRyxtQkFBQSxJQUFlLDJCQUFsQjthQUNJLGVBQWUsQ0FBQyxTQUFoQixDQUEwQiw0QkFBQSxHQUE2QixTQUFTLENBQUMsT0FBTyxDQUFDLElBQXpFLEVBREo7O0VBRFc7Ozs7OztBQU1uQixFQUFFLENBQUMsY0FBSCxHQUF3QixJQUFBLGNBQUEsQ0FBQTs7QUFDeEIsTUFBTSxDQUFDLGNBQVAsR0FBd0IsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jXG4jICAgU2NyaXB0OiBSZXNvdXJjZUxvYWRlclxuI1xuIyAgICQkQ09QWVJJR0hUJCRcbiNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuY2xhc3MgUmVzb3VyY2VMb2FkZXJcbiAgICAjIyMqXG4gICAgKiBUaGUgcmVzb3VyY2UgaGVscHMgdG8gbG9hZCBhIGJ1bmNoIG9mIHJlc291cmNlcyBmcm9tIGRpZmZlcmVudCBraW5kIG9mXG4gICAgKiBkYXRhIHN0cnVjdHVyZXMuXG4gICAgKlxuICAgICogQG1vZHVsZSBnc1xuICAgICogQGNsYXNzIFJlc291cmNlTG9hZGVyXG4gICAgKiBAbWVtYmVyb2YgZ3NcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICogQHN0YXRpY1xuICAgICMjI1xuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbG9hZGVkU2NlbmVzQnlVaWQgPSB7fVxuICAgICAgICBAbG9hZGVkQ29tbW9uRXZlbnRzQnlJZCA9IFtdXG5cbiAgICAjIyMqXG4gICAgKiBMb2FkcyBhbGwgZ3JhcGhpY3MgZm9yIHRoZSBzcGVjaWZpZWQgbGlzdCBvZiBjdXN0b20gbGF5b3V0IHR5cGVzL3RlbXBsYXRlc1xuICAgICpcbiAgICAqIEBtZXRob2QgbG9hZFVpVHlwZXNHcmFwaGljc1xuICAgICogQHBhcmFtIHtPYmplY3RbXX0gdHlwZXMgLSBBbiBhcnJheSBvZiBjdXN0b20gbGF5b3V0IHR5cGVzL3RlbXBsYXRlc1xuICAgICogQHN0YXRpY1xuICAgICMjI1xuICAgIGxvYWRVaVR5cGVzR3JhcGhpY3M6ICh0eXBlcykgLT5cbiAgICAgICAgZm9yIGsgb2YgdHlwZXNcbiAgICAgICAgICAgIEBsb2FkVWlMYXlvdXRHcmFwaGljcyh0eXBlc1trXSlcblxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgIyMjKlxuICAgICogTG9hZHMgYWxsIGdyYXBoaWNzIGZvciB0aGUgc3BlY2lmaWVkIGxheW91dC1kZXNjcmlwdG9yLlxuICAgICpcbiAgICAqIEBtZXRob2QgbG9hZFVpR3JhcGhpY3NGcm9tT2JqZWN0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gbGF5b3V0IC0gVGhlIGxheW91dCBkZXNjcmlwdG9yLlxuICAgICogQHN0YXRpY1xuICAgICMjI1xuICAgIGxvYWRVaUdyYXBoaWNzRnJvbU9iamVjdDogKGxheW91dCkgLT5cbiAgICAgICAgZm9yIGsgb2YgbGF5b3V0XG4gICAgICAgICAgICBpZiBrID09IFwiaW1hZ2VcIiBvciBrID09IFwiZnVsbEltYWdlXCJcbiAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFwiR3JhcGhpY3MvUGljdHVyZXMvI3tsYXlvdXRba119XCIpXG4gICAgICAgICAgICBlbHNlIGlmIGsgPT0gXCJ2aWRlb1wiXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldFZpZGVvKFwiTW92aWVzLyN7bGF5b3V0W2tdfVwiKVxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgIyMjKlxuICAgICogTG9hZHMgYWxsIGdyYXBoaWNzIGZvciB0aGUgc3BlY2lmaWVkIGxheW91dC1kZXNjcmlwdG9yLlxuICAgICpcbiAgICAqIEBtZXRob2QgbG9hZFVpRGF0YUZpZWxkc0dyYXBoaWNzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gbGF5b3V0IC0gVGhlIGxheW91dCBkZXNjcmlwdG9yLlxuICAgICogQHN0YXRpY1xuICAgICMjI1xuICAgIGxvYWRVaURhdGFGaWVsZHNHcmFwaGljczogKGxheW91dCkgLT5cbiAgICAgICAgZm9yIGsgb2YgbGF5b3V0XG4gICAgICAgICAgICBpZiBsYXlvdXRba10gaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgIGZvciBvIGluIGxheW91dFtrXVxuICAgICAgICAgICAgICAgICAgICBmb3IgaiBvZiBvXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBqID09IFwiaW1hZ2VcIiBvciBqID09IFwiZnVsbEltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSA9IG9bal1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIG5vdCBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgaW1hZ2Uuc3RhcnRzV2l0aChcImRhdGE6XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAob1tqXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoXCJHcmFwaGljcy9QaWN0dXJlcy8je29bal19XCIpXG5cbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICMjIypcbiAgICAqIExvYWRzIGFsbCBncmFwaGljcyBmb3IgdGhlIHNwZWNpZmllZCBsYXlvdXQtZGVzY3JpcHRvci5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGxvYWRVaURhdGFGaWVsZHNHcmFwaGljc1xuICAgICogQHBhcmFtIHtPYmplY3R9IGxheW91dCAtIFRoZSBsYXlvdXQgZGVzY3JpcHRvci5cbiAgICAqIEBzdGF0aWNcbiAgICAjIyNcbiAgICBsb2FkVWlMYXlvdXRHcmFwaGljczogKGxheW91dCkgLT5cbiAgICAgICAgaWYgbGF5b3V0LnByZWxvYWQ/XG4gICAgICAgICAgICBpZiBsYXlvdXQucHJlbG9hZC5ncmFwaGljcz9cbiAgICAgICAgICAgICAgICBmb3IgZ3JhcGhpYyBpbiBsYXlvdXQucHJlbG9hZC5ncmFwaGljc1xuICAgICAgICAgICAgICAgICAgICBpZiBncmFwaGljLm5hbWU/XG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFwiI3t1aS5Db21wb25lbnRfRm9ybXVsYUhhbmRsZXIuZmllbGRWYWx1ZShudWxsLCBncmFwaGljLmZvbGRlcil8fCdHcmFwaGljcy9QaWN0dXJlcyd9LyN7dWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUobnVsbCwgZ3JhcGhpYy5uYW1lKX1cIilcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0ID0gdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUobnVsbCwgZ3JhcGhpYy5wYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHN1YiBpbiBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBzdWI/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlID0gdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUoc3ViLCBncmFwaGljLmltYWdlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBpbWFnZT8ubmFtZT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoaW1hZ2UpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIGltYWdlP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChcIkdyYXBoaWNzL1BpY3R1cmVzLyN7aW1hZ2V9XCIpXG4gICAgICAgICAgICBpZiBsYXlvdXQucHJlbG9hZC52aWRlb3M/XG4gICAgICAgICAgICAgICAgZm9yIHZpZGVvIGluIGxheW91dC5wcmVsb2FkLnZpZGVvc1xuICAgICAgICAgICAgICAgICAgICBpZiB2aWRlby5uYW1lP1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldFZpZGVvKFwiI3t2aWRlby5mb2xkZXJ8fCdNb3ZpZXMnfS8je3ZpZGVvLm5hbWV9XCIpXG4gICAgICAgICAgICBpZiBsYXlvdXQucHJlbG9hZC5tdXNpYz9cbiAgICAgICAgICAgICAgICBmb3IgbXVzaWMgaW4gbGF5b3V0LnByZWxvYWQubXVzaWNcbiAgICAgICAgICAgICAgICAgICAgaWYgbXVzaWM/XG4gICAgICAgICAgICAgICAgICAgICAgICBtdXNpY0ZpbGUgPSB1aS5Db21wb25lbnRfRm9ybXVsYUhhbmRsZXIuZmllbGRWYWx1ZShsYXlvdXQsIG11c2ljLm5hbWUgfHwgbXVzaWMpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB0eXBlb2YobXVzaWNGaWxlKSA9PSBcIm9iamVjdFwiIHRoZW4gbXVzaWNGaWxlID0gbXVzaWNGaWxlLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIG11c2ljRmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRBdWRpb0J1ZmZlcihcIiN7bXVzaWMuZm9sZGVyfHwnQXVkaW8vTXVzaWMnfS8je211c2ljRmlsZX1cIilcbiAgICAgICAgICAgIGlmIGxheW91dC5wcmVsb2FkLnNvdW5kcz9cbiAgICAgICAgICAgICAgICBmb3Igc291bmQgaW4gbGF5b3V0LnByZWxvYWQuc291bmRzXG4gICAgICAgICAgICAgICAgICAgIGlmIHNvdW5kP1xuICAgICAgICAgICAgICAgICAgICAgICAgc291bmRGaWxlID0gdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUobGF5b3V0LCBzb3VuZC5uYW1lIHx8IHNvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgdHlwZW9mKHNvdW5kRmlsZSkgPT0gXCJvYmplY3RcIiB0aGVuIHNvdW5kRmlsZSA9IHNvdW5kRmlsZS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBzb3VuZEZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0QXVkaW9CdWZmZXIoXCIje3NvdW5kLmZvbGRlcnx8J0F1ZGlvL1NvdW5kcyd9LyN7c291bmRGaWxlfVwiKVxuICAgICAgICBpZiBsYXlvdXQuaW1hZ2VzP1xuICAgICAgICAgICAgZm9yIGltYWdlIGluIGxheW91dC5pbWFnZXNcbiAgICAgICAgICAgICAgICBpbWFnZSA9IHVpLkNvbXBvbmVudF9Gb3JtdWxhSGFuZGxlci5maWVsZFZhbHVlKGxheW91dCwgaW1hZ2UpXG4gICAgICAgICAgICAgICAgaWYgaW1hZ2U/Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChpbWFnZSkpXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFwiR3JhcGhpY3MvUGljdHVyZXMvI3tpbWFnZX1cIilcbiAgICAgICAgaWYgbGF5b3V0LmFuaW1hdGlvbnM/XG4gICAgICAgICAgICBmb3IgZGVzY3JpcHRvciBpbiBsYXlvdXQuYW5pbWF0aW9uc1xuICAgICAgICAgICAgICAgIGZvciBhbmltYXRpb24gaW4gZGVzY3JpcHRvci5mbG93XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCBhbmltYXRpb24udHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiBcInNvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0QXVkaW9CdWZmZXIoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoYW5pbWF0aW9uLnNvdW5kKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gXCJjaGFuZ2VJbWFnZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBpbWFnZSBpbiBhbmltYXRpb24uaW1hZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoXCJHcmFwaGljcy9QaWN0dXJlcy8je2ltYWdlfVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiBcIm1hc2tUb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChhbmltYXRpb24ubWFzaykpXG4gICAgICAgICAgICAgICAgICAgIGlmIGFuaW1hdGlvbi5zb3VuZD9cbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRBdWRpb0J1ZmZlcihSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChhbmltYXRpb24uc291bmQpKVxuXG4gICAgICAgIGlmIGxheW91dC5pbWFnZT9cbiAgICAgICAgICAgIGltYWdlID0gdWkuQ29tcG9uZW50X0Zvcm11bGFIYW5kbGVyLmZpZWxkVmFsdWUobGF5b3V0LCBsYXlvdXQuaW1hZ2UpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIGltYWdlPy5uYW1lXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChpbWFnZSkpXG4gICAgICAgICAgICBlbHNlIGlmIGxheW91dC5pbWFnZUZvbGRlcj9cbiAgICAgICAgICAgICAgICBpbWFnZUZvbGRlciA9IHVpLkNvbXBvbmVudF9Gb3JtdWxhSGFuZGxlci5maWVsZFZhbHVlKGxheW91dCwgbGF5b3V0LmltYWdlRm9sZGVyKVxuICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoXCIje2ltYWdlRm9sZGVyfS8je2ltYWdlfVwiKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoXCJHcmFwaGljcy9QaWN0dXJlcy8je2ltYWdlfVwiKVxuICAgICAgICBpZiBsYXlvdXQudmlkZW8/XG4gICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0VmlkZW8oXCJNb3ZpZXMvI3tsYXlvdXQudmlkZW99XCIpXG4gICAgICAgIGlmIGxheW91dC5jdXN0b21GaWVsZHM/XG4gICAgICAgICAgICBAbG9hZFVpR3JhcGhpY3NGcm9tT2JqZWN0KGxheW91dC5jdXN0b21GaWVsZHMpXG4gICAgICAgIGlmIGxheW91dC5jdXN0b21GaWVsZHM/LmFjdGlvbnM/XG4gICAgICAgICAgICBmb3IgYWN0aW9uIGluIGxheW91dC5jdXN0b21GaWVsZHMuYWN0aW9uc1xuICAgICAgICAgICAgICAgIGlmIGFjdGlvbi5uYW1lID09IFwicGxheVZvaWNlXCIgb3IgYWN0aW9uLm5hbWUgPT0gXCJwbGF5U291bmRcIlxuICAgICAgICAgICAgICAgICAgICBBdWRpb01hbmFnZXIubG9hZFNvdW5kKGFjdGlvbi5wYXJhbXMubmFtZSlcbiAgICAgICAgaWYgbGF5b3V0LmFjdGlvbnM/IG9yIGxheW91dC5hY3Rpb24/XG4gICAgICAgICAgICBhY3Rpb25zID0gaWYgbGF5b3V0LmFjdGlvbj8gdGhlbiBbbGF5b3V0LmFjdGlvbl0gZWxzZSBsYXlvdXQuYWN0aW9uc1xuICAgICAgICAgICAgZm9yIGFjdGlvbiBpbiBhY3Rpb25zXG4gICAgICAgICAgICAgICAgaWYgYWN0aW9uLm5hbWUgPT0gXCJwbGF5Vm9pY2VcIiBvciBhY3Rpb24ubmFtZSA9PSBcInBsYXlTb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5sb2FkU291bmQoYWN0aW9uLnBhcmFtcy5uYW1lKVxuICAgICAgICBpZiBsYXlvdXQucGFyYW1zXG4gICAgICAgICAgICBAbG9hZFVpTGF5b3V0R3JhcGhpY3MobGF5b3V0LnBhcmFtcylcbiAgICAgICAgaWYgbGF5b3V0LnRlbXBsYXRlP1xuICAgICAgICAgICAgQGxvYWRVaUxheW91dEdyYXBoaWNzKGxheW91dC50ZW1wbGF0ZSlcbiAgICAgICAgaWYgbGF5b3V0LnN0eWxlPyBhbmQgdWkuVWlGYWN0b3J5LnN0eWxlc1tsYXlvdXQuc3R5bGVdP1xuICAgICAgICAgICAgQGxvYWRVaUxheW91dEdyYXBoaWNzKHVpLlVpRmFjdG9yeS5zdHlsZXNbbGF5b3V0LnN0eWxlXSlcbiAgICAgICAgICAgIGZvciBzZWwgb2YgdWkuVUlNYW5hZ2VyLnNlbGVjdG9yc1xuICAgICAgICAgICAgICAgIHN0eWxlID0gdWkuVUlNYW5hZ2VyLnN0eWxlc1tsYXlvdXQuc3R5bGUgKyBcIjpcIitzZWxdXG4gICAgICAgICAgICAgICAgaWYgc3R5bGUgdGhlbiBAbG9hZFVpTGF5b3V0R3JhcGhpY3Moc3R5bGUpXG4gICAgICAgIGlmIHVpLlVpRmFjdG9yeS5jdXN0b21UeXBlc1tsYXlvdXQudHlwZV0/XG4gICAgICAgICAgICBAbG9hZFVpTGF5b3V0R3JhcGhpY3ModWkuVWlGYWN0b3J5LmN1c3RvbVR5cGVzW2xheW91dC50eXBlXSlcbiAgICAgICAgaWYgbGF5b3V0LmNvbnRyb2xzP1xuICAgICAgICAgICAgZm9yIGNvbnRyb2wgaW4gbGF5b3V0LmNvbnRyb2xzXG4gICAgICAgICAgICAgICAgQGxvYWRVaUxheW91dEdyYXBoaWNzKGNvbnRyb2wpXG5cbiAgICAjIyMqXG4gICAgKiBMb2FkcyBhbGwgc3lzdGVtIHNvdW5kcy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGxvYWRTeXN0ZW1Tb3VuZHNcbiAgICAqIEBzdGF0aWNcbiAgICAjIyNcbiAgICBsb2FkU3lzdGVtU291bmRzOiAtPlxuICAgICAgICBmb3Igc291bmQgaW4gUmVjb3JkTWFuYWdlci5zeXN0ZW0uc291bmRzXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIubG9hZFNvdW5kKHNvdW5kKVxuXG4gICAgIyMjKlxuICAgICogTG9hZHMgYWxsIHN5c3RlbSBncmFwaGljcy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGxvYWRTeXN0ZW1HcmFwaGljc1xuICAgICogQHN0YXRpY1xuICAgICMjI1xuICAgIGxvYWRTeXN0ZW1HcmFwaGljczogLT5cbiAgICAgICAgZm9yIHNsb3QgaW4gR2FtZU1hbmFnZXIuc2F2ZUdhbWVTbG90c1xuICAgICAgICAgICAgaWYgc2xvdC50aHVtYj8gYW5kIHNsb3QudGh1bWIubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoc2xvdC50aHVtYilcbiAgICAgICAgaWYgUmVjb3JkTWFuYWdlci5zeXN0ZW0uY3Vyc29yPy5uYW1lXG4gICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKFJlY29yZE1hbmFnZXIuc3lzdGVtLmN1cnNvcikpXG4gICAgICAgIGlmIFJlY29yZE1hbmFnZXIuc3lzdGVtLnRpdGxlU2NyZWVuPy5uYW1lXG4gICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKFJlY29yZE1hbmFnZXIuc3lzdGVtLnRpdGxlU2NyZWVuKSlcbiAgICAgICAgaWYgUmVjb3JkTWFuYWdlci5zeXN0ZW0ubGFuZ3VhZ2VTY3JlZW4/Lm5hbWVcbiAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoUmVjb3JkTWFuYWdlci5zeXN0ZW0ubGFuZ3VhZ2VTY3JlZW4pKVxuICAgICAgICBpZiBSZWNvcmRNYW5hZ2VyLnN5c3RlbS5tZW51QmFja2dyb3VuZD8ubmFtZVxuICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChSZWNvcmRNYW5hZ2VyLnN5c3RlbS5tZW51QmFja2dyb3VuZCkpXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICAjIyMqXG4gICAgKiBMb2FkcyBhbGwgcmVzb3VyY2VzIG5lZWRlZCBieSB0aGUgc3BlY2lmaWVkIGxpc3Qgb2YgY29tbWFuZHMuXG4gICAgKlxuICAgICogQG1ldGhvZCBsb2FkRXZlbnRDb21tYW5kc0dyYXBoaWNzXG4gICAgKiBAcGFyYW0ge09iamVjdFtdfSBjb21tYW5kcyAtIFRoZSBsaXN0IG9mIGNvbW1hbmRzLlxuICAgICogQHJldHVybiB7Ym9vbGVhbn0gSW5kaWNhdGVzIGlmIGRhdGEgbmVlZHMgdG8gYmUgbG9hZGVkLlxuICAgICogQHN0YXRpY1xuICAgICMjI1xuICAgIGxvYWRFdmVudENvbW1hbmRzRGF0YTogKGNvbW1hbmRzKSAtPlxuICAgICAgICBAbG9hZGVkU2NlbmVzQnlVaWQgPSB7fVxuICAgICAgICByZXR1cm4gQF9sb2FkRXZlbnRDb21tYW5kc0RhdGEoY29tbWFuZHMpXG5cbiAgICBfbG9hZEV2ZW50Q29tbWFuZHNEYXRhOiAoY29tbWFuZHMpIC0+XG4gICAgICAgIHJldHVybiBubyBpZiBub3QgY29tbWFuZHM/XG5cbiAgICAgICAgcmVzdWx0ID0gbm9cblxuICAgICAgICBmb3IgY29tbWFuZCBpbiBjb21tYW5kc1xuICAgICAgICAgICAgc3dpdGNoIGNvbW1hbmQuaWRcbiAgICAgICAgICAgICAgICB3aGVuIFwidm4uQ2hvaWNlXCJcbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuYWN0aW9uLnNjZW5lXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZURvY3VtZW50ID0gRGF0YU1hbmFnZXIuZ2V0RG9jdW1lbnQoY29tbWFuZC5wYXJhbXMuYWN0aW9uLnNjZW5lLnVpZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHNjZW5lRG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAhc2NlbmVEb2N1bWVudC5sb2FkZWQgaWYgIXJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHNjZW5lRG9jdW1lbnQubG9hZGVkIGFuZCAhQGxvYWRlZFNjZW5lc0J5VWlkW3NjZW5lRG9jdW1lbnQudWlkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbG9hZGVkU2NlbmVzQnlVaWRbc2NlbmVEb2N1bWVudC51aWRdID0geWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBfbG9hZEV2ZW50Q29tbWFuZHNEYXRhKHNjZW5lRG9jdW1lbnQuaXRlbXMuY29tbWFuZHMpIGlmICFyZXN1bHRcblxuICAgICAgICAgICAgICAgIHdoZW4gXCJ2bi5DYWxsU2NlbmVcIlxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5zY2VuZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmVEb2N1bWVudCA9IERhdGFNYW5hZ2VyLmdldERvY3VtZW50KGNvbW1hbmQucGFyYW1zLnNjZW5lLnVpZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHNjZW5lRG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAhc2NlbmVEb2N1bWVudC5sb2FkZWQgaWYgIXJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHNjZW5lRG9jdW1lbnQubG9hZGVkIGFuZCAhQGxvYWRlZFNjZW5lc0J5VWlkW3NjZW5lRG9jdW1lbnQudWlkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbG9hZGVkU2NlbmVzQnlVaWRbc2NlbmVEb2N1bWVudC51aWRdID0geWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBfbG9hZEV2ZW50Q29tbWFuZHNEYXRhKHNjZW5lRG9jdW1lbnQuaXRlbXMuY29tbWFuZHMpIGlmICFyZXN1bHRcblxuICAgICAgICByZXR1cm4gcmVzdWx0XG5cbiAgICAjIyMqXG4gICAgKiBQcmVsb2FkcyBhbGwgcmVzb3VyY2VzIG5lZWRlZCBieSB0aGUgc3BlY2lmaWVkIGNvbW1vbiBldmVudC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGxvYWRDb21tb25FdmVudFJlc291cmNlc1xuICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50SWQgLSBJRCBvZiB0aGUgY29tbW9uIGV2ZW50IHRvIHByZWxvYWQgdGhlIHJlc291cmNlcyBmb3IuXG4gICAgKiBAc3RhdGljXG4gICAgIyMjXG4gICAgbG9hZENvbW1vbkV2ZW50UmVzb3VyY2VzOiAoZXZlbnRJZCkgLT5cbiAgICAgICAgY29tbW9uRXZlbnQgPSBSZWNvcmRNYW5hZ2VyLmNvbW1vbkV2ZW50c1tldmVudElkXVxuICAgICAgICBpZiBjb21tb25FdmVudD8gYW5kICFAbG9hZGVkQ29tbW9uRXZlbnRzQnlJZFtldmVudElkXVxuICAgICAgICAgICAgQGxvYWRlZENvbW1vbkV2ZW50c0J5SWRbZXZlbnRJZF0gPSB0cnVlXG4gICAgICAgICAgICBAX2xvYWRFdmVudENvbW1hbmRzR3JhcGhpY3MoY29tbW9uRXZlbnQuY29tbWFuZHMpXG5cbiAgICAjIyMqXG4gICAgKiBMb2FkcyBhbGwgcmVzb3VyY2VzIG5lZWRlZCBieSB0aGUgc3BlY2lmaWVkIGxpc3Qgb2YgY29tbWFuZHMuXG4gICAgKlxuICAgICogQG1ldGhvZCBsb2FkRXZlbnRDb21tYW5kc0dyYXBoaWNzXG4gICAgKiBAcGFyYW0ge09iamVjdFtdfSBjb21tYW5kcyAtIFRoZSBsaXN0IG9mIGNvbW1hbmRzLlxuICAgICogQHN0YXRpY1xuICAgICMjI1xuICAgIGxvYWRFdmVudENvbW1hbmRzR3JhcGhpY3M6IChjb21tYW5kcykgLT5cbiAgICAgICAgQGxvYWRlZFNjZW5lc0J5VWlkID0ge31cbiAgICAgICAgQGxvYWRlZENvbW1vbkV2ZW50c0J5SWQgPSBbXVxuICAgICAgICBAX2xvYWRFdmVudENvbW1hbmRzR3JhcGhpY3MoY29tbWFuZHMpXG5cbiAgICBfbG9hZEV2ZW50Q29tbWFuZHNHcmFwaGljczogKGNvbW1hbmRzKSAtPlxuICAgICAgICByZXR1cm4gaWYgbm90IGNvbW1hbmRzP1xuXG4gICAgICAgIGZvciBjb21tYW5kIGluIGNvbW1hbmRzXG4gICAgICAgICAgICBzd2l0Y2ggY29tbWFuZC5pZFxuICAgICAgICAgICAgICAgIHdoZW4gXCJncy5TdGFydFRpbWVyXCJcbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuYWN0aW9uLnR5cGUgPT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgQGxvYWRDb21tb25FdmVudFJlc291cmNlcyhjb21tYW5kLnBhcmFtcy5hY3Rpb24uZGF0YS5jb21tb25FdmVudElkKVxuICAgICAgICAgICAgICAgIHdoZW4gXCJncy5DYWxsQ29tbW9uRXZlbnRcIlxuICAgICAgICAgICAgICAgICAgICBjb21tb25FdmVudCA9IFJlY29yZE1hbmFnZXIuY29tbW9uRXZlbnRzW2NvbW1hbmQucGFyYW1zLmNvbW1vbkV2ZW50SWRdXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1vbkV2ZW50P1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHBhcmFtLCBpIGluIGNvbW1vbkV2ZW50LnBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBwYXJhbS5zdHJpbmdWYWx1ZVR5cGUgPT0gXCJzY2VuZUlkXCIgYW5kIGNvbW1hbmQucGFyYW1zLnBhcmFtZXRlcnM/LnZhbHVlc1tpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZURvY3VtZW50ID0gRGF0YU1hbmFnZXIuZ2V0RG9jdW1lbnQoY29tbWFuZC5wYXJhbXMucGFyYW1ldGVycy52YWx1ZXNbaV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHNjZW5lRG9jdW1lbnQgYW5kICFAbG9hZGVkU2NlbmVzQnlVaWRbc2NlbmVEb2N1bWVudC51aWRdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbG9hZGVkU2NlbmVzQnlVaWRbc2NlbmVEb2N1bWVudC51aWRdID0geWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAX2xvYWRFdmVudENvbW1hbmRzR3JhcGhpY3Moc2NlbmVEb2N1bWVudC5pdGVtcy5jb21tYW5kcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICFAbG9hZGVkQ29tbW9uRXZlbnRzQnlJZFtjb21tYW5kLnBhcmFtcy5jb21tb25FdmVudElkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBsb2FkZWRDb21tb25FdmVudHNCeUlkW2NvbW1hbmQucGFyYW1zLmNvbW1vbkV2ZW50SWRdID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBfbG9hZEV2ZW50Q29tbWFuZHNHcmFwaGljcyhjb21tb25FdmVudC5jb21tYW5kcylcbiAgICAgICAgICAgICAgICB3aGVuIFwidm4uQ2FsbFNjZW5lXCJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVEb2N1bWVudCA9IERhdGFNYW5hZ2VyLmdldERvY3VtZW50KGNvbW1hbmQucGFyYW1zLnNjZW5lLnVpZClcbiAgICAgICAgICAgICAgICAgICAgaWYgc2NlbmVEb2N1bWVudCBhbmQgIUBsb2FkZWRTY2VuZXNCeVVpZFtzY2VuZURvY3VtZW50LnVpZF1cbiAgICAgICAgICAgICAgICAgICAgICAgIEBsb2FkZWRTY2VuZXNCeVVpZFtzY2VuZURvY3VtZW50LnVpZF0gPSB5ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIEBfbG9hZEV2ZW50Q29tbWFuZHNHcmFwaGljcyhzY2VuZURvY3VtZW50Lml0ZW1zLmNvbW1hbmRzKVxuICAgICAgICAgICAgICAgIHdoZW4gXCJncy5DaGFuZ2VUcmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChjb21tYW5kLnBhcmFtcy5ncmFwaGljKSlcbiAgICAgICAgICAgICAgICB3aGVuIFwiZ3MuU2NyZWVuVHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoY29tbWFuZC5wYXJhbXMuZ3JhcGhpYykpXG4gICAgICAgICAgICAgICAgd2hlbiBcInZuLkNoYW5nZUJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5ncmFwaGljP1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChjb21tYW5kLnBhcmFtcy5ncmFwaGljKSlcbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuYW5pbWF0aW9uPy50eXBlID09IGdzLkFuaW1hdGlvblR5cGVzLk1BU0tJTkcgYW5kIGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbi5tYXNrPy5ncmFwaGljXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbi5tYXNrLmdyYXBoaWMpKVxuICAgICAgICAgICAgICAgIHdoZW4gXCJ2bi5MMkRKb2luU2NlbmVcIlxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5tb2RlbD9cbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRMaXZlMkRNb2RlbChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChjb21tYW5kLnBhcmFtcy5tb2RlbCkpXG4gICAgICAgICAgICAgICAgd2hlbiBcInZuLkNoYXJhY3RlckpvaW5TY2VuZVwiXG4gICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciA9IFJlY29yZE1hbmFnZXIuY2hhcmFjdGVyc1tjb21tYW5kLnBhcmFtcy5jaGFyYWN0ZXJJZF1cbiAgICAgICAgICAgICAgICAgICAgaWYgY2hhcmFjdGVyP1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbklkID0gY29tbWFuZC5wYXJhbXMuZXhwcmVzc2lvbklkID8gY2hhcmFjdGVyLmRlZmF1bHRFeHByZXNzaW9uSWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGV4cHJlc3Npb25JZD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQgPSBSZWNvcmRNYW5hZ2VyLmNoYXJhY3RlckV4cHJlc3Npb25zW2V4cHJlc3Npb25JZF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiByZWNvcmQ/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJlY29yZC5pZGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgaW1hZ2UgaW4gcmVjb3JkLmlkbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKGltYWdlLnJlc291cmNlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcmVjb3JkLnRhbGtpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBpbWFnZSBpbiByZWNvcmQudGFsa2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoaW1hZ2UucmVzb3VyY2UpKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbi50eXBlID09IGdzLkFuaW1hdGlvblR5cGVzLk1BU0tJTkcgYW5kIGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbi5tYXNrLmdyYXBoaWM/XG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbi5tYXNrLmdyYXBoaWMpKVxuICAgICAgICAgICAgICAgIHdoZW4gXCJ2bi5DaGFyYWN0ZXJDaGFuZ2VFeHByZXNzaW9uXCJcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkID0gUmVjb3JkTWFuYWdlci5jaGFyYWN0ZXJFeHByZXNzaW9uc1tjb21tYW5kLnBhcmFtcy5leHByZXNzaW9uSWRdXG4gICAgICAgICAgICAgICAgICAgIGlmIHJlY29yZD9cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciBpbWFnZSBpbiByZWNvcmQuaWRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoaW1hZ2UucmVzb3VyY2UpKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGltYWdlIGluIHJlY29yZC50YWxraW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChpbWFnZS5yZXNvdXJjZSkpXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbi50eXBlID09IGdzLkFuaW1hdGlvblR5cGVzLk1BU0tJTkcgYW5kIGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbi5tYXNrLmdyYXBoaWM/XG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbi5tYXNrLmdyYXBoaWMpKVxuICAgICAgICAgICAgICAgIHdoZW4gXCJncy5TaG93UGFydGlhbE1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy52b2ljZT9cbiAgICAgICAgICAgICAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5sb2FkU291bmQoY29tbWFuZC5wYXJhbXMudm9pY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAjUmVzb3VyY2VNYW5hZ2VyLmdldEF1ZGlvQnVmZmVyKFwiQXVkaW8vU291bmQvI3tjb21tYW5kLnBhcmFtcy52b2ljZS5uYW1lfVwiKVxuXG4gICAgICAgICAgICAgICAgd2hlbiBcInZuLkNob2ljZVwiXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLmFjdGlvbi5zY2VuZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmVEb2N1bWVudCA9IERhdGFNYW5hZ2VyLmdldERvY3VtZW50KGNvbW1hbmQucGFyYW1zLmFjdGlvbi5zY2VuZS51aWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBzY2VuZURvY3VtZW50IGFuZCAhQGxvYWRlZFNjZW5lc0J5VWlkW3NjZW5lRG9jdW1lbnQudWlkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBsb2FkZWRTY2VuZXNCeVVpZFtzY2VuZURvY3VtZW50LnVpZF0gPSB5ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAX2xvYWRFdmVudENvbW1hbmRzR3JhcGhpY3Moc2NlbmVEb2N1bWVudC5pdGVtcy5jb21tYW5kcylcblxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5hY3Rpb24uY29tbW9uRXZlbnRJZFxuICAgICAgICAgICAgICAgICAgICAgICAgQGxvYWRDb21tb25FdmVudFJlc291cmNlcyhjb21tYW5kLnBhcmFtcy5hY3Rpb24uY29tbW9uRXZlbnRJZClcblxuXG4gICAgICAgICAgICAgICAgd2hlbiBcImdzLlNob3dNZXNzYWdlXCIsIFwiZ3MuU2hvd01lc3NhZ2VOVkxcIiwgXCJncy5TaG93VGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbnM/XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgZWlkIGluIGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBSZWNvcmRNYW5hZ2VyLmFuaW1hdGlvbnNbZWlkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGFuaW1hdGlvbj8gYW5kIGFuaW1hdGlvbi5ncmFwaGljLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChhbmltYXRpb24uZ3JhcGhpYykpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuZXhwcmVzc2lvbnM/XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgZWlkIGluIGNvbW1hbmQucGFyYW1zLmV4cHJlc3Npb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IFJlY29yZE1hbmFnZXIuY2hhcmFjdGVyRXhwcmVzc2lvbnNbZWlkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGV4cHJlc3Npb24/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGV4cHJlc3Npb24uaWRsZSB0aGVuIGZvciBpbWFnZSBpbiBleHByZXNzaW9uLmlkbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoaW1hZ2UucmVzb3VyY2UpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBleHByZXNzaW9uLnRhbGtpbmcgdGhlbiBmb3IgaW1hZ2UgaW4gZXhwcmVzc2lvbi50YWxraW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKGltYWdlLnJlc291cmNlKSlcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLnZvaWNlP1xuICAgICAgICAgICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmxvYWRTb3VuZChjb21tYW5kLnBhcmFtcy52b2ljZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICNSZXNvdXJjZU1hbmFnZXIuZ2V0QXVkaW9CdWZmZXIoXCJBdWRpby9Tb3VuZC8je2NvbW1hbmQucGFyYW1zLnZvaWNlLm5hbWV9XCIpXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZCA9IFJlY29yZE1hbmFnZXIuY2hhcmFjdGVyRXhwcmVzc2lvbnNbY29tbWFuZC5wYXJhbXMuZXhwcmVzc2lvbklkXVxuICAgICAgICAgICAgICAgICAgICBpZiByZWNvcmQ/XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiByZWNvcmQuaWRsZSB0aGVuIGZvciBpbWFnZSBpbiByZWNvcmQuaWRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoaW1hZ2UucmVzb3VyY2UpKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgcmVjb3JkLnRhbGtpbmcgdGhlbiBmb3IgaW1hZ2UgaW4gcmVjb3JkLnRhbGtpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKGltYWdlLnJlc291cmNlKSlcblxuXG4gICAgICAgICAgICAgICAgd2hlbiBcImdzLkFkZEhvdHNwb3RcIlxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5iYXNlR3JhcGhpYz8ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChjb21tYW5kLnBhcmFtcy5iYXNlR3JhcGhpYykpXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLmhvdmVyR3JhcGhpYz8ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChjb21tYW5kLnBhcmFtcy5ob3ZlckdyYXBoaWMpKVxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5zZWxlY3RlZEdyYXBoaWM/Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoY29tbWFuZC5wYXJhbXMuc2VsZWN0ZWRHcmFwaGljKSlcbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuc2VsZWN0ZWRIb3ZlckdyYXBoaWM/Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoY29tbWFuZC5wYXJhbXMuc2VsZWN0ZWRIb3ZlckdyYXBoaWMpKVxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy51bnNlbGVjdGVkR3JhcGhpYz8ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChjb21tYW5kLnBhcmFtcy51bnNlbGVjdGVkR3JhcGhpYykpXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLmFjdGlvbnM/XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5hY3Rpb25zLm9uQ2xpY2sudHlwZSA9PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQGxvYWRDb21tb25FdmVudFJlc291cmNlcyhjb21tYW5kLnBhcmFtcy5hY3Rpb25zLm9uQ2xpY2suY29tbW9uRXZlbnRJZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLmFjdGlvbnMub25FbnRlci50eXBlID09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbG9hZENvbW1vbkV2ZW50UmVzb3VyY2VzKGNvbW1hbmQucGFyYW1zLmFjdGlvbnMub25FbnRlci5jb21tb25FdmVudElkKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuYWN0aW9ucy5vbkxlYXZlLnR5cGUgPT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBsb2FkQ29tbW9uRXZlbnRSZXNvdXJjZXMoY29tbWFuZC5wYXJhbXMuYWN0aW9ucy5vbkxlYXZlLmNvbW1vbkV2ZW50SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5hY3Rpb25zLm9uU2VsZWN0LnR5cGUgPT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBsb2FkQ29tbW9uRXZlbnRSZXNvdXJjZXMoY29tbWFuZC5wYXJhbXMuYWN0aW9ucy5vblNlbGVjdC5jb21tb25FdmVudElkKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuYWN0aW9ucy5vbkRlc2VsZWN0LnR5cGUgPT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBsb2FkQ29tbW9uRXZlbnRSZXNvdXJjZXMoY29tbWFuZC5wYXJhbXMuYWN0aW9ucy5vbkRlc2VsZWN0LmNvbW1vbkV2ZW50SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5hY3Rpb25zLm9uRHJhZy50eXBlID09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbG9hZENvbW1vbkV2ZW50UmVzb3VyY2VzKGNvbW1hbmQucGFyYW1zLmFjdGlvbnMub25EcmFnLmNvbW1vbkV2ZW50SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5hY3Rpb25zLm9uRHJvcC50eXBlID09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbG9hZENvbW1vbkV2ZW50UmVzb3VyY2VzKGNvbW1hbmQucGFyYW1zLmFjdGlvbnMub25Ecm9wLmNvbW1vbkV2ZW50SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5hY3Rpb25zLm9uRHJvcFJlY2VpdmUudHlwZSA9PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQGxvYWRDb21tb25FdmVudFJlc291cmNlcyhjb21tYW5kLnBhcmFtcy5hY3Rpb25zLm9uRHJvcFJlY2VpdmUuY29tbW9uRXZlbnRJZClcblxuICAgICAgICAgICAgICAgIHdoZW4gXCJncy5TaG93UGljdHVyZVwiXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLmdyYXBoaWM/Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoY29tbWFuZC5wYXJhbXMuZ3JhcGhpYykpXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbj8udHlwZSA9PSBncy5BbmltYXRpb25UeXBlcy5NQVNLSU5HXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKGNvbW1hbmQucGFyYW1zLmFuaW1hdGlvbi5tYXNrLmdyYXBoaWMpKVxuICAgICAgICAgICAgICAgIHdoZW4gXCJncy5TaG93SW1hZ2VNYXBcIlxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5ncm91bmQ/Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoY29tbWFuZC5wYXJhbXMuZ3JvdW5kKSlcbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuaG92ZXI/Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoY29tbWFuZC5wYXJhbXMuaG92ZXIpKVxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy51bnNlbGVjdGVkPy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKGNvbW1hbmQucGFyYW1zLnVuc2VsZWN0ZWQpKVxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5zZWxlY3RlZD8ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChjb21tYW5kLnBhcmFtcy5zZWxlY3RlZCkpXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLnNlbGVjdGVkSG92ZXI/Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoY29tbWFuZC5wYXJhbXMuc2VsZWN0ZWRIb3ZlcikpXG4gICAgICAgICAgICAgICAgICAgIGZvciBob3RzcG90IGluIGNvbW1hbmQucGFyYW1zLmhvdHNwb3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBBdWRpb01hbmFnZXIubG9hZFNvdW5kKGhvdHNwb3QuZGF0YS5vbkhvdmVyU291bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICBBdWRpb01hbmFnZXIubG9hZFNvdW5kKGhvdHNwb3QuZGF0YS5vbkNsaWNrU291bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBob3RzcG90LmRhdGEuYWN0aW9uID09IDIgIyBDb21tb24gRXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tb25FdmVudCA9IFJlY29yZE1hbmFnZXIuY29tbW9uRXZlbnRzW2hvdHNwb3QuZGF0YS5jb21tb25FdmVudElkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGNvbW1vbkV2ZW50PyBhbmQgIUBsb2FkZWRDb21tb25FdmVudHNCeUlkW2hvdHNwb3QuZGF0YS5jb21tb25FdmVudElkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbG9hZGVkQ29tbW9uRXZlbnRzQnlJZFtob3RzcG90LmRhdGEuY29tbW9uRXZlbnRJZF0gPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBfbG9hZEV2ZW50Q29tbWFuZHNHcmFwaGljcyhjb21tb25FdmVudC5jb21tYW5kcylcbiAgICAgICAgICAgICAgICB3aGVuIFwiZ3MuTW92ZVBpY3R1cmVQYXRoXCIsIFwidm4uTW92ZUNoYXJhY3RlclBhdGhcIiwgXCJ2bi5TY3JvbGxCYWNrZ3JvdW5kUGF0aFwiLCBcImdzLk1vdmVWaWRlb1BhdGhcIlxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5wYXRoLmVmZmVjdHM/XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgZWZmZWN0IGluIGNvbW1hbmQucGFyYW1zLnBhdGguZWZmZWN0cy5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmxvYWRTb3VuZChlZmZlY3Quc291bmQpXG5cbiAgICAgICAgICAgICAgICB3aGVuIFwiZ3MuTWFza1BpY3R1cmVcIiwgXCJ2bi5NYXNrQ2hhcmFjdGVyXCIsIFwidm4uTWFza0JhY2tncm91bmRcIiwgXCJncy5NYXNrVmlkZW9cIlxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5tYXNrLnNvdXJjZVR5cGUgPT0gMCBhbmQgY29tbWFuZC5wYXJhbXMubWFzay5ncmFwaGljPy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKGNvbW1hbmQucGFyYW1zLm1hc2suZ3JhcGhpYykpXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLm1hc2suc291cmNlVHlwZSA9PSAxIGFuZCBjb21tYW5kLnBhcmFtcy5tYXNrLnZpZGVvPy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0VmlkZW8oUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoY29tbWFuZC5wYXJhbXMubWFzay52aWRlbykpXG4gICAgICAgICAgICAgICAgd2hlbiBcImdzLlBsYXlQaWN0dXJlQW5pbWF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uSWQgPSBjb21tYW5kLnBhcmFtcy5hbmltYXRpb25JZFxuICAgICAgICAgICAgICAgICAgICBpZiBhbmltYXRpb25JZD8gYW5kIG5vdCBhbmltYXRpb25JZC5zY29wZT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBSZWNvcmRNYW5hZ2VyLmFuaW1hdGlvbnNbYW5pbWF0aW9uSWRdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgYW5pbWF0aW9uIGFuZCBhbmltYXRpb24uZ3JhcGhpYz8ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFJlc291cmNlTWFuYWdlci5nZXRQYXRoKGFuaW1hdGlvbi5ncmFwaGljKSlcblxuICAgICAgICAgICAgICAgIHdoZW4gXCJncy5TaG93QmF0dGxlQW5pbWF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uSWQgPSBjb21tYW5kLnBhcmFtcy5hbmltYXRpb25JZFxuICAgICAgICAgICAgICAgICAgICBpZiBhbmltYXRpb25JZD8gYW5kIG5vdCBhbmltYXRpb25JZC5zY29wZT9cbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbiA9IFJlY29yZE1hbmFnZXIuYW5pbWF0aW9uc1thbmltYXRpb25JZF1cbiAgICAgICAgICAgICAgICAgICAgICAgIEBsb2FkQ29tcGxleEFuaW1hdGlvbihhbmltYXRpb24pXG5cbiAgICAgICAgICAgICAgICB3aGVuIFwiZ3MuSW5wdXROYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3JJZCA9IGNvbW1hbmQucGFyYW1zLmFjdG9ySWRcbiAgICAgICAgICAgICAgICAgICAgaWYgYWN0b3JJZD8gYW5kIG5vdCBhY3RvcklkLnNjb3BlP1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IgPSBSZWNvcmRNYW5hZ2VyLmFjdG9yc1thY3RvcklkXVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgYWN0b3I/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChcIkdyYXBoaWNzL0ZhY2VzLyN7YWN0b3IuZmFjZUdyYXBoaWM/Lm5hbWV9XCIpXG5cbiAgICAgICAgICAgICAgICB3aGVuIFwiZ3MuQ2hhbmdlVGlsZXNldFwiXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLmdyYXBoaWM/Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoXCJHcmFwaGljcy9UaWxlc2V0cy8je2NvbW1hbmQucGFyYW1zLmdyYXBoaWMubmFtZX1cIilcbiAgICAgICAgICAgICAgICB3aGVuIFwiZ3MuQ2hhbmdlTWFwUGFyYWxsYXhCYWNrZ3JvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMucGFyYWxsYXhCYWNrZ3JvdW5kPy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFwiR3JhcGhpY3MvUGljdHVyZXMvI3tjb21tYW5kLnBhcmFtcy5wYXJhbGxheEJhY2tncm91bmQubmFtZX1cIilcbiAgICAgICAgICAgICAgICB3aGVuIFwiZ3MuQ2hhbmdlQWN0b3JHcmFwaGljXCJcbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuY2hhbmdlQ2hhcmFjdGVyIGFuZCBjb21tYW5kLnBhcmFtcy5jaGFyYWN0ZXJHcmFwaGljPy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0Qml0bWFwKFwiR3JhcGhpY3MvQ2hhcmFjdGVycy8je2NvbW1hbmQucGFyYW1zLmNoYXJhY3RlckdyYXBoaWMubmFtZX1cIilcbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuY2hhbmdlRmFjZSBhbmQgY29tbWFuZC5wYXJhbXMuZmFjZUdyYXBoaWM/Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoXCJHcmFwaGljcy9GYWNlcy8je2NvbW1hbmQucGFyYW1zLmZhY2VHcmFwaGljLm5hbWV9XCIpXG4gICAgICAgICAgICAgICAgd2hlbiBcImdzLk1vdmVFdmVudFwiXG4gICAgICAgICAgICAgICAgICAgIGZvciBtb3ZlQ29tbWFuZCBpbiBjb21tYW5kLnBhcmFtcy5jb21tYW5kc1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIG1vdmVDb21tYW5kLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiA0NCAjIENoYW5nZSBHcmFwaGljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5nZXRCaXRtYXAoXCJHcmFwaGljcy9DaGFyYWN0ZXJzLyN7bW92ZUNvbW1hbmQucmVzb3VyY2UubmFtZX1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuIDQ3ICMgUGxheSBTb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdWRpb01hbmFnZXIubG9hZFNvdW5kKG1vdmVDb21tYW5kLnJlc291cmNlKVxuICAgICAgICAgICAgICAgIHdoZW4gXCJncy5UcmFuc2Zvcm1FbmVteVwiXG4gICAgICAgICAgICAgICAgICAgIGlmIG5vdCBjb21tYW5kLnBhcmFtcz8udGFyZ2V0SWQuc2NvcGU/ICMgRklYTUU6IE1heWJlIGp1c3QgdXNlIHRoZSBjdXJyZW50IHZhcmlhYmxlIHZhbHVlP1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXkgPSBSZWNvcmRNYW5hZ2VyLmVuZW1pZXNbY29tbWFuZC5wYXJhbXMudGFyZ2V0SWRdXG4gICAgICAgICAgICAgICAgICAgICAgICBAbG9hZEFjdG9yQmF0dGxlQW5pbWF0aW9ucyhlbmVteSlcblxuICAgICAgICAgICAgICAgIHdoZW4gXCJncy5QbGF5TXVzaWNcIlxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5tdXNpYz9cbiAgICAgICAgICAgICAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5sb2FkTXVzaWMoY29tbWFuZC5wYXJhbXMubXVzaWMpXG4gICAgICAgICAgICAgICAgd2hlbiBcImdzLlBsYXlWaWRlb1wiLCBcImdzLlNob3dWaWRlb1wiXG4gICAgICAgICAgICAgICAgICAgIGlmIGNvbW1hbmQucGFyYW1zLnZpZGVvPy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZ2V0VmlkZW8oUmVzb3VyY2VNYW5hZ2VyLmdldFBhdGgoY29tbWFuZC5wYXJhbXMudmlkZW8pKVxuICAgICAgICAgICAgICAgICAgICBpZiBjb21tYW5kLnBhcmFtcy5hbmltYXRpb24/LnR5cGUgPT0gZ3MuQW5pbWF0aW9uVHlwZXMuTUFTS0lOR1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChjb21tYW5kLnBhcmFtcy5hbmltYXRpb24ubWFzay5ncmFwaGljKSlcbiAgICAgICAgICAgICAgICB3aGVuIFwiZ3MuUGxheVNvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuc291bmQ/XG4gICAgICAgICAgICAgICAgICAgICAgICBBdWRpb01hbmFnZXIubG9hZFNvdW5kKGNvbW1hbmQucGFyYW1zLnNvdW5kKVxuXG4gICAgICAgICAgICAgICAgd2hlbiBcInZuLkNoYW5nZVNvdW5kc1wiXG4gICAgICAgICAgICAgICAgICAgIGZvciBzb3VuZCBpbiBjb21tYW5kLnBhcmFtcy5zb3VuZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHNvdW5kP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5sb2FkU291bmQoc291bmQpXG5cbiAgICAgICAgICAgICAgICB3aGVuIFwiZ3MuQ2hhbmdlU2NyZWVuQ3Vyc29yXCJcbiAgICAgICAgICAgICAgICAgICAgaWYgY29tbWFuZC5wYXJhbXMuZ3JhcGhpYz8ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChSZXNvdXJjZU1hbmFnZXIuZ2V0UGF0aChjb21tYW5kLnBhcmFtcy5ncmFwaGljKSlcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICMjIypcbiAgICAqIExvYWRzIGFsbCByZXNvdXJjZXMgZm9yIHRoZSBzcGVjaWZpZWQgYW5pbWF0aW9uLlxuICAgICpcbiAgICAqIEBtZXRob2QgbG9hZEFuaW1hdGlvblxuICAgICogQHBhcmFtIHtPYmplY3R9IGFuaW1hdGlvbiAtIFRoZSBhbmltYXRpb24tcmVjb3JkLlxuICAgICogQHN0YXRpY1xuICAgICMjI1xuICAgIGxvYWRBbmltYXRpb246IChhbmltYXRpb24pIC0+XG4gICAgICAgIGlmIGFuaW1hdGlvbj8gYW5kIGFuaW1hdGlvbi5ncmFwaGljP1xuICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChcIkdyYXBoaWNzL1NpbXBsZUFuaW1hdGlvbnMvI3thbmltYXRpb24uZ3JhcGhpYy5uYW1lfVwiKVxuXG5cblxuZ3MuUmVzb3VyY2VMb2FkZXIgPSBuZXcgUmVzb3VyY2VMb2FkZXIoKVxud2luZG93LlJlc291cmNlTG9hZGVyID0gZ3MuUmVzb3VyY2VMb2FkZXIiXX0=
//# sourceURL=ResourceLoader_23.js