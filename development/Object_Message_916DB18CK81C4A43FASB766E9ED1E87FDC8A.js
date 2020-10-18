// Generated by CoffeeScript 1.12.7
(function() {
  var MessageSettings, Object_Message,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  MessageSettings = (function() {

    /**
    * Stores the different kind of settings for a message object such as
    * auto-erase, wait-at-end, backlog writing, etc.
    *
    * @module ui
    * @class MessageSettings
    * @memberof ui
    * @constructor
     */
    function MessageSettings() {

      /**
      * The domain the object belongs to.
      * @property domain
      * @type string
       */
      this.domain = "com.degica.vnm.default";

      /**
      * Indicates if the message should wait for user-action to continue.
      * @property waitAtEnd
      * @type boolean
      * @default true
       */
      this.waitAtEnd = true;

      /**
      * Indicates if the message should automatically erase it's content 
      * before displaying the next message.
      * @property autoErase
      * @type boolean
      * @default true
       */
      this.autoErase = true;

      /**
      * Indicates if the message should be added to the backlog.
      * @property backlog
      * @type boolean
      * @default true
       */
      this.backlog = true;

      /**
      * Spacing between text lines in pixels.
      * @property lineSpacing
      * @type number
      * @default 0
       */
      this.lineSpacing = 0;

      /**
      * Left and right padding of a text line in pixels.
      * @property linePadding
      * @type number
      * @default 6
       */
      this.linePadding = 6;

      /**
      * Spacing between text paragraphs in pixels. A paragraph is a single
      * message added if the <b>autoErase</b> property is off.
      * @property paragraphSpacing
      * @type number
      * @default 0
       */
      this.paragraphSpacing = 0;

      /**
      * Indicates if the defined text-color of the currently speaking character should
      * be used as message text color. That is useful for NVL style messages.
      * @property useCharacterColor
      * @type boolean
      * @default false
       */
      this.useCharacterColor = false;
    }

    return MessageSettings;

  })();

  ui.MessageSettings = MessageSettings;

  Object_Message = (function(superClass) {
    extend(Object_Message, superClass);

    Object_Message.objectCodecBlackList = ["parent", "controlsByStyle", "parentsByStyle", "styles", "activeStyles"];


    /**
    * A message object to display game messages on screen.
    *
    * @module ui
    * @class Object_Message
    * @extends ui.Object_UIElement
    * @memberof ui
    * @constructor
     */

    function Object_Message() {
      Object_Message.__super__.constructor.apply(this, arguments);
      this.visible = false;

      /**
      * The font used for the message text.
      * @property font
      * @type gs.Font
       */
      this.font = new Font("Verdana", Math.round(9 / 240 * Graphics.height));
      this.font.border = false;
      this.font.borderColor = new Color(0, 0, 0);

      /**
      * Message specific settings such as auto-erase, wait-at-end, etc.
      * @property settings
      * @type ui.MessageSettings
       */
      this.settings = new ui.MessageSettings();

      /**
      * All message paragraphs 
      * @property messages
      * @type Object[]
       */
      this.messages = [];

      /**
      * The text-renderer used to render the message text.
      * @property textRenderer
      * @type gs.Component_MessageTextRenderer
       */
      this.textRenderer = new gs.Component_MessageTextRenderer();

      /**
      * The UI object's animator-component to execute different kind of animations like move, rotate, etc. on it.
      * @property animator
      * @type gs.Component_Animator
       */
      this.animator = new gs.Animator();

      /**
      * The UI object's source rectangle on screen.
      * @property srcRect
      * @type gs.Rect
       */
      this.srcRect = new Rect(0, 0, 1, 1);
      this.message = new vn.Component_MessageBehavior();

      /**
      * The UI object's component to add message-specific behavior.
      * @property behavior
      * @type vn.Component_MessageBehavior
       */
      this.behavior = this.message;
      this.addComponent(this.animator);
      this.addComponent(this.textRenderer);
      this.addComponent(this.message);
    }


    /**
    * Restores the object from a data-bundle.
    *
    * @method restore
    * @param {Object} data - The data-bundle.
     */

    Object_Message.prototype.restore = function(data) {
      Object_Message.__super__.restore.call(this, data);
      this.font = new Font(data.font.name, data.font.size);
      this.font.restore(data.font);
      this.dstRect.width = data.width;
      return this.dstRect.height = data.height;
    };


    /**
    * Serializes the object into a data-bundle.
    *
    * @method toDataBundle
    * @return {Object} The data-bundle.
     */

    Object_Message.prototype.toDataBundle = function() {
      var bundle;
      bundle = Object_Message.__super__.toDataBundle.call(this);
      bundle.font = this.font.toDataBundle();
      bundle.width = this.dstRect.width;
      bundle.height = this.dstRect.height;
      return bundle;
    };

    return Object_Message;

  })(ui.Object_UIElement);

  ui.Object_Message = Object_Message;

}).call(this);