//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.90;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.90] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want to use it automatically.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 * 
 *   Convert JS To Base?:
 *   - Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *     parameters to prevent infinite loops.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.90: February 16, 2026
 * * Feature Update!
 * ** Battle System settings for "TPB Active" and "TPB Wait" will no longer
 *    conflict with VisuMZ_2_BattleSystemATB and VisuMZ_1_OptionsCore "Active"
 *    or "Wait" mode options set by the player.
 * 
 * Version 1.89: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.88: September 18, 2025
 * * Documentation Update!
 * ** Extra notes for <JS param Plus/Rate/Flat: code> notetags
 * *** Use 'user' to refer to the currently equipping actor.
 * *** If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 * *** Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 * *** Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 * *** Turn this off if you do not want it.
 * *** You are responsible for any infinite loops this may cause.
 * * Feature Update!
 * ** <JS param Plus/Rate/Flat: code> now support 'user' as a variable.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Parameters > Convert JS To Base?
 * **** Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *      parameters to prevent infinite loops.
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param ConvertToBase:eval
 * @text Convert JS To Base?
 * @parent BasicParameters
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc Automatically convert <JS param Plus/Rate/Flat: code>
 * to use base parameters to prevent infinite loops.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x45f0a9=_0x25ac;(function(_0x2a7f7b,_0x51943d){const _0x4f3a8d=_0x25ac,_0x3ec32a=_0x2a7f7b();while(!![]){try{const _0x280013=parseInt(_0x4f3a8d(0x642))/0x1+-parseInt(_0x4f3a8d(0x69b))/0x2+-parseInt(_0x4f3a8d(0x4e4))/0x3+-parseInt(_0x4f3a8d(0x25b))/0x4+-parseInt(_0x4f3a8d(0x753))/0x5+-parseInt(_0x4f3a8d(0x4f1))/0x6+-parseInt(_0x4f3a8d(0x253))/0x7*(-parseInt(_0x4f3a8d(0x8c4))/0x8);if(_0x280013===_0x51943d)break;else _0x3ec32a['push'](_0x3ec32a['shift']());}catch(_0x49f7f8){_0x3ec32a['push'](_0x3ec32a['shift']());}}}(_0x547f,0x34a9d));var label=_0x45f0a9(0x601),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x45f0a9(0x87c)](function(_0x5f0481){const _0x13c826=_0x45f0a9;return _0x5f0481[_0x13c826(0x618)]&&_0x5f0481[_0x13c826(0x41f)][_0x13c826(0x65f)]('['+label+']');})[0x0];VisuMZ[label][_0x45f0a9(0x5ba)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x47e5d0,_0x4425ae){const _0x5d5211=_0x45f0a9;for(const _0x3d43a1 in _0x4425ae){if(_0x3d43a1['match'](/(.*):(.*)/i)){const _0x44ce46=String(RegExp['$1']),_0x34e717=String(RegExp['$2'])[_0x5d5211(0x26d)]()[_0x5d5211(0x88c)]();let _0x197c1b,_0x1602ac,_0x2c1486;switch(_0x34e717){case _0x5d5211(0x247):_0x197c1b=_0x4425ae[_0x3d43a1]!==''?Number(_0x4425ae[_0x3d43a1]):0x0;break;case _0x5d5211(0x61f):_0x1602ac=_0x4425ae[_0x3d43a1]!==''?JSON[_0x5d5211(0x547)](_0x4425ae[_0x3d43a1]):[],_0x197c1b=_0x1602ac[_0x5d5211(0x1b4)](_0x2ae882=>Number(_0x2ae882));break;case _0x5d5211(0x2a6):_0x197c1b=_0x4425ae[_0x3d43a1]!==''?eval(_0x4425ae[_0x3d43a1]):null;break;case _0x5d5211(0x295):_0x1602ac=_0x4425ae[_0x3d43a1]!==''?JSON[_0x5d5211(0x547)](_0x4425ae[_0x3d43a1]):[],_0x197c1b=_0x1602ac[_0x5d5211(0x1b4)](_0x3975bf=>eval(_0x3975bf));break;case'JSON':_0x197c1b=_0x4425ae[_0x3d43a1]!==''?JSON[_0x5d5211(0x547)](_0x4425ae[_0x3d43a1]):'';break;case _0x5d5211(0x45c):_0x1602ac=_0x4425ae[_0x3d43a1]!==''?JSON[_0x5d5211(0x547)](_0x4425ae[_0x3d43a1]):[],_0x197c1b=_0x1602ac[_0x5d5211(0x1b4)](_0xa659c7=>JSON[_0x5d5211(0x547)](_0xa659c7));break;case _0x5d5211(0x6e6):_0x197c1b=_0x4425ae[_0x3d43a1]!==''?new Function(JSON['parse'](_0x4425ae[_0x3d43a1])):new Function('return\x200');break;case _0x5d5211(0x85e):_0x1602ac=_0x4425ae[_0x3d43a1]!==''?JSON[_0x5d5211(0x547)](_0x4425ae[_0x3d43a1]):[],_0x197c1b=_0x1602ac['map'](_0x297571=>new Function(JSON['parse'](_0x297571)));break;case'STR':_0x197c1b=_0x4425ae[_0x3d43a1]!==''?String(_0x4425ae[_0x3d43a1]):'';break;case _0x5d5211(0x3a5):_0x1602ac=_0x4425ae[_0x3d43a1]!==''?JSON[_0x5d5211(0x547)](_0x4425ae[_0x3d43a1]):[],_0x197c1b=_0x1602ac[_0x5d5211(0x1b4)](_0x20c677=>String(_0x20c677));break;case'STRUCT':_0x2c1486=_0x4425ae[_0x3d43a1]!==''?JSON[_0x5d5211(0x547)](_0x4425ae[_0x3d43a1]):{},_0x47e5d0[_0x44ce46]={},VisuMZ['ConvertParams'](_0x47e5d0[_0x44ce46],_0x2c1486);continue;case _0x5d5211(0x72f):_0x1602ac=_0x4425ae[_0x3d43a1]!==''?JSON['parse'](_0x4425ae[_0x3d43a1]):[],_0x197c1b=_0x1602ac['map'](_0x26a15a=>VisuMZ[_0x5d5211(0x754)]({},JSON[_0x5d5211(0x547)](_0x26a15a)));break;default:continue;}_0x47e5d0[_0x44ce46]=_0x197c1b;}}return _0x47e5d0;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x3bc)]=SceneManager[_0x45f0a9(0x34b)],SceneManager[_0x45f0a9(0x34b)]=function(){const _0x20bf3d=_0x45f0a9;VisuMZ[_0x20bf3d(0x601)][_0x20bf3d(0x3bc)]['call'](this);if(Utils[_0x20bf3d(0x4af)]>=_0x20bf3d(0x137)){if(typeof nw==='object')nw['App'][_0x20bf3d(0x148)]();}},(_0x49c67b=>{const _0x48b24e=_0x45f0a9,_0x4ea817=_0x49c67b[_0x48b24e(0x3d0)];for(const _0xf5bff6 of dependencies){if(!Imported[_0xf5bff6]){alert(_0x48b24e(0x48e)[_0x48b24e(0x525)](_0x4ea817,_0xf5bff6)),SceneManager['exit']();break;}}const _0x5c8e22=_0x49c67b[_0x48b24e(0x41f)];if(_0x5c8e22[_0x48b24e(0x2ee)](/\[Version[ ](.*?)\]/i)){const _0x275d62=Number(RegExp['$1']);_0x275d62!==VisuMZ[label][_0x48b24e(0x59b)]&&(alert(_0x48b24e(0x6d7)['format'](_0x4ea817,_0x275d62)),SceneManager[_0x48b24e(0x34b)]());}if(_0x5c8e22['match'](/\[Tier[ ](\d+)\]/i)){const _0x21a441=Number(RegExp['$1']);_0x21a441<tier?(alert(_0x48b24e(0x51f)[_0x48b24e(0x525)](_0x4ea817,_0x21a441,tier)),SceneManager[_0x48b24e(0x34b)]()):tier=Math[_0x48b24e(0x5dc)](_0x21a441,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x49c67b[_0x48b24e(0x16b)]);})(pluginData),((()=>{const _0x1c3f7c=_0x45f0a9;if(VisuMZ[_0x1c3f7c(0x601)][_0x1c3f7c(0x5ba)]['QoL']['SubfolderParse']??!![])for(const _0x1e42b3 in $plugins){const _0x594e92=$plugins[_0x1e42b3];_0x594e92['name']['match'](/(.*)\/(.*)/i)&&(_0x594e92[_0x1c3f7c(0x3d0)]=String(RegExp['$2']['trim']()));}})()),PluginManager[_0x45f0a9(0x733)](pluginData['name'],_0x45f0a9(0x5d3),_0x24f0b7=>{const _0x5b812f=_0x45f0a9;if(!SceneManager[_0x5b812f(0x4a0)])return;if(!SceneManager['_scene'][_0x5b812f(0x29e)])return;VisuMZ[_0x5b812f(0x754)](_0x24f0b7,_0x24f0b7);const _0x3eb7ee=Math['round'](_0x24f0b7[_0x5b812f(0x5e5)]),_0x4e3fc8=Math['round'](_0x24f0b7[_0x5b812f(0x524)]);$gameTemp[_0x5b812f(0x272)](_0x3eb7ee,_0x4e3fc8,_0x24f0b7['AnimationID'],_0x24f0b7[_0x5b812f(0x2f1)],_0x24f0b7[_0x5b812f(0x72a)]);}),PluginManager[_0x45f0a9(0x733)](pluginData['name'],_0x45f0a9(0x38f),_0x5235af=>{const _0x1f0a1a=_0x45f0a9;VisuMZ[_0x1f0a1a(0x754)](_0x5235af,_0x5235af);const _0x11c256=Math[_0x1f0a1a(0x640)](_0x5235af['volume'])[_0x1f0a1a(0x5b1)](0x0,0x64),_0x2add18=AudioManager[_0x1f0a1a(0x412)];_0x2add18&&(_0x2add18[_0x1f0a1a(0x804)]=_0x11c256,_0x2add18[_0x1f0a1a(0x7a7)]=AudioManager['_bgmBuffer'][_0x1f0a1a(0x508)](),AudioManager['updateBgmParameters'](_0x2add18),AudioManager[_0x1f0a1a(0x444)](_0x2add18,_0x2add18[_0x1f0a1a(0x7a7)]),AudioManager[_0x1f0a1a(0x238)]['_startPlaying'](_0x2add18['pos']));}),PluginManager['registerCommand'](pluginData[_0x45f0a9(0x3d0)],'AudioChangeBgmPitch',_0x393e1e=>{const _0x4a7ff7=_0x45f0a9;VisuMZ[_0x4a7ff7(0x754)](_0x393e1e,_0x393e1e);const _0x4c02d2=Math[_0x4a7ff7(0x640)](_0x393e1e['pitch'])[_0x4a7ff7(0x5b1)](0x32,0x96),_0x3a0d96=AudioManager[_0x4a7ff7(0x412)];_0x3a0d96&&(_0x3a0d96['pitch']=_0x4c02d2,_0x3a0d96[_0x4a7ff7(0x7a7)]=AudioManager[_0x4a7ff7(0x238)][_0x4a7ff7(0x508)](),AudioManager[_0x4a7ff7(0x2bb)](_0x3a0d96),AudioManager[_0x4a7ff7(0x444)](_0x3a0d96,_0x3a0d96['pos']),AudioManager[_0x4a7ff7(0x238)][_0x4a7ff7(0x57b)](_0x3a0d96[_0x4a7ff7(0x7a7)]));}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],'AudioChangeBgmPan',_0x4d8256=>{const _0x5a7d57=_0x45f0a9;VisuMZ['ConvertParams'](_0x4d8256,_0x4d8256);const _0x4b6ce5=Math[_0x5a7d57(0x640)](_0x4d8256[_0x5a7d57(0x5d7)])[_0x5a7d57(0x5b1)](-0x64,0x64),_0x5e2815=AudioManager[_0x5a7d57(0x412)];_0x5e2815&&(_0x5e2815[_0x5a7d57(0x5d7)]=_0x4b6ce5,_0x5e2815[_0x5a7d57(0x7a7)]=AudioManager[_0x5a7d57(0x238)][_0x5a7d57(0x508)](),AudioManager[_0x5a7d57(0x2bb)](_0x5e2815),AudioManager[_0x5a7d57(0x444)](_0x5e2815,_0x5e2815[_0x5a7d57(0x7a7)]),AudioManager[_0x5a7d57(0x238)][_0x5a7d57(0x57b)](_0x5e2815[_0x5a7d57(0x7a7)]));}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x685),_0x52e8f8=>{const _0x3b0b13=_0x45f0a9;VisuMZ[_0x3b0b13(0x754)](_0x52e8f8,_0x52e8f8);const _0x4c9e50=Math[_0x3b0b13(0x640)](_0x52e8f8['volume'])['clamp'](0x0,0x64),_0x582b8d=AudioManager['_currentBgs'];_0x582b8d&&(_0x582b8d[_0x3b0b13(0x804)]=_0x4c9e50,_0x582b8d[_0x3b0b13(0x7a7)]=AudioManager[_0x3b0b13(0x52a)][_0x3b0b13(0x508)](),AudioManager[_0x3b0b13(0x31d)](_0x582b8d),AudioManager['playBgs'](_0x582b8d,_0x582b8d[_0x3b0b13(0x7a7)]),AudioManager[_0x3b0b13(0x52a)][_0x3b0b13(0x57b)](_0x582b8d[_0x3b0b13(0x7a7)]));}),PluginManager['registerCommand'](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x67f),_0x590d98=>{const _0x5d30e5=_0x45f0a9;VisuMZ[_0x5d30e5(0x754)](_0x590d98,_0x590d98);const _0x16b074=Math['round'](_0x590d98['pitch'])[_0x5d30e5(0x5b1)](0x32,0x96),_0x539d3d=AudioManager[_0x5d30e5(0x6d6)];_0x539d3d&&(_0x539d3d['pitch']=_0x16b074,_0x539d3d['pos']=AudioManager[_0x5d30e5(0x52a)][_0x5d30e5(0x508)](),AudioManager[_0x5d30e5(0x31d)](_0x539d3d),AudioManager[_0x5d30e5(0x5bf)](_0x539d3d,_0x539d3d['pos']),AudioManager['_bgsBuffer']['_startPlaying'](_0x539d3d['pos']));}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x429),_0x466d61=>{const _0x492d79=_0x45f0a9;VisuMZ['ConvertParams'](_0x466d61,_0x466d61);const _0x53baf6=Math[_0x492d79(0x640)](_0x466d61['pan'])[_0x492d79(0x5b1)](-0x64,0x64),_0x30d4aa=AudioManager['_currentBgs'];_0x30d4aa&&(_0x30d4aa['pan']=_0x53baf6,_0x30d4aa['pos']=AudioManager['_bgsBuffer'][_0x492d79(0x508)](),AudioManager[_0x492d79(0x31d)](_0x30d4aa),AudioManager['playBgs'](_0x30d4aa,_0x30d4aa[_0x492d79(0x7a7)]),AudioManager[_0x492d79(0x52a)]['_startPlaying'](_0x30d4aa[_0x492d79(0x7a7)]));}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x3bf),_0x391021=>{const _0x1b3f3c=_0x45f0a9;if(!$gameTemp['isPlaytest']())return;const _0x55b96b=Input[_0x1b3f3c(0x455)]();console[_0x1b3f3c(0x4e0)](_0x55b96b);}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x17a),_0x50d50a=>{const _0x11c8db=_0x45f0a9;if(!$gameTemp[_0x11c8db(0x88e)]())return;if(!Utils[_0x11c8db(0x668)]())return;SceneManager['_scene'][_0x11c8db(0x682)]=![],VisuMZ[_0x11c8db(0x601)][_0x11c8db(0x326)]();}),PluginManager[_0x45f0a9(0x733)](pluginData['name'],_0x45f0a9(0x2af),_0x2279df=>{const _0x299967=_0x45f0a9;if(!$gameTemp[_0x299967(0x88e)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x299967(0x4a0)][_0x299967(0x682)]=![],VisuMZ[_0x299967(0x601)][_0x299967(0x6a5)]();}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x3a9),_0x3dfab3=>{const _0x3dab92=_0x45f0a9;if(!$gameTemp[_0x3dab92(0x88e)]())return;if(!Utils[_0x3dab92(0x668)]())return;if(!$gameMap)return;if($gameMap[_0x3dab92(0x15c)]()<=0x0)return;VisuMZ[_0x3dab92(0x754)](_0x3dfab3,_0x3dfab3);const _0x29cc54=_0x3dab92(0x842)[_0x3dab92(0x525)]($gameMap[_0x3dab92(0x15c)]()[_0x3dab92(0x24b)](0x3)),_0x385d8b=VisuMZ[_0x3dab92(0x601)][_0x3dab92(0x4f5)]($gameMap[_0x3dab92(0x15c)]());VisuMZ['CoreEngine']['ExportString'](_0x385d8b,_0x29cc54,!![]);}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x77a),_0x44b678=>{const _0x421131=_0x45f0a9;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameParty[_0x421131(0x6c9)]())return;VisuMZ['ConvertParams'](_0x44b678,_0x44b678);const _0x1ef01b=_0x421131(0x1fd)[_0x421131(0x525)]($gameTroop[_0x421131(0x86b)]['padZero'](0x4)),_0x46fc23=VisuMZ[_0x421131(0x601)]['ExtractStrFromTroop']($gameTroop['_troopId']);VisuMZ['CoreEngine']['ExportString'](_0x46fc23,_0x1ef01b,!![]);}),VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x76c)]=function(_0x3f3192,_0x5bf4a7,_0x4858c6){const _0x1502b0=_0x45f0a9,_0x25e488=require('fs');let _0x2dd9b6=_0x1502b0(0x639)['format'](_0x5bf4a7||'0');_0x25e488[_0x1502b0(0x812)](_0x2dd9b6,_0x3f3192,_0x352bed=>{const _0x44ba69=_0x1502b0;if(_0x352bed)throw err;else _0x4858c6&&alert(_0x44ba69(0x6a1)['format'](_0x2dd9b6));});},VisuMZ[_0x45f0a9(0x601)]['ExportStrFromAllMaps']=function(){const _0x11acc9=_0x45f0a9,_0x56aca8=[];for(const _0x2bd158 of $dataMapInfos){if(!_0x2bd158)continue;_0x56aca8[_0x11acc9(0x5f7)](_0x2bd158['id']);}const _0x2e5f09=_0x56aca8['length']*0x64+Math['randomInt'](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'['format'](_0x2e5f09)),this[_0x11acc9(0x616)]=[],this[_0x11acc9(0x7cf)]=$dataMap;for(const _0x7798a0 of _0x56aca8){VisuMZ[_0x11acc9(0x601)][_0x11acc9(0x171)](_0x7798a0);}setTimeout(VisuMZ[_0x11acc9(0x601)][_0x11acc9(0x2a0)][_0x11acc9(0x159)](this),_0x2e5f09);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x171)]=function(_0x53ef36){const _0x3c7047=_0x45f0a9,_0x189233=_0x3c7047(0x13c)[_0x3c7047(0x525)](_0x53ef36[_0x3c7047(0x24b)](0x3)),_0xb0390c=new XMLHttpRequest(),_0xb40863=_0x3c7047(0x8bb)+_0x189233;_0xb0390c[_0x3c7047(0x6d3)](_0x3c7047(0x42c),_0xb40863),_0xb0390c[_0x3c7047(0x625)](_0x3c7047(0x8e5)),_0xb0390c[_0x3c7047(0x1bf)]=()=>this[_0x3c7047(0x4eb)](_0xb0390c,_0x53ef36,_0x189233,_0xb40863),_0xb0390c[_0x3c7047(0x464)]=()=>DataManager[_0x3c7047(0x7b2)](_0x3c7047(0x6a7),_0x189233,_0xb40863),_0xb0390c[_0x3c7047(0x2de)]();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4eb)]=function(_0x4e752d,_0x2d6914,_0x5a6d50,_0x17edbc){const _0x363786=_0x45f0a9;$dataMap=JSON[_0x363786(0x547)](_0x4e752d[_0x363786(0x359)]),DataManager['onLoad']($dataMap),this['_storedMapText'][_0x2d6914]=VisuMZ[_0x363786(0x601)][_0x363786(0x4f5)](_0x2d6914),$dataMap=this[_0x363786(0x7cf)];},VisuMZ[_0x45f0a9(0x601)]['exportAllMapStrings']=function(){const _0x15328e=_0x45f0a9,_0x17339e='AllMaps';this[_0x15328e(0x616)][_0x15328e(0x354)](undefined)[_0x15328e(0x354)]('')[_0x15328e(0x354)](null);const _0xc23a9f=this['_storedMapText'][_0x15328e(0x335)]('\x0a\x0a\x0a\x0a\x0a')['trim']();VisuMZ[_0x15328e(0x601)]['ExportString'](_0xc23a9f,_0x17339e,!![]),SceneManager[_0x15328e(0x4a0)][_0x15328e(0x682)]=!![];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4f5)]=function(_0x190073){const _0x4c639f=_0x45f0a9;if(!$dataMap)return'';let _0x772246='█'[_0x4c639f(0x1eb)](0x46)+'\x0a\x0a',_0x51eb79='═'[_0x4c639f(0x1eb)](0x46)+'\x0a\x0a',_0x1a65bf='';this[_0x4c639f(0x887)]=0x0;for(const _0xca9f59 of $dataMap[_0x4c639f(0x45e)]){if(!_0xca9f59)continue;let _0x140fb1=_0xca9f59['id'],_0x560729=_0xca9f59[_0x4c639f(0x3d0)],_0x235bc0=_0xca9f59[_0x4c639f(0x881)];for(const _0x2b3c08 of _0x235bc0){const _0x57e9e3=_0x235bc0[_0x4c639f(0x71f)](_0x2b3c08)+0x1;let _0x2fef79=_0x51eb79+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x49ce16=VisuMZ['CoreEngine'][_0x4c639f(0x4d8)](_0x2b3c08[_0x4c639f(0x53d)]);if(_0x49ce16[_0x4c639f(0x2ad)]>0x0){if(_0x1a65bf[_0x4c639f(0x2ad)]>0x0)_0x1a65bf+=_0x51eb79+_0x4c639f(0x8af);else{const _0x7d9938=$dataMapInfos[_0x190073][_0x4c639f(0x3d0)];_0x1a65bf+=_0x772246+_0x4c639f(0x309)[_0x4c639f(0x525)](_0x190073,_0x7d9938||_0x4c639f(0x232))+_0x772246;}_0x1a65bf+=_0x2fef79[_0x4c639f(0x525)](_0x140fb1,_0x560729,_0x57e9e3,_0x49ce16);}}}return _0x1a65bf[_0x4c639f(0x2ad)]>0x0&&(_0x1a65bf+=_0x51eb79),_0x1a65bf;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x6a5)]=function(){const _0x4f7dd0=_0x45f0a9,_0x156979=$dataTroops[_0x4f7dd0(0x2ad)]*0xa+Math[_0x4f7dd0(0x54d)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x4f7dd0(0x525)](_0x156979));const _0x43dff4=[];for(const _0x5d2f8b of $dataTroops){if(!_0x5d2f8b)continue;const _0x19f2ac=_0x5d2f8b['id'];_0x43dff4[_0x19f2ac]=VisuMZ[_0x4f7dd0(0x601)][_0x4f7dd0(0x3d9)](_0x19f2ac);}setTimeout(VisuMZ[_0x4f7dd0(0x601)][_0x4f7dd0(0x3d5)][_0x4f7dd0(0x159)](this,_0x43dff4),_0x156979);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x3d9)]=function(_0x35d70b){const _0x25d06d=_0x45f0a9;if(!$dataTroops[_0x35d70b])return'';let _0x226e14='█'[_0x25d06d(0x1eb)](0x46)+'\x0a\x0a',_0x27eaee='═'['repeat'](0x46)+'\x0a\x0a',_0x322766='';this[_0x25d06d(0x887)]=0x0;const _0x3e60e9=$dataTroops[_0x35d70b];let _0x48bf06=_0x3e60e9[_0x25d06d(0x881)];for(const _0x122027 of _0x48bf06){const _0x3f1924=_0x48bf06[_0x25d06d(0x71f)](_0x122027)+0x1;let _0x562f66=_0x27eaee+_0x25d06d(0x435),_0x4ee1b1=VisuMZ[_0x25d06d(0x601)][_0x25d06d(0x4d8)](_0x122027[_0x25d06d(0x53d)]);_0x4ee1b1[_0x25d06d(0x2ad)]>0x0&&(_0x322766['length']>0x0?_0x322766+=_0x27eaee+_0x25d06d(0x8af):_0x322766+=_0x226e14+_0x25d06d(0x64e)[_0x25d06d(0x525)](_0x35d70b,_0x3e60e9[_0x25d06d(0x3d0)]||_0x25d06d(0x232))+_0x226e14,_0x322766+=_0x562f66[_0x25d06d(0x525)](_0x3f1924,_0x4ee1b1));}return _0x322766[_0x25d06d(0x2ad)]>0x0&&(_0x322766+=_0x27eaee),_0x322766;},VisuMZ[_0x45f0a9(0x601)]['exportAllTroopStrings']=function(_0x15b850){const _0x504901=_0x45f0a9,_0x451b2b=_0x504901(0x3b5);_0x15b850[_0x504901(0x354)](undefined)[_0x504901(0x354)]('')[_0x504901(0x354)](null);const _0x3a4f1e=_0x15b850[_0x504901(0x335)](_0x504901(0x8af))['trim']();VisuMZ['CoreEngine'][_0x504901(0x76c)](_0x3a4f1e,_0x451b2b,!![]),SceneManager['_scene'][_0x504901(0x682)]=!![];},VisuMZ[_0x45f0a9(0x601)]['ExtractStrFromList']=function(_0x53fb28){const _0xded05c=_0x45f0a9;let _0x231271='\x0a'+'─'[_0xded05c(0x1eb)](0x46)+'\x0a',_0x52e818='\x0a'+'┄'[_0xded05c(0x1eb)](0x46)+'\x0a',_0x5477c2='';for(const _0x29dbd1 of _0x53fb28){if(!_0x29dbd1)continue;if(_0x29dbd1[_0xded05c(0x134)]===0x65)_0x5477c2+=_0x231271+'\x0a',_0x5477c2+=_0xded05c(0x81d),_0x29dbd1[_0xded05c(0x16b)][0x4]!==''&&_0x29dbd1['parameters'][0x4]!==undefined&&(_0x5477c2+=_0xded05c(0x7d6)[_0xded05c(0x525)](_0x29dbd1[_0xded05c(0x16b)][0x4]));else{if(_0x29dbd1[_0xded05c(0x134)]===0x191)_0x5477c2+=_0xded05c(0x482)[_0xded05c(0x525)](_0x29dbd1[_0xded05c(0x16b)][0x0]);else{if(_0x29dbd1[_0xded05c(0x134)]===0x192)_0x5477c2+=_0x231271,_0x5477c2+=_0xded05c(0x1ef)[_0xded05c(0x525)](_0x52e818,_0x29dbd1['parameters'][0x0]+0x1,_0x29dbd1[_0xded05c(0x16b)][0x1]);else{if(_0x29dbd1[_0xded05c(0x134)]===0x193)_0x5477c2+=_0x231271,_0x5477c2+=_0xded05c(0x5ce)[_0xded05c(0x525)](_0x52e818);else{if(_0x29dbd1[_0xded05c(0x134)]===0x194)_0x5477c2+=_0x231271,_0x5477c2+=_0xded05c(0x36b)[_0xded05c(0x525)](_0x52e818);else{if(_0x29dbd1['code']===0x69)_0x5477c2+=_0x231271+'\x0a',_0x5477c2+=_0xded05c(0x4e7);else{if(_0x29dbd1[_0xded05c(0x134)]===0x6c)_0x5477c2+=_0x231271+'\x0a',_0x5477c2+=_0xded05c(0x666)[_0xded05c(0x525)](_0x29dbd1['parameters'][0x0]);else{if(_0x29dbd1[_0xded05c(0x134)]===0x198)_0x5477c2+=_0xded05c(0x482)[_0xded05c(0x525)](_0x29dbd1[_0xded05c(0x16b)][0x0]);else{if(_0x29dbd1[_0xded05c(0x134)]===0x75){const _0x549369=$dataCommonEvents[_0x29dbd1[_0xded05c(0x16b)][0x0]];if(_0x549369&&this[_0xded05c(0x887)]<=0xa){this['_commonEventLayers']++;let _0x355e4b=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x549369[_0xded05c(0x53d)]);_0x355e4b[_0xded05c(0x2ad)]>0x0&&(_0x5477c2+=_0x231271,_0x5477c2+=_0x52e818,_0x5477c2+=_0xded05c(0x75d)[_0xded05c(0x525)](_0x549369['id'],_0x549369['name']),_0x5477c2+=_0x52e818,_0x5477c2+=_0x355e4b,_0x5477c2+=_0x52e818,_0x5477c2+=_0xded05c(0x82a)[_0xded05c(0x525)](_0x549369['id'],_0x549369[_0xded05c(0x3d0)]),_0x5477c2+=_0x52e818),this[_0xded05c(0x887)]--;}}}}}}}}}}}return _0x5477c2[_0xded05c(0x2ad)]>0x0&&(_0x5477c2+=_0x231271),_0x5477c2;},PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x1ff),_0x48bec1=>{const _0x1579c6=_0x45f0a9;VisuMZ[_0x1579c6(0x754)](_0x48bec1,_0x48bec1);const _0x58fb5a=_0x48bec1[_0x1579c6(0x169)];VisuMZ[_0x1579c6(0x5f0)](_0x58fb5a);}),PluginManager[_0x45f0a9(0x733)](pluginData['name'],_0x45f0a9(0x1de),_0x3f1888=>{const _0x1ee404=_0x45f0a9;VisuMZ[_0x1ee404(0x754)](_0x3f1888,_0x3f1888);const _0x59c632=_0x3f1888[_0x1ee404(0x11e)]||0x0;$gameParty['gainGold'](_0x59c632);}),PluginManager[_0x45f0a9(0x733)](pluginData['name'],_0x45f0a9(0x277),_0x581b2a=>{const _0x248227=_0x45f0a9;if(!SceneManager[_0x248227(0x8fd)]())return;VisuMZ['ConvertParams'](_0x581b2a,_0x581b2a);const _0x413637=_0x581b2a['CommonEventID'];SceneManager[_0x248227(0x4a0)][_0x248227(0x775)](_0x413637);}),PluginManager['registerCommand'](pluginData[_0x45f0a9(0x3d0)],'PictureCoordinatesMode',_0x43e0e3=>{const _0x3f387e=_0x45f0a9;if(!$gameTemp[_0x3f387e(0x88e)]())return;if(!Utils[_0x3f387e(0x668)]())return;VisuMZ['ConvertParams'](_0x43e0e3,_0x43e0e3);const _0x50e6b0=_0x43e0e3[_0x3f387e(0x196)]||0x1;$gameTemp[_0x3f387e(0x77e)]=_0x50e6b0;}),PluginManager[_0x45f0a9(0x733)](pluginData['name'],_0x45f0a9(0x6ce),_0x2ae787=>{const _0x289022=_0x45f0a9;VisuMZ[_0x289022(0x754)](_0x2ae787,_0x2ae787);const _0x551577=_0x2ae787[_0x289022(0x365)]||0x1,_0x4ca841=_0x2ae787[_0x289022(0x765)]||'Linear',_0x181a5a=$gameScreen[_0x289022(0x14c)](_0x551577);_0x181a5a&&_0x181a5a[_0x289022(0x564)](_0x4ca841);}),PluginManager[_0x45f0a9(0x733)](pluginData['name'],'PictureEraseAll',_0x205372=>{const _0xbcc07c=_0x45f0a9;for(let _0x3a3200=0x1;_0x3a3200<=$gameScreen[_0xbcc07c(0x700)]();_0x3a3200++){$gameScreen['erasePicture'](_0x3a3200);}}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x2b7),_0x42b765=>{const _0x21a8b6=_0x45f0a9;VisuMZ['ConvertParams'](_0x42b765,_0x42b765);const _0x4a5278=Math[_0x21a8b6(0x3d3)](_0x42b765[_0x21a8b6(0x77c)],_0x42b765[_0x21a8b6(0x174)]),_0x30f952=Math['max'](_0x42b765[_0x21a8b6(0x77c)],_0x42b765[_0x21a8b6(0x174)]);for(let _0x3aaabb=_0x4a5278;_0x3aaabb<=_0x30f952;_0x3aaabb++){$gameScreen[_0x21a8b6(0x655)](_0x3aaabb);}}),PluginManager['registerCommand'](pluginData[_0x45f0a9(0x3d0)],'PictureRotateBy',_0x142f67=>{const _0x28a7c5=_0x45f0a9;VisuMZ[_0x28a7c5(0x754)](_0x142f67,_0x142f67);const _0x527772=Math[_0x28a7c5(0x640)](_0x142f67[_0x28a7c5(0x196)])[_0x28a7c5(0x5b1)](0x1,0x64),_0x23370a=-Number(_0x142f67[_0x28a7c5(0x4b4)]||0x0),_0xadf168=Math[_0x28a7c5(0x5dc)](_0x142f67[_0x28a7c5(0x11f)]||0x0,0x0),_0x5e024f=_0x142f67[_0x28a7c5(0x765)]||_0x28a7c5(0x7e6),_0x3f1692=_0x142f67['Wait'],_0x4430c0=$gameScreen[_0x28a7c5(0x14c)](_0x527772);if(!_0x4430c0)return;_0x4430c0[_0x28a7c5(0x577)](_0x23370a,_0xadf168,_0x5e024f);if(_0x3f1692){const _0x8e905=$gameTemp['getLastPluginCommandInterpreter']();if(_0x8e905)_0x8e905[_0x28a7c5(0x3cb)](_0xadf168);}}),PluginManager['registerCommand'](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x627),_0xa93676=>{const _0x5b632b=_0x45f0a9;VisuMZ['ConvertParams'](_0xa93676,_0xa93676);const _0x17e8ec=Math[_0x5b632b(0x640)](_0xa93676[_0x5b632b(0x196)])[_0x5b632b(0x5b1)](0x1,0x64),_0x41c1e3=-Number(_0xa93676[_0x5b632b(0x32a)]||0x0),_0x4e22f8=Math['max'](_0xa93676[_0x5b632b(0x11f)]||0x0,0x0),_0x1d2f2a=_0xa93676[_0x5b632b(0x765)]||_0x5b632b(0x7e6),_0x2300e4=_0xa93676[_0x5b632b(0x2fa)],_0x591866=$gameScreen[_0x5b632b(0x14c)](_0x17e8ec);if(!_0x591866)return;_0x591866[_0x5b632b(0x245)](_0x41c1e3,_0x4e22f8,_0x1d2f2a);if(_0x2300e4){const _0x5dc4e3=$gameTemp[_0x5b632b(0x534)]();if(_0x5dc4e3)_0x5dc4e3['wait'](_0x4e22f8);}}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],'PictureShowIcon',_0x3f010a=>{const _0x492682=_0x45f0a9;VisuMZ['ConvertParams'](_0x3f010a,_0x3f010a);const _0x3ce4f3=Math[_0x492682(0x640)](_0x3f010a['PictureID'])[_0x492682(0x5b1)](0x1,0x64),_0x1d9ae0=_0x3f010a[_0x492682(0x5ba)],_0x58b077=_0x1d9ae0[_0x492682(0x882)][_0x492682(0x5b1)](0x0,0x1),_0x18657b=Math[_0x492682(0x640)](_0x1d9ae0['PositionX']||0x0),_0x411927=Math[_0x492682(0x640)](_0x1d9ae0[_0x492682(0x513)]||0x0),_0x5a6c17=Math[_0x492682(0x640)](_0x1d9ae0['ScaleX']||0x0),_0x2e28e2=Math[_0x492682(0x640)](_0x1d9ae0[_0x492682(0x7b0)]||0x0),_0x42e1bb=Math[_0x492682(0x640)](_0x1d9ae0[_0x492682(0x57f)])[_0x492682(0x5b1)](0x0,0xff),_0x34aa87=_0x1d9ae0[_0x492682(0x65d)],_0x2e35ae=_0x492682(0x462),_0x247f2d=_0x3f010a[_0x492682(0x615)]?'Smooth':_0x492682(0x6e4),_0x5330ae=_0x2e35ae[_0x492682(0x525)](_0x3f010a[_0x492682(0x466)],_0x247f2d);$gameScreen['showPicture'](_0x3ce4f3,_0x5330ae,_0x58b077,_0x18657b,_0x411927,_0x5a6c17,_0x2e28e2,_0x42e1bb,_0x34aa87);}),PluginManager['registerCommand'](pluginData['name'],_0x45f0a9(0x338),_0x752003=>{const _0x3bf1fb=_0x45f0a9;VisuMZ[_0x3bf1fb(0x754)](_0x752003,_0x752003);const _0x5ba6ad=_0x752003[_0x3bf1fb(0x7a1)]||_0x3bf1fb(0x779),_0x171064=_0x752003[_0x3bf1fb(0x838)][_0x3bf1fb(0x5b1)](0x1,0x9),_0x32dd6a=_0x752003['Speed']['clamp'](0x1,0x9),_0x5da51a=_0x752003[_0x3bf1fb(0x11f)]||0x1,_0x3e1eca=_0x752003[_0x3bf1fb(0x2fa)];$gameScreen[_0x3bf1fb(0x255)](_0x5ba6ad),$gameScreen['startShake'](_0x171064,_0x32dd6a,_0x5da51a);if(_0x3e1eca){const _0x3961be=$gameTemp[_0x3bf1fb(0x534)]();if(_0x3961be)_0x3961be[_0x3bf1fb(0x3cb)](_0x5da51a);}}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x877),_0xc6839c=>{const _0x18a4b6=_0x45f0a9;if($gameParty['inBattle']())return;VisuMZ[_0x18a4b6(0x754)](_0xc6839c,_0xc6839c);const _0x449ddd=_0xc6839c[_0x18a4b6(0x821)],_0x51c5aa=(_0xc6839c[_0x18a4b6(0x36e)]||0x0)/0x64;for(const _0x25361b of _0x449ddd){const _0x474aba=Math[_0x18a4b6(0x779)]()<=_0x51c5aa;$gameSwitches[_0x18a4b6(0x1d0)](_0x25361b,_0x474aba);}}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x7c1),_0x417237=>{const _0x5ac665=_0x45f0a9;if($gameParty['inBattle']())return;VisuMZ[_0x5ac665(0x754)](_0x417237,_0x417237);const _0x201f99=Math[_0x5ac665(0x3d3)](_0x417237[_0x5ac665(0x77c)],_0x417237[_0x5ac665(0x174)]),_0x18d9e0=Math[_0x5ac665(0x5dc)](_0x417237[_0x5ac665(0x77c)],_0x417237['EndingID']),_0x1785a0=(_0x417237[_0x5ac665(0x36e)]||0x0)/0x64;for(let _0x19a5c1=_0x201f99;_0x19a5c1<=_0x18d9e0;_0x19a5c1++){const _0x2d1642=Math[_0x5ac665(0x779)]()<=_0x1785a0;$gameSwitches['setValue'](_0x19a5c1,_0x2d1642);}}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],'SwitchToggleOne',_0x52a202=>{const _0x5627a4=_0x45f0a9;if($gameParty[_0x5627a4(0x6c9)]())return;VisuMZ['ConvertParams'](_0x52a202,_0x52a202);const _0x56bace=_0x52a202[_0x5627a4(0x821)];for(const _0x3851b7 of _0x56bace){const _0x48dfe4=$gameSwitches[_0x5627a4(0x11e)](_0x3851b7);$gameSwitches['setValue'](_0x3851b7,!_0x48dfe4);}}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x43b),_0x5b5054=>{const _0x7259b5=_0x45f0a9;if($gameParty[_0x7259b5(0x6c9)]())return;VisuMZ[_0x7259b5(0x754)](_0x5b5054,_0x5b5054);const _0x53611f=Math['min'](_0x5b5054['StartID'],_0x5b5054[_0x7259b5(0x174)]),_0x3be084=Math['max'](_0x5b5054[_0x7259b5(0x77c)],_0x5b5054[_0x7259b5(0x174)]);for(let _0x11316c=_0x53611f;_0x11316c<=_0x3be084;_0x11316c++){const _0x2ac6ff=$gameSwitches['value'](_0x11316c);$gameSwitches['setValue'](_0x11316c,!_0x2ac6ff);}}),PluginManager[_0x45f0a9(0x733)](pluginData['name'],'SystemSetFontSize',_0x5c469e=>{const _0x19d885=_0x45f0a9;VisuMZ[_0x19d885(0x754)](_0x5c469e,_0x5c469e);const _0x1631ca=_0x5c469e[_0x19d885(0x681)]||0x1;$gameSystem['setMainFontSize'](_0x1631ca);}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],'SystemSetSideView',_0x17de21=>{const _0x2d02f1=_0x45f0a9;if($gameParty[_0x2d02f1(0x6c9)]())return;VisuMZ['ConvertParams'](_0x17de21,_0x17de21);const _0x17e8c8=_0x17de21[_0x2d02f1(0x681)];if(_0x17e8c8[_0x2d02f1(0x2ee)](/Front/i))$gameSystem[_0x2d02f1(0x3f6)](![]);else _0x17e8c8[_0x2d02f1(0x2ee)](/Side/i)?$gameSystem[_0x2d02f1(0x3f6)](!![]):$gameSystem[_0x2d02f1(0x3f6)](!$gameSystem[_0x2d02f1(0x2a4)]());}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x318),_0x1f2a2d=>{const _0xa5d7ae=_0x45f0a9;if($gameParty[_0xa5d7ae(0x6c9)]())return;VisuMZ['ConvertParams'](_0x1f2a2d,_0x1f2a2d);const _0xe338e4=[_0xa5d7ae(0x556),_0xa5d7ae(0x74e),'me','se'];for(const _0x44b54e of _0xe338e4){const _0x5b2716=_0x1f2a2d[_0x44b54e],_0x45a737=_0xa5d7ae(0x288)[_0xa5d7ae(0x525)](_0x44b54e);for(const _0x284916 of _0x5b2716){AudioManager['createBuffer'](_0x45a737,_0x284916);}}}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x8c1),_0x2a611c=>{const _0x18bb6f=_0x45f0a9;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x2a611c,_0x2a611c);const _0x39eca3=[_0x18bb6f(0x320),_0x18bb6f(0x334),_0x18bb6f(0x13f),_0x18bb6f(0x1a2),_0x18bb6f(0x657),_0x18bb6f(0x64d),_0x18bb6f(0x8e1),'pictures','sv_actors',_0x18bb6f(0x2bd),_0x18bb6f(0x723),_0x18bb6f(0x48a),_0x18bb6f(0x6bb),'titles2'];for(const _0x5c1e8c of _0x39eca3){const _0x5bfd64=_0x2a611c[_0x5c1e8c],_0x616cba=_0x18bb6f(0x730)['format'](_0x5c1e8c);for(const _0x2ed20f of _0x5bfd64){ImageManager['loadBitmap'](_0x616cba,_0x2ed20f);}}}),PluginManager['registerCommand'](pluginData['name'],'SystemSetBattleSystem',_0x182924=>{const _0x476fd6=_0x45f0a9;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x182924,_0x182924);const _0x335237=_0x182924[_0x476fd6(0x681)]['toUpperCase']()[_0x476fd6(0x88c)](),_0x4bd173=VisuMZ[_0x476fd6(0x601)][_0x476fd6(0x78c)](_0x335237);$gameSystem[_0x476fd6(0x8bf)](_0x4bd173);}),VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x78c)]=function(_0x3e9b02){const _0x32a9cd=_0x45f0a9;_0x3e9b02=_0x3e9b02||_0x32a9cd(0x617),_0x3e9b02=String(_0x3e9b02)[_0x32a9cd(0x26d)]()['trim']();switch(_0x3e9b02){case _0x32a9cd(0x1ae):return 0x0;case _0x32a9cd(0x1be):return 0x1;case _0x32a9cd(0x4fa):return 0x2;case _0x32a9cd(0x8b8):if(Imported[_0x32a9cd(0x15e)])return _0x32a9cd(0x8b8);break;case _0x32a9cd(0x164):if(Imported[_0x32a9cd(0x8f5)])return _0x32a9cd(0x164);break;case _0x32a9cd(0x41e):if(Imported[_0x32a9cd(0x836)])return'BTB';break;case'FTB':if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x32a9cd(0x175);break;case _0x32a9cd(0x43e):if(Imported[_0x32a9cd(0x1f5)])return _0x32a9cd(0x43e);break;case _0x32a9cd(0x545):if(Imported[_0x32a9cd(0x68e)])return'ETB';break;case _0x32a9cd(0x194):if(Imported['VisuMZ_2_BattleSystemPTB'])return _0x32a9cd(0x194);break;}return $dataSystem[_0x32a9cd(0x5b5)];},PluginManager['registerCommand'](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x457),_0x2afce1=>{const _0x5cf8e9=_0x45f0a9;VisuMZ[_0x5cf8e9(0x754)](_0x2afce1,_0x2afce1);const _0x172f6b=_0x2afce1['option']||0x1;$gameSystem['setWindowPadding'](_0x172f6b);}),PluginManager[_0x45f0a9(0x733)](pluginData['name'],_0x45f0a9(0x526),_0x43ce4b=>{const _0x1a5686=_0x45f0a9;VisuMZ['ConvertParams'](_0x43ce4b,_0x43ce4b);const _0x23384f=_0x43ce4b[_0x1a5686(0x27e)]||'';$textPopup(_0x23384f);}),PluginManager[_0x45f0a9(0x733)](pluginData[_0x45f0a9(0x3d0)],_0x45f0a9(0x4dc),_0x31e48e=>{const _0x4affaf=_0x45f0a9;VisuMZ[_0x4affaf(0x754)](_0x31e48e,_0x31e48e);const _0x4d333a=_0x31e48e['id']||0x1,_0x22e63c=_0x31e48e[_0x4affaf(0x7b6)],_0x238aef=_0x31e48e[_0x4affaf(0x716)]||0x0;let _0x19c48b=$gameVariables[_0x4affaf(0x11e)](_0x4d333a)||0x0;switch(_0x22e63c){case'=':_0x19c48b=_0x238aef;break;case'+':_0x19c48b+=_0x238aef;break;case'-':_0x19c48b-=_0x238aef;break;case'*':_0x19c48b*=_0x238aef;break;case'/':_0x19c48b/=_0x238aef;break;case'%':_0x19c48b%=_0x238aef;break;}_0x19c48b=_0x19c48b||0x0,$gameVariables[_0x4affaf(0x1d0)](_0x4d333a,_0x19c48b);}),PluginManager[_0x45f0a9(0x733)](pluginData['name'],'VariableJsBlock',_0x525ae9=>{const _0x3507e8=_0x45f0a9;VisuMZ['ConvertParams'](_0x525ae9,_0x525ae9);const _0x4cab5c=_0x525ae9['id']()||0x1,_0x256c14=_0x525ae9[_0x3507e8(0x7b6)],_0xc25394=_0x525ae9[_0x3507e8(0x716)]()||0x0;let _0xd50bb8=$gameVariables[_0x3507e8(0x11e)](_0x4cab5c)||0x0;switch(_0x256c14){case'=':_0xd50bb8=_0xc25394;break;case'+':_0xd50bb8+=_0xc25394;break;case'-':_0xd50bb8-=_0xc25394;break;case'*':_0xd50bb8*=_0xc25394;break;case'/':_0xd50bb8/=_0xc25394;break;case'%':_0xd50bb8%=_0xc25394;break;}_0xd50bb8=_0xd50bb8||0x0,$gameVariables[_0x3507e8(0x1d0)](_0x4cab5c,_0xd50bb8);}),VisuMZ['CoreEngine']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x45f0a9(0x7bc)]['onDatabaseLoaded'],Scene_Boot[_0x45f0a9(0x7bc)]['onDatabaseLoaded']=function(){const _0x21d8a3=_0x45f0a9;VisuMZ[_0x21d8a3(0x601)][_0x21d8a3(0x74a)]['call'](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x21d8a3(0x60e)](),this[_0x21d8a3(0x57c)](),this[_0x21d8a3(0x1f2)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x21d8a3(0x17d)](),VisuMZ[_0x21d8a3(0x350)]();},VisuMZ['CoreEngine'][_0x45f0a9(0x268)]={},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x4cc542=_0x45f0a9,_0x4690b6=[_0x4cc542(0x8cf),_0x4cc542(0x300),_0x4cc542(0x5cc),_0x4cc542(0x2cc),'MAT',_0x4cc542(0x2da),_0x4cc542(0x356),_0x4cc542(0x265)],_0x592505=[_0x4cc542(0x51c),_0x4cc542(0x1bc),_0x4cc542(0x78e),_0x4cc542(0x328),'MEV','MRF',_0x4cc542(0x83a),_0x4cc542(0x6ab),_0x4cc542(0x7ea),_0x4cc542(0x81e)],_0x2f9aa3=[_0x4cc542(0x7ab),_0x4cc542(0x598),_0x4cc542(0x274),'PHA','MCR',_0x4cc542(0x3b8),_0x4cc542(0x313),_0x4cc542(0x49b),_0x4cc542(0x29c),_0x4cc542(0x71c)],_0x5d8a2e=[_0x4690b6,_0x592505,_0x2f9aa3],_0x33f965=['Plus',_0x4cc542(0x52f),_0x4cc542(0x2a8),_0x4cc542(0x869),_0x4cc542(0x213),'Rate1',_0x4cc542(0x220),_0x4cc542(0x879),_0x4cc542(0x4aa),_0x4cc542(0x8b1)];for(const _0x5b4f68 of _0x5d8a2e){let _0x5196d4='';if(_0x5b4f68===_0x4690b6)_0x5196d4=_0x4cc542(0x1a7);if(_0x5b4f68===_0x592505)_0x5196d4=_0x4cc542(0x138);if(_0x5b4f68===_0x2f9aa3)_0x5196d4=_0x4cc542(0x863);for(const _0x56ba7b of _0x33f965){let _0x589f98='%1%2'['format'](_0x5196d4,_0x56ba7b);VisuMZ['CoreEngine'][_0x4cc542(0x268)][_0x589f98]=[],VisuMZ[_0x4cc542(0x601)]['RegExp'][_0x589f98+'JS']=[];let _0xdf4ce4=_0x4cc542(0x1af);if([_0x4cc542(0x218),_0x4cc542(0x879)]['includes'](_0x56ba7b))_0xdf4ce4+=_0x4cc542(0x293);else{if([_0x4cc542(0x52f),_0x4cc542(0x4aa)][_0x4cc542(0x65f)](_0x56ba7b))_0xdf4ce4+=_0x4cc542(0x595);else{if([_0x4cc542(0x2a8),'Flat2'][_0x4cc542(0x65f)](_0x56ba7b))_0xdf4ce4+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x56ba7b==='Max')_0xdf4ce4+=_0x4cc542(0x50e);else{if(_0x56ba7b===_0x4cc542(0x4a3))_0xdf4ce4+=_0x4cc542(0x264);else _0x56ba7b===_0x4cc542(0x220)&&(_0xdf4ce4+=_0x4cc542(0x5ef));}}}}for(const _0x2003db of _0x5b4f68){let _0x169c30=_0x56ba7b[_0x4cc542(0x5a2)](/[\d+]/g,'')[_0x4cc542(0x26d)]();const _0x3eab02=_0xdf4ce4[_0x4cc542(0x525)](_0x2003db,_0x169c30);VisuMZ['CoreEngine'][_0x4cc542(0x268)][_0x589f98][_0x4cc542(0x5f7)](new RegExp(_0x3eab02,'i'));const _0x4f937a='<JS\x20%1\x20%2:[\x20](.*)>'[_0x4cc542(0x525)](_0x2003db,_0x169c30);VisuMZ[_0x4cc542(0x601)][_0x4cc542(0x268)][_0x589f98+'JS'][_0x4cc542(0x5f7)](new RegExp(_0x4f937a,'i'));}}}},Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x60e)]=function(){const _0x482b25=_0x45f0a9;if(VisuMZ[_0x482b25(0x350)])return;},Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x57c)]=function(){const _0x296c58=_0x45f0a9,_0x4f23ad=VisuMZ[_0x296c58(0x601)][_0x296c58(0x5ba)];_0x4f23ad[_0x296c58(0x8f1)][_0x296c58(0x79d)]&&VisuMZ[_0x296c58(0x1df)](!![]);_0x4f23ad[_0x296c58(0x8f1)][_0x296c58(0x6fd)]&&(Input[_0x296c58(0x399)][0x23]=_0x296c58(0x783),Input[_0x296c58(0x399)][0x24]=_0x296c58(0x3eb));if(_0x4f23ad['ButtonAssist']){const _0x47586b=_0x4f23ad[_0x296c58(0x554)];_0x47586b[_0x296c58(0x5dd)]=_0x47586b[_0x296c58(0x5dd)]||_0x296c58(0x3b2),_0x47586b['KeyTAB']=_0x47586b[_0x296c58(0x273)]||_0x296c58(0x878);}_0x4f23ad[_0x296c58(0x395)][_0x296c58(0x4ee)]&&(Input[_0x296c58(0x399)][0x57]='up',Input['keyMapper'][0x41]=_0x296c58(0x902),Input[_0x296c58(0x399)][0x53]='down',Input[_0x296c58(0x399)][0x44]='right',Input[_0x296c58(0x399)][0x45]=_0x296c58(0x8ef)),_0x4f23ad['KeyboardInput'][_0x296c58(0x66e)]&&(Input[_0x296c58(0x399)][0x52]=_0x296c58(0x68d)),_0x4f23ad[_0x296c58(0x6ca)][_0x296c58(0x3c0)]=_0x4f23ad[_0x296c58(0x6ca)][_0x296c58(0x3c0)][_0x296c58(0x1b4)](_0x3cb1a4=>_0x3cb1a4[_0x296c58(0x26d)]()[_0x296c58(0x88c)]()),_0x4f23ad[_0x296c58(0x6ca)]['ExtDisplayedParams']=_0x4f23ad['Param']['ExtDisplayedParams'][_0x296c58(0x1b4)](_0x3d2cd6=>_0x3d2cd6[_0x296c58(0x26d)]()[_0x296c58(0x88c)]()),_0x4f23ad[_0x296c58(0x8f1)][_0x296c58(0x1b6)]=_0x4f23ad['QoL'][_0x296c58(0x1b6)]??!![],_0x4f23ad['QoL'][_0x296c58(0x158)]=_0x4f23ad[_0x296c58(0x8f1)][_0x296c58(0x158)]??!![],_0x4f23ad[_0x296c58(0x554)][_0x296c58(0x8ad)]&&VisuMZ[_0x296c58(0x601)][_0x296c58(0x170)]();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x170)]=function(){const _0x412031=_0x45f0a9;let _0x4b6094=![],_0xf7877c=![];for(let _0x3df230 in Input['keyMapper']){const _0x12866c=Input[_0x412031(0x399)][_0x3df230];if(_0x12866c===_0x412031(0x442))_0x4b6094=!![];if(_0x12866c===_0x412031(0x844))_0xf7877c=!![];if(_0x4b6094&&_0xf7877c)return;}let _0x377f68=_0x412031(0x61e);_0x377f68+=_0x412031(0x424),_0x377f68+=_0x412031(0x2dd),_0x377f68+=_0x412031(0x3a2),_0x377f68+=_0x412031(0x770),alert(_0x377f68),SceneManager[_0x412031(0x34b)]();},Scene_Boot[_0x45f0a9(0x7bc)]['process_VisuMZ_CoreEngine_Functions']=function(){const _0x42a684=_0x45f0a9;this[_0x42a684(0x468)]();},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x55cf1c=_0x45f0a9,_0x126b09=VisuMZ['CoreEngine'][_0x55cf1c(0x5ba)][_0x55cf1c(0x67b)];for(const _0x44091b of _0x126b09){const _0x1fa9cc=_0x44091b[_0x55cf1c(0x87e)][_0x55cf1c(0x5a2)](/[ ]/g,''),_0x190344=_0x44091b[_0x55cf1c(0x357)];VisuMZ[_0x55cf1c(0x601)]['createJsQuickFunction'](_0x1fa9cc,_0x190344);}},VisuMZ[_0x45f0a9(0x601)]['createJsQuickFunction']=function(_0x5beceb,_0x1e3694){const _0x2dace3=_0x45f0a9;if(!!window[_0x5beceb]){if($gameTemp[_0x2dace3(0x88e)]())console[_0x2dace3(0x4e0)](_0x2dace3(0x369)[_0x2dace3(0x525)](_0x5beceb));}const _0x56da09='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x2dace3(0x525)](_0x5beceb,_0x1e3694);window[_0x5beceb]=new Function(_0x56da09);},Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x406)]=function(){const _0x20803b=_0x45f0a9,_0xb14bfc=VisuMZ[_0x20803b(0x601)][_0x20803b(0x5ba)][_0x20803b(0x66b)];if(!_0xb14bfc)return;for(const _0x2256f2 of _0xb14bfc){if(!_0x2256f2)continue;VisuMZ[_0x20803b(0x601)][_0x20803b(0x451)](_0x2256f2);}},VisuMZ['CoreEngine'][_0x45f0a9(0x626)]={},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x84a)]={},VisuMZ['CoreEngine'][_0x45f0a9(0x8ea)]={},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x401)]={},VisuMZ['CoreEngine'][_0x45f0a9(0x451)]=function(_0xbc72e6){const _0x358fd5=_0x45f0a9,_0x170c50=_0xbc72e6[_0x358fd5(0x30f)],_0x489da3=_0xbc72e6[_0x358fd5(0x77b)],_0x86a1a5=_0xbc72e6[_0x358fd5(0x8a4)],_0x4c32c1=_0xbc72e6[_0x358fd5(0x7a1)],_0x3f1a4d=new Function(_0xbc72e6['ValueJS']);VisuMZ[_0x358fd5(0x601)][_0x358fd5(0x626)][_0x170c50['toUpperCase']()[_0x358fd5(0x88c)]()]=_0x489da3,VisuMZ[_0x358fd5(0x601)][_0x358fd5(0x84a)][_0x170c50[_0x358fd5(0x26d)]()['trim']()]=_0x86a1a5,VisuMZ[_0x358fd5(0x601)][_0x358fd5(0x8ea)][_0x170c50[_0x358fd5(0x26d)]()[_0x358fd5(0x88c)]()]=_0x4c32c1,VisuMZ['CoreEngine']['CustomParamAbb'][_0x170c50[_0x358fd5(0x26d)]()[_0x358fd5(0x88c)]()]=_0x170c50,Object[_0x358fd5(0x81c)](Game_BattlerBase['prototype'],_0x170c50,{'get'(){const _0x4a1dea=_0x358fd5,_0x2628ba=_0x3f1a4d[_0x4a1dea(0x573)](this);return _0x4c32c1===_0x4a1dea(0x8f2)?Math[_0x4a1dea(0x640)](_0x2628ba):_0x2628ba;}});},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x267)]={},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x13b)]={},Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x17d)]=function(){const _0x251c47=_0x45f0a9,_0x37e0e8=VisuMZ[_0x251c47(0x601)][_0x251c47(0x5ba)][_0x251c47(0x267)];for(const _0x5ccbb5 of _0x37e0e8){const _0x490be0=(_0x5ccbb5[_0x251c47(0x7e8)]||'')[_0x251c47(0x709)]()[_0x251c47(0x88c)](),_0x467a9f=(_0x5ccbb5['Match']||'')[_0x251c47(0x709)]()[_0x251c47(0x88c)]();VisuMZ[_0x251c47(0x601)][_0x251c47(0x267)][_0x490be0]=_0x5ccbb5,VisuMZ['CoreEngine'][_0x251c47(0x13b)][_0x467a9f]=_0x490be0;}},VisuMZ[_0x45f0a9(0x350)]=function(){const _0x139e38=_0x45f0a9;for(const _0x20e0bb of $dataActors){if(_0x20e0bb)VisuMZ['ParseActorNotetags'](_0x20e0bb);}for(const _0x5d2955 of $dataClasses){if(_0x5d2955)VisuMZ[_0x139e38(0x7b3)](_0x5d2955);}for(const _0x1d6b3a of $dataSkills){if(_0x1d6b3a)VisuMZ[_0x139e38(0x52b)](_0x1d6b3a);}for(const _0x5f18d0 of $dataItems){if(_0x5f18d0)VisuMZ[_0x139e38(0x37e)](_0x5f18d0);}for(const _0x1388c1 of $dataWeapons){if(_0x1388c1)VisuMZ[_0x139e38(0x199)](_0x1388c1);}for(const _0x5b2e33 of $dataArmors){if(_0x5b2e33)VisuMZ[_0x139e38(0x43f)](_0x5b2e33);}for(const _0x4a3a54 of $dataEnemies){if(_0x4a3a54)VisuMZ[_0x139e38(0x4e5)](_0x4a3a54);}for(const _0x4fd444 of $dataStates){if(_0x4fd444)VisuMZ[_0x139e38(0x14d)](_0x4fd444);}for(const _0x58364c of $dataTilesets){if(_0x58364c)VisuMZ['ParseTilesetNotetags'](_0x58364c);}},VisuMZ[_0x45f0a9(0x391)]=function(_0x107fe4){},VisuMZ[_0x45f0a9(0x7b3)]=function(_0x4834a2){},VisuMZ['ParseSkillNotetags']=function(_0x39655d){},VisuMZ[_0x45f0a9(0x37e)]=function(_0x429f4b){},VisuMZ[_0x45f0a9(0x199)]=function(_0x9e469){},VisuMZ[_0x45f0a9(0x43f)]=function(_0x13a658){},VisuMZ[_0x45f0a9(0x4e5)]=function(_0xb5897f){},VisuMZ[_0x45f0a9(0x14d)]=function(_0x220727){},VisuMZ[_0x45f0a9(0x25c)]=function(_0x4de773){},VisuMZ[_0x45f0a9(0x601)]['ParseActorNotetags']=VisuMZ[_0x45f0a9(0x391)],VisuMZ[_0x45f0a9(0x391)]=function(_0x56506e){const _0x21c2bc=_0x45f0a9;VisuMZ[_0x21c2bc(0x601)][_0x21c2bc(0x391)][_0x21c2bc(0x573)](this,_0x56506e);const _0x57c733=_0x56506e['note'];if(_0x57c733[_0x21c2bc(0x2ee)](/<MAX LEVEL:[ ](\d+)>/i)){_0x56506e[_0x21c2bc(0x8ed)]=Number(RegExp['$1']);if(_0x56506e[_0x21c2bc(0x8ed)]===0x0)_0x56506e['maxLevel']=Number[_0x21c2bc(0x6ea)];}_0x57c733['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x56506e['initialLevel']=Math[_0x21c2bc(0x3d3)](Number(RegExp['$1']),_0x56506e['maxLevel']));},VisuMZ['CoreEngine'][_0x45f0a9(0x7b3)]=VisuMZ[_0x45f0a9(0x7b3)],VisuMZ[_0x45f0a9(0x7b3)]=function(_0x174b67){const _0x528a72=_0x45f0a9;VisuMZ[_0x528a72(0x601)][_0x528a72(0x7b3)][_0x528a72(0x573)](this,_0x174b67);if(_0x174b67['learnings'])for(const _0xf3e041 of _0x174b67[_0x528a72(0x841)]){_0xf3e041[_0x528a72(0x483)][_0x528a72(0x2ee)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0xf3e041[_0x528a72(0x74f)]=Math[_0x528a72(0x5dc)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4e5)]=VisuMZ[_0x45f0a9(0x4e5)],VisuMZ[_0x45f0a9(0x4e5)]=function(_0x542664){const _0x24d3b3=_0x45f0a9;VisuMZ[_0x24d3b3(0x601)][_0x24d3b3(0x4e5)]['call'](this,_0x542664),_0x542664[_0x24d3b3(0x74f)]=0x1;const _0x38cd9b=_0x542664[_0x24d3b3(0x483)];if(_0x38cd9b['match'](/<LEVEL:[ ](\d+)>/i))_0x542664['level']=Number(RegExp['$1']);if(_0x38cd9b[_0x24d3b3(0x2ee)](/<MAXHP:[ ](\d+)>/i))_0x542664[_0x24d3b3(0x5a5)][0x0]=Number(RegExp['$1']);if(_0x38cd9b[_0x24d3b3(0x2ee)](/<MAXMP:[ ](\d+)>/i))_0x542664[_0x24d3b3(0x5a5)][0x1]=Number(RegExp['$1']);if(_0x38cd9b['match'](/<ATK:[ ](\d+)>/i))_0x542664[_0x24d3b3(0x5a5)][0x2]=Number(RegExp['$1']);if(_0x38cd9b['match'](/<DEF:[ ](\d+)>/i))_0x542664[_0x24d3b3(0x5a5)][0x3]=Number(RegExp['$1']);if(_0x38cd9b[_0x24d3b3(0x2ee)](/<MAT:[ ](\d+)>/i))_0x542664[_0x24d3b3(0x5a5)][0x4]=Number(RegExp['$1']);if(_0x38cd9b[_0x24d3b3(0x2ee)](/<MDF:[ ](\d+)>/i))_0x542664[_0x24d3b3(0x5a5)][0x5]=Number(RegExp['$1']);if(_0x38cd9b[_0x24d3b3(0x2ee)](/<AGI:[ ](\d+)>/i))_0x542664[_0x24d3b3(0x5a5)][0x6]=Number(RegExp['$1']);if(_0x38cd9b[_0x24d3b3(0x2ee)](/<LUK:[ ](\d+)>/i))_0x542664[_0x24d3b3(0x5a5)][0x7]=Number(RegExp['$1']);if(_0x38cd9b[_0x24d3b3(0x2ee)](/<EXP:[ ](\d+)>/i))_0x542664[_0x24d3b3(0x20f)]=Number(RegExp['$1']);if(_0x38cd9b[_0x24d3b3(0x2ee)](/<GOLD:[ ](\d+)>/i))_0x542664[_0x24d3b3(0x461)]=Number(RegExp['$1']);},VisuMZ[_0x45f0a9(0x601)]['Graphics_defaultStretchMode']=Graphics['_defaultStretchMode'],Graphics[_0x45f0a9(0x38d)]=function(){const _0x16b2d0=_0x45f0a9;switch(VisuMZ[_0x16b2d0(0x601)]['Settings'][_0x16b2d0(0x8f1)]['AutoStretch']){case _0x16b2d0(0x509):return!![];case'normal':return![];default:return VisuMZ['CoreEngine'][_0x16b2d0(0x212)]['call'](this);}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x6cd)]=Graphics[_0x45f0a9(0x40c)],Graphics['printError']=function(_0x30973a,_0x17ee73,_0x4a2fe9=null){const _0x1ff009=_0x45f0a9;VisuMZ[_0x1ff009(0x601)][_0x1ff009(0x6cd)]['call'](this,_0x30973a,_0x17ee73,_0x4a2fe9),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x3bd)]=Graphics['_centerElement'],Graphics[_0x45f0a9(0x2e3)]=function(_0x3d4671){const _0x195f04=_0x45f0a9;VisuMZ[_0x195f04(0x601)][_0x195f04(0x3bd)][_0x195f04(0x573)](this,_0x3d4671),this['_centerElementCoreEngine'](_0x3d4671);},Graphics['_centerElementCoreEngine']=function(_0x3af55f){const _0x3354f2=_0x45f0a9;VisuMZ['CoreEngine'][_0x3354f2(0x5ba)][_0x3354f2(0x8f1)][_0x3354f2(0x762)]&&(_0x3af55f['style'][_0x3354f2(0x7df)]='none');VisuMZ[_0x3354f2(0x601)][_0x3354f2(0x5ba)]['QoL'][_0x3354f2(0x420)]&&(_0x3af55f['style'][_0x3354f2(0x891)]=_0x3354f2(0x1f7));const _0x28f8ec=Math[_0x3354f2(0x5dc)](0x0,Math[_0x3354f2(0x5ae)](_0x3af55f[_0x3354f2(0x4bc)]*this[_0x3354f2(0x16a)])),_0x5cf9b5=Math[_0x3354f2(0x5dc)](0x0,Math[_0x3354f2(0x5ae)](_0x3af55f[_0x3354f2(0x2a5)]*this['_realScale']));_0x3af55f['style'][_0x3354f2(0x4bc)]=_0x28f8ec+'px',_0x3af55f['style']['height']=_0x5cf9b5+'px';},VisuMZ['CoreEngine'][_0x45f0a9(0x30d)]=Bitmap['prototype']['initialize'],Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)]=function(_0x561c53,_0x10a86d){const _0x4bbabd=_0x45f0a9;VisuMZ[_0x4bbabd(0x601)]['Bitmap_initialize'][_0x4bbabd(0x573)](this,_0x561c53,_0x10a86d),this[_0x4bbabd(0x178)]=!(VisuMZ[_0x4bbabd(0x601)][_0x4bbabd(0x5ba)][_0x4bbabd(0x8f1)]['PixelateImageRendering']??!![]);},Bitmap['prototype'][_0x45f0a9(0x2f4)]=function(){const _0x28dbd8=_0x45f0a9;this[_0x28dbd8(0x449)]=!![];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x6f1)]=Sprite['prototype']['destroy'],Sprite['prototype'][_0x45f0a9(0x2bc)]=function(){const _0x20b72c=_0x45f0a9;if(this[_0x20b72c(0x2bf)])VisuMZ[_0x20b72c(0x601)][_0x20b72c(0x6f1)][_0x20b72c(0x573)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x45f0a9(0x7bc)][_0x45f0a9(0x5cf)]=function(){const _0x3671f3=_0x45f0a9;if(!this[_0x3671f3(0x6e7)])return;if(!this['bitmap'][_0x3671f3(0x449)])return;this[_0x3671f3(0x6e7)]['_baseTexture']&&!this[_0x3671f3(0x67e)][_0x3671f3(0x33d)][_0x3671f3(0x5f9)]&&this[_0x3671f3(0x6e7)][_0x3671f3(0x2bc)]();},VisuMZ[_0x45f0a9(0x601)]['Bitmap_resize']=Bitmap['prototype'][_0x45f0a9(0x669)],Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x669)]=function(_0x188dfe,_0x23f4be){const _0xeeb476=_0x45f0a9;VisuMZ[_0xeeb476(0x601)][_0xeeb476(0x7db)][_0xeeb476(0x573)](this,_0x188dfe,_0x23f4be),this[_0xeeb476(0x2f4)]();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x651)]=Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x86c)],Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x86c)]=function(_0x31cc8c,_0x245a1d,_0x30550c,_0x43d5c0,_0x165a23,_0x2d190e,_0x320311,_0x360c58,_0x555cb8){const _0x491084=_0x45f0a9;_0x245a1d=Math[_0x491084(0x640)](_0x245a1d),_0x30550c=Math[_0x491084(0x640)](_0x30550c),_0x43d5c0=Math['round'](_0x43d5c0),_0x165a23=Math['round'](_0x165a23),_0x2d190e=Math['round'](_0x2d190e),_0x320311=Math['round'](_0x320311),VisuMZ[_0x491084(0x601)][_0x491084(0x651)][_0x491084(0x573)](this,_0x31cc8c,_0x245a1d,_0x30550c,_0x43d5c0,_0x165a23,_0x2d190e,_0x320311,_0x360c58,_0x555cb8),this['markCoreEngineModified']();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x697)]=Bitmap['prototype'][_0x45f0a9(0x4c8)],Bitmap['prototype'][_0x45f0a9(0x4c8)]=function(_0x4ce649,_0x5a8b53,_0x2377a5,_0x34a25e){const _0x4915ec=_0x45f0a9;VisuMZ[_0x4915ec(0x601)][_0x4915ec(0x697)][_0x4915ec(0x573)](this,_0x4ce649,_0x5a8b53,_0x2377a5,_0x34a25e),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x45f0a9(0x4d3)]=Bitmap['prototype'][_0x45f0a9(0x6af)],Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x6af)]=function(_0x14bc15,_0x591432,_0x63eda,_0xc1fb74,_0x24ad60){const _0x458e80=_0x45f0a9;VisuMZ[_0x458e80(0x601)][_0x458e80(0x4d3)][_0x458e80(0x573)](this,_0x14bc15,_0x591432,_0x63eda,_0xc1fb74,_0x24ad60),this['markCoreEngineModified']();},VisuMZ[_0x45f0a9(0x601)]['Bitmap_strokeRect']=Bitmap[_0x45f0a9(0x7bc)]['strokeRect'],Bitmap[_0x45f0a9(0x7bc)]['strokeRect']=function(_0x518c21,_0x1b66e0,_0xd206ea,_0x25c369,_0x59152c){const _0x1ee64e=_0x45f0a9;VisuMZ[_0x1ee64e(0x601)]['Bitmap_strokeRect'][_0x1ee64e(0x573)](this,_0x518c21,_0x1b66e0,_0xd206ea,_0x25c369,_0x59152c),this[_0x1ee64e(0x2f4)]();},VisuMZ['CoreEngine'][_0x45f0a9(0x460)]=Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x1ea)],Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x1ea)]=function(_0x55796b,_0x50b2d1,_0x46c577,_0x1d1a3f,_0x34fbbf,_0x23121f,_0x2aa0b7){const _0x58dea8=_0x45f0a9;VisuMZ[_0x58dea8(0x601)][_0x58dea8(0x460)][_0x58dea8(0x573)](this,_0x55796b,_0x50b2d1,_0x46c577,_0x1d1a3f,_0x34fbbf,_0x23121f,_0x2aa0b7),this[_0x58dea8(0x2f4)]();},VisuMZ['CoreEngine'][_0x45f0a9(0x27b)]=Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x719)],Bitmap[_0x45f0a9(0x7bc)]['drawCircle']=function(_0x10dc8d,_0x6203fc,_0x5f414d,_0x524afb){const _0x2c9e92=_0x45f0a9;_0x10dc8d=Math[_0x2c9e92(0x640)](_0x10dc8d),_0x6203fc=Math[_0x2c9e92(0x640)](_0x6203fc),_0x5f414d=Math['round'](_0x5f414d),VisuMZ[_0x2c9e92(0x601)][_0x2c9e92(0x27b)]['call'](this,_0x10dc8d,_0x6203fc,_0x5f414d,_0x524afb),this[_0x2c9e92(0x2f4)]();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x250)]=Bitmap[_0x45f0a9(0x7bc)]['measureTextWidth'],Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x7ee)]=function(_0x2a356d){const _0x4c8396=_0x45f0a9;return Math[_0x4c8396(0x7b9)](VisuMZ[_0x4c8396(0x601)][_0x4c8396(0x250)][_0x4c8396(0x573)](this,_0x2a356d));},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x900)]=Bitmap[_0x45f0a9(0x7bc)]['drawText'],Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x631)]=function(_0x201aa1,_0x1782c5,_0x5c0e5a,_0x5759b1,_0x1d2643,_0x58b7b1){const _0x1a0c6a=_0x45f0a9;_0x1782c5=Math[_0x1a0c6a(0x640)](_0x1782c5),_0x5c0e5a=Math[_0x1a0c6a(0x640)](_0x5c0e5a),_0x5759b1=Math[_0x1a0c6a(0x7b9)](_0x5759b1),_0x1d2643=Math[_0x1a0c6a(0x7b9)](_0x1d2643),VisuMZ[_0x1a0c6a(0x601)][_0x1a0c6a(0x900)][_0x1a0c6a(0x573)](this,_0x201aa1,_0x1782c5,_0x5c0e5a,_0x5759b1,_0x1d2643,_0x58b7b1),this[_0x1a0c6a(0x2f4)]();},VisuMZ[_0x45f0a9(0x601)]['Bitmap_drawTextOutline']=Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x419)],Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x419)]=function(_0x5db2e5,_0x33fa56,_0x36f4b9,_0x307693){const _0x38b059=_0x45f0a9;VisuMZ[_0x38b059(0x601)][_0x38b059(0x5ba)][_0x38b059(0x8f1)][_0x38b059(0x1e5)]?this[_0x38b059(0x536)](_0x5db2e5,_0x33fa56,_0x36f4b9,_0x307693):VisuMZ[_0x38b059(0x601)][_0x38b059(0x39c)][_0x38b059(0x573)](this,_0x5db2e5,_0x33fa56,_0x36f4b9,_0x307693);},Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x536)]=function(_0x97a61a,_0x3bc7f9,_0x4c8f76,_0x251bfe){const _0x4a39d3=_0x45f0a9,_0x2993d9=this[_0x4a39d3(0x769)];_0x2993d9[_0x4a39d3(0x82b)]=this[_0x4a39d3(0x886)],_0x2993d9[_0x4a39d3(0x5be)](_0x97a61a,_0x3bc7f9+0x2,_0x4c8f76+0x2,_0x251bfe);},VisuMZ[_0x45f0a9(0x601)]['Input_clear']=Input[_0x45f0a9(0x1d9)],Input[_0x45f0a9(0x1d9)]=function(){const _0x34b690=_0x45f0a9;VisuMZ['CoreEngine'][_0x34b690(0x593)]['call'](this),this[_0x34b690(0x443)]=undefined,this[_0x34b690(0x31b)]=undefined,this[_0x34b690(0x257)]=Input[_0x34b690(0x172)];},VisuMZ['CoreEngine'][_0x45f0a9(0x643)]=Input[_0x45f0a9(0x314)],Input[_0x45f0a9(0x314)]=function(){const _0x3507a1=_0x45f0a9;VisuMZ[_0x3507a1(0x601)]['Input_update'][_0x3507a1(0x573)](this);if(this[_0x3507a1(0x257)])this[_0x3507a1(0x257)]--;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x2c3)]=Input[_0x45f0a9(0x162)],Input['_pollGamepads']=function(){const _0x43e03f=_0x45f0a9;if(this[_0x43e03f(0x257)])return;VisuMZ['CoreEngine']['Input_pollGamepads'][_0x43e03f(0x573)](this);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x2f8)]=Input['_setupEventHandlers'],Input[_0x45f0a9(0x2f6)]=function(){const _0x27492c=_0x45f0a9;VisuMZ[_0x27492c(0x601)]['Input_setupEventHandlers'][_0x27492c(0x573)](this),document['addEventListener'](_0x27492c(0x79a),this['_onKeyPress'][_0x27492c(0x159)](this));},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x3a1)]=Input[_0x45f0a9(0x843)],Input[_0x45f0a9(0x843)]=function(_0x371e97){const _0x4fa027=_0x45f0a9;this[_0x4fa027(0x31b)]=_0x371e97[_0x4fa027(0x7d9)],VisuMZ[_0x4fa027(0x601)]['Input_onKeyDown'][_0x4fa027(0x573)](this,_0x371e97),this[_0x4fa027(0x8fa)](null);},Input['_onKeyPress']=function(_0x427551){const _0x2c9453=_0x45f0a9;this[_0x2c9453(0x157)](_0x427551);},Input['_registerKeyInput']=function(_0x5762dd){const _0x323be2=_0x45f0a9;this['_inputSpecialKeyCode']=_0x5762dd[_0x323be2(0x7d9)];let _0x47863b=String[_0x323be2(0x479)](_0x5762dd[_0x323be2(0x873)]);this[_0x323be2(0x443)]===undefined?this['_inputString']=_0x47863b:this[_0x323be2(0x443)]+=_0x47863b;},VisuMZ[_0x45f0a9(0x601)]['Input_shouldPreventDefault']=Input[_0x45f0a9(0x1e7)],Input[_0x45f0a9(0x1e7)]=function(_0x46bbe3){const _0x1cda1b=_0x45f0a9;if(_0x46bbe3===0x8)return![];return VisuMZ[_0x1cda1b(0x601)][_0x1cda1b(0x8eb)]['call'](this,_0x46bbe3);},Input[_0x45f0a9(0x857)]=function(_0x29e9f2){const _0x2b053c=_0x45f0a9;if(_0x29e9f2[_0x2b053c(0x2ee)](/backspace/i))return this[_0x2b053c(0x31b)]===0x8;if(_0x29e9f2[_0x2b053c(0x2ee)](/enter/i))return this[_0x2b053c(0x31b)]===0xd;if(_0x29e9f2[_0x2b053c(0x2ee)](/escape/i))return this[_0x2b053c(0x31b)]===0x1b;},Input[_0x45f0a9(0x66d)]=function(){const _0x43b03b=_0x45f0a9;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x43b03b(0x31b)]);},Input[_0x45f0a9(0x820)]=function(){const _0x478d90=_0x45f0a9;return[0x25,0x26,0x27,0x28]['contains'](this[_0x478d90(0x31b)]);},Input[_0x45f0a9(0x758)]=function(){const _0x1396f9=_0x45f0a9;if(navigator[_0x1396f9(0x8ba)]){const _0x5c9951=navigator[_0x1396f9(0x8ba)]();if(_0x5c9951)for(const _0x42922d of _0x5c9951){if(_0x42922d&&_0x42922d[_0x1396f9(0x4cc)])return!![];}}return![];},Input[_0x45f0a9(0x1e3)]=function(){const _0x380c95=_0x45f0a9;if(navigator[_0x380c95(0x8ba)]){const _0x2a667a=navigator[_0x380c95(0x8ba)]();if(_0x2a667a)for(const _0x4f0bcd of _0x2a667a){if(_0x4f0bcd&&_0x4f0bcd['connected']){if(this[_0x380c95(0x25f)](_0x4f0bcd))return!![];if(this[_0x380c95(0x7b8)](_0x4f0bcd))return!![];}}}return![];},Input[_0x45f0a9(0x25f)]=function(_0x6cc161){const _0x1ac352=_0x45f0a9,_0x3d7878=_0x6cc161[_0x1ac352(0x790)];for(let _0x2a9aea=0x0;_0x2a9aea<_0x3d7878[_0x1ac352(0x2ad)];_0x2a9aea++){if(_0x3d7878[_0x2a9aea][_0x1ac352(0x519)])return!![];}return![];},Input[_0x45f0a9(0x7b8)]=function(_0x53f654){const _0x2e5edf=_0x53f654['axes'],_0x3d446f=0.5;if(_0x2e5edf[0x0]<-_0x3d446f)return!![];if(_0x2e5edf[0x0]>_0x3d446f)return!![];if(_0x2e5edf[0x1]<-_0x3d446f)return!![];if(_0x2e5edf[0x1]>_0x3d446f)return!![];return![];},Input[_0x45f0a9(0x54c)]=function(){const _0x3ef495=_0x45f0a9;return this[_0x3ef495(0x70c)]||null;},Input[_0x45f0a9(0x8fa)]=function(_0x3a0992){this['_lastGamepad']=_0x3a0992;},VisuMZ['CoreEngine'][_0x45f0a9(0x8d3)]=Input['_updateGamepadState'],Input[_0x45f0a9(0x5bc)]=function(_0x28444a){const _0x315bf7=_0x45f0a9;VisuMZ[_0x315bf7(0x601)]['Input_updateGamepadState'][_0x315bf7(0x573)](this,_0x28444a),(this[_0x315bf7(0x25f)](_0x28444a)||this[_0x315bf7(0x7b8)](_0x28444a))&&this['setLastGamepadUsed'](_0x28444a);},Input[_0x45f0a9(0x455)]=function(){const _0xb139dd=_0x45f0a9;return this[_0xb139dd(0x70c)]?this[_0xb139dd(0x70c)]['id']:'Keyboard';},VisuMZ['CoreEngine']['Tilemap_addShadow']=Tilemap[_0x45f0a9(0x7bc)][_0x45f0a9(0x2fd)],Tilemap[_0x45f0a9(0x7bc)]['_addShadow']=function(_0x4692ce,_0x31d659,_0x27843d,_0x2405da){const _0x4f03f6=_0x45f0a9;if($gameMap&&$gameMap[_0x4f03f6(0x286)]())return;VisuMZ[_0x4f03f6(0x601)][_0x4f03f6(0x7e2)][_0x4f03f6(0x573)](this,_0x4692ce,_0x31d659,_0x27843d,_0x2405da);},Tilemap['Renderer'][_0x45f0a9(0x7bc)]['_createInternalTextures']=function(){const _0x2f9005=_0x45f0a9;this[_0x2f9005(0x3e6)]();for(let _0x5f6983=0x0;_0x5f6983<Tilemap[_0x2f9005(0x7ad)]['MAX_GL_TEXTURES'];_0x5f6983++){const _0x17be53=new PIXI['BaseTexture']();_0x17be53['setSize'](0x800,0x800),VisuMZ[_0x2f9005(0x601)][_0x2f9005(0x5ba)][_0x2f9005(0x8f1)][_0x2f9005(0x420)]&&(_0x17be53['scaleMode']=PIXI[_0x2f9005(0x260)][_0x2f9005(0x26f)]),this['_internalTextures'][_0x2f9005(0x5f7)](_0x17be53);}},WindowLayer['prototype'][_0x45f0a9(0x6ef)]=function(){const _0x335e1d=_0x45f0a9;return SceneManager&&SceneManager[_0x335e1d(0x4a0)]?SceneManager[_0x335e1d(0x4a0)]['isWindowMaskingEnabled']():!![];},VisuMZ[_0x45f0a9(0x601)]['WindowLayer_render']=WindowLayer[_0x45f0a9(0x7bc)][_0x45f0a9(0x829)],WindowLayer[_0x45f0a9(0x7bc)][_0x45f0a9(0x829)]=function render(_0x5878d8){const _0x37f026=_0x45f0a9;this[_0x37f026(0x6ef)]()?VisuMZ[_0x37f026(0x601)][_0x37f026(0x2ed)][_0x37f026(0x573)](this,_0x5878d8):this[_0x37f026(0x7a2)](_0x5878d8);},WindowLayer[_0x45f0a9(0x7bc)][_0x45f0a9(0x7a2)]=function render(_0x278d67){const _0x2b9c3a=_0x45f0a9;if(!this[_0x2b9c3a(0x470)])return;const _0x4256ec=new PIXI[(_0x2b9c3a(0x6d4))](),_0x1b130a=_0x278d67['gl'],_0x4b0f93=this['children'][_0x2b9c3a(0x725)]();_0x278d67[_0x2b9c3a(0x2d4)][_0x2b9c3a(0x336)](),_0x4256ec[_0x2b9c3a(0x21a)]=this[_0x2b9c3a(0x21a)],_0x278d67[_0x2b9c3a(0x409)][_0x2b9c3a(0x557)](),_0x1b130a['enable'](_0x1b130a[_0x2b9c3a(0x7e3)]);while(_0x4b0f93[_0x2b9c3a(0x2ad)]>0x0){const _0x393cf9=_0x4b0f93[_0x2b9c3a(0x491)]();_0x393cf9[_0x2b9c3a(0x6db)]&&_0x393cf9[_0x2b9c3a(0x470)]&&_0x393cf9[_0x2b9c3a(0x456)]>0x0&&(_0x1b130a['stencilFunc'](_0x1b130a[_0x2b9c3a(0x48c)],0x0,~0x0),_0x1b130a['stencilOp'](_0x1b130a[_0x2b9c3a(0x5fa)],_0x1b130a[_0x2b9c3a(0x5fa)],_0x1b130a['KEEP']),_0x393cf9[_0x2b9c3a(0x829)](_0x278d67),_0x278d67['batch'][_0x2b9c3a(0x557)](),_0x4256ec[_0x2b9c3a(0x1d9)](),_0x1b130a['stencilFunc'](_0x1b130a[_0x2b9c3a(0x8a2)],0x1,~0x0),_0x1b130a[_0x2b9c3a(0x18a)](_0x1b130a[_0x2b9c3a(0x284)],_0x1b130a[_0x2b9c3a(0x284)],_0x1b130a[_0x2b9c3a(0x284)]),_0x1b130a[_0x2b9c3a(0x7b1)](_0x1b130a[_0x2b9c3a(0x345)],_0x1b130a[_0x2b9c3a(0x58e)]),_0x4256ec[_0x2b9c3a(0x829)](_0x278d67),_0x278d67[_0x2b9c3a(0x409)][_0x2b9c3a(0x557)](),_0x1b130a['blendFunc'](_0x1b130a[_0x2b9c3a(0x58e)],_0x1b130a['ONE_MINUS_SRC_ALPHA']));}_0x1b130a['disable'](_0x1b130a[_0x2b9c3a(0x7e3)]),_0x1b130a[_0x2b9c3a(0x1d9)](_0x1b130a[_0x2b9c3a(0x408)]),_0x1b130a['clearStencil'](0x0),_0x278d67['batch']['flush']();for(const _0x2c68d6 of this[_0x2b9c3a(0x778)]){!_0x2c68d6['_isWindow']&&_0x2c68d6[_0x2b9c3a(0x470)]&&_0x2c68d6[_0x2b9c3a(0x829)](_0x278d67);}_0x278d67[_0x2b9c3a(0x409)][_0x2b9c3a(0x557)]();},DataManager[_0x45f0a9(0x824)]=function(_0x4cbddd){const _0x1b48b4=_0x45f0a9;return this[_0x1b48b4(0x484)](_0x4cbddd)&&_0x4cbddd[_0x1b48b4(0x51d)]===0x2;},VisuMZ['CoreEngine'][_0x45f0a9(0x34c)]=DataManager['setupNewGame'],DataManager['setupNewGame']=function(){const _0x54fd95=_0x45f0a9;VisuMZ[_0x54fd95(0x601)][_0x54fd95(0x34c)]['call'](this),this[_0x54fd95(0x83c)](),this[_0x54fd95(0x25a)]();},DataManager[_0x45f0a9(0x83c)]=function(){const _0x3a5b84=_0x45f0a9;if($gameTemp[_0x3a5b84(0x88e)]()){const _0x405dc8=VisuMZ['CoreEngine']['Settings'][_0x3a5b84(0x8f1)][_0x3a5b84(0x527)];if(_0x405dc8>0x0)$gameTemp[_0x3a5b84(0x139)](_0x405dc8);}},DataManager[_0x45f0a9(0x25a)]=function(){const _0x1fc0b2=_0x45f0a9,_0x52dd37=VisuMZ[_0x1fc0b2(0x601)][_0x1fc0b2(0x5ba)][_0x1fc0b2(0x8f1)]['NewGameCommonEventAll']||0x0;if(_0x52dd37>0x0)$gameTemp[_0x1fc0b2(0x139)](_0x52dd37);},DataManager['createTroopNote']=function(_0x4d00b0){const _0x203974=_0x45f0a9,_0x702efd=$dataTroops[_0x4d00b0];if(!_0x702efd)return'';let _0x571e19='';_0x571e19+=_0x702efd[_0x203974(0x3d0)];for(const _0x22f688 of _0x702efd[_0x203974(0x881)]){for(const _0xdc1b9a of _0x22f688[_0x203974(0x53d)]){[0x6c,0x198][_0x203974(0x65f)](_0xdc1b9a['code'])&&(_0x571e19+='\x0a',_0x571e19+=_0xdc1b9a['parameters'][0x0]);}}return _0x571e19;};(VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x8f1)][_0x45f0a9(0x7e1)]??!![])&&($scene=null,VisuMZ[_0x45f0a9(0x601)]['Scene_Base_create']=Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x772)],Scene_Base[_0x45f0a9(0x7bc)]['create']=function(){const _0x2d0fa7=_0x45f0a9;VisuMZ[_0x2d0fa7(0x601)][_0x2d0fa7(0x3b4)][_0x2d0fa7(0x573)](this),$scene=this;},$spriteset=null,VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x61d)]=Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x448)],Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x448)]=function(){const _0x358ad1=_0x45f0a9;VisuMZ[_0x358ad1(0x601)][_0x358ad1(0x61d)]['call'](this),$spriteset=this[_0x358ad1(0x29e)];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x530)]=Scene_Battle[_0x45f0a9(0x7bc)][_0x45f0a9(0x448)],Scene_Battle[_0x45f0a9(0x7bc)][_0x45f0a9(0x448)]=function(){const _0x27b42e=_0x45f0a9;VisuMZ[_0x27b42e(0x601)][_0x27b42e(0x530)][_0x27b42e(0x573)](this),$spriteset=this[_0x27b42e(0x29e)];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x47f)]=Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x6b8)],Scene_Base['prototype']['terminate']=function(){const _0x35952f=_0x45f0a9;VisuMZ[_0x35952f(0x601)][_0x35952f(0x47f)][_0x35952f(0x573)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x45f0a9(0x601)]['BattleManager_update']=BattleManager[_0x45f0a9(0x314)],BattleManager['update']=function(_0x15e318){const _0x35a0f4=_0x45f0a9;VisuMZ['CoreEngine'][_0x35a0f4(0x26c)][_0x35a0f4(0x573)](this,_0x15e318),this[_0x35a0f4(0x6ff)]();},BattleManager['updateBattleVariables']=function(){const _0x12a756=_0x45f0a9;$subject=this[_0x12a756(0x316)],$targets=this[_0x12a756(0x14b)],$target=this[_0x12a756(0x705)]||this['_targets'][0x0];},$event=null,VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x6eb)]=Game_Event[_0x45f0a9(0x7bc)]['start'],Game_Event[_0x45f0a9(0x7bc)][_0x45f0a9(0x231)]=function(){const _0x527c06=_0x45f0a9;VisuMZ[_0x527c06(0x601)][_0x527c06(0x6eb)][_0x527c06(0x573)](this),$event=this;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x123)]=Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)],Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)]=function(){const _0x20dbe4=_0x45f0a9;VisuMZ[_0x20dbe4(0x601)][_0x20dbe4(0x123)][_0x20dbe4(0x573)](this),$gameMap[_0x20dbe4(0x8a1)]();},Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x8a1)]=function(){const _0x2eb400=_0x45f0a9;!this[_0x2eb400(0x34f)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x6f186b){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x6f186b);});;$onceParallel=function(_0x1b2ca3,_0x549a19){const _0x38df5b=_0x45f0a9;if(SceneManager[_0x38df5b(0x8fd)]())SceneManager['_scene']['playOnceParallelInterpreter'](_0x1b2ca3,_0x549a19);else{if(SceneManager[_0x38df5b(0x28b)]()){if(Imported[_0x38df5b(0x712)])SceneManager[_0x38df5b(0x4a0)][_0x38df5b(0x775)](_0x1b2ca3);else $gameTemp&&$gameTemp['isPlaytest']()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else $gameTemp&&$gameTemp[_0x38df5b(0x88e)]()&&alert(_0x38df5b(0x251));}},StorageManager['jsonToZip']=function(_0x4f37f7){return new Promise((_0x46dbb0,_0x461d96)=>{const _0x4a4209=_0x25ac;try{const _0x4535d6=pako['deflate'](_0x4f37f7,{'to':_0x4a4209(0x54f),'level':0x1});if(_0x4535d6[_0x4a4209(0x2ad)]>=0xc350){}_0x46dbb0(_0x4535d6);}catch(_0x5b5ff5){_0x461d96(_0x5b5ff5);}});},TextManager[_0x45f0a9(0x65b)]=['','','',_0x45f0a9(0x5d0),'','','HELP','','BACKSPACE','TAB','','',_0x45f0a9(0x529),_0x45f0a9(0x2d2),_0x45f0a9(0x69d),'','SHIFT','CTRL',_0x45f0a9(0x565),_0x45f0a9(0x6f8),_0x45f0a9(0x612),_0x45f0a9(0x77d),'EISU',_0x45f0a9(0x2b3),_0x45f0a9(0x285),_0x45f0a9(0x11d),'',_0x45f0a9(0x82f),_0x45f0a9(0x3c8),_0x45f0a9(0x64c),_0x45f0a9(0x512),_0x45f0a9(0x5d6),'SPACE',_0x45f0a9(0x287),_0x45f0a9(0x59d),_0x45f0a9(0x161),_0x45f0a9(0x278),_0x45f0a9(0x6b7),'UP',_0x45f0a9(0x8a8),_0x45f0a9(0x22e),_0x45f0a9(0x343),_0x45f0a9(0x5f4),_0x45f0a9(0x5f5),_0x45f0a9(0x4b7),_0x45f0a9(0x3d7),_0x45f0a9(0x29b),'','0','1','2','3','4','5','6','7','8','9',_0x45f0a9(0x54e),'SEMICOLON',_0x45f0a9(0x291),_0x45f0a9(0x701),_0x45f0a9(0x641),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','','CONTEXT_MENU','',_0x45f0a9(0x78b),_0x45f0a9(0x18f),_0x45f0a9(0x36c),_0x45f0a9(0x637),_0x45f0a9(0x7ba),'NUMPAD4',_0x45f0a9(0x808),'NUMPAD6','NUMPAD7','NUMPAD8',_0x45f0a9(0x7ec),'MULTIPLY',_0x45f0a9(0x6d8),_0x45f0a9(0x70f),'SUBTRACT',_0x45f0a9(0x496),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11',_0x45f0a9(0x153),_0x45f0a9(0x204),'F14',_0x45f0a9(0x55b),'F16',_0x45f0a9(0x2a9),'F18',_0x45f0a9(0x734),_0x45f0a9(0x7bf),_0x45f0a9(0x70a),_0x45f0a9(0x152),_0x45f0a9(0x73b),_0x45f0a9(0x156),'','','','','','','','',_0x45f0a9(0x4f2),_0x45f0a9(0x520),_0x45f0a9(0x5f6),_0x45f0a9(0x574),_0x45f0a9(0x741),_0x45f0a9(0x6f4),_0x45f0a9(0x528),'','','','','','','','','',_0x45f0a9(0x5b7),_0x45f0a9(0x3a7),_0x45f0a9(0x489),_0x45f0a9(0x84d),'DOLLAR','PERCENT','AMPERSAND',_0x45f0a9(0x332),_0x45f0a9(0x516),_0x45f0a9(0x50c),'ASTERISK',_0x45f0a9(0x628),_0x45f0a9(0x5ad),_0x45f0a9(0x898),_0x45f0a9(0x283),'CLOSE_CURLY_BRACKET',_0x45f0a9(0x2c9),'','','','',_0x45f0a9(0x61a),_0x45f0a9(0x8de),_0x45f0a9(0x801),'','','SEMICOLON',_0x45f0a9(0x701),_0x45f0a9(0x2c4),_0x45f0a9(0x696),'PERIOD','SLASH',_0x45f0a9(0x86d),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x45f0a9(0x149),'BACK_SLASH',_0x45f0a9(0x27d),_0x45f0a9(0x45f),'',_0x45f0a9(0x5b3),_0x45f0a9(0x259),'',_0x45f0a9(0x8f6),_0x45f0a9(0x795),'',_0x45f0a9(0x6da),'','',_0x45f0a9(0x711),_0x45f0a9(0x279),_0x45f0a9(0x239),_0x45f0a9(0x372),_0x45f0a9(0x7c2),'WIN_OEM_WSCTRL',_0x45f0a9(0x39a),_0x45f0a9(0x806),_0x45f0a9(0x2ae),_0x45f0a9(0x13e),_0x45f0a9(0x142),'WIN_OEM_ENLW','WIN_OEM_BACKTAB',_0x45f0a9(0x410),'CRSEL',_0x45f0a9(0x473),_0x45f0a9(0x897),_0x45f0a9(0x75c),'ZOOM','','PA1',_0x45f0a9(0x5e1),''],TextManager[_0x45f0a9(0x787)]=VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)]['ButtonAssist'][_0x45f0a9(0x4f4)],TextManager['buttonAssistCancel']=VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x554)][_0x45f0a9(0x32b)],TextManager['buttonAssistSwitch']=VisuMZ['CoreEngine'][_0x45f0a9(0x5ba)][_0x45f0a9(0x554)][_0x45f0a9(0x895)],VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x8c6)]=TextManager['param'],TextManager['param']=function(_0x41b80c){const _0x5e16d2=_0x45f0a9;return typeof _0x41b80c===_0x5e16d2(0x6dc)?VisuMZ[_0x5e16d2(0x601)]['TextManager_param']['call'](this,_0x41b80c):this[_0x5e16d2(0x433)](_0x41b80c);},TextManager[_0x45f0a9(0x433)]=function(_0x3af66f){const _0x5c47fd=_0x45f0a9;_0x3af66f=String(_0x3af66f||'')[_0x5c47fd(0x26d)]();const _0x107222=VisuMZ[_0x5c47fd(0x601)][_0x5c47fd(0x5ba)][_0x5c47fd(0x6ca)];if(_0x3af66f===_0x5c47fd(0x8cf))return $dataSystem[_0x5c47fd(0x79b)][_0x5c47fd(0x5a5)][0x0];if(_0x3af66f===_0x5c47fd(0x300))return $dataSystem[_0x5c47fd(0x79b)][_0x5c47fd(0x5a5)][0x1];if(_0x3af66f==='ATK')return $dataSystem['terms'][_0x5c47fd(0x5a5)][0x2];if(_0x3af66f===_0x5c47fd(0x2cc))return $dataSystem['terms']['params'][0x3];if(_0x3af66f===_0x5c47fd(0x323))return $dataSystem[_0x5c47fd(0x79b)][_0x5c47fd(0x5a5)][0x4];if(_0x3af66f===_0x5c47fd(0x2da))return $dataSystem['terms'][_0x5c47fd(0x5a5)][0x5];if(_0x3af66f===_0x5c47fd(0x356))return $dataSystem[_0x5c47fd(0x79b)]['params'][0x6];if(_0x3af66f===_0x5c47fd(0x265))return $dataSystem[_0x5c47fd(0x79b)]['params'][0x7];if(_0x3af66f===_0x5c47fd(0x51c))return _0x107222[_0x5c47fd(0x55a)];if(_0x3af66f===_0x5c47fd(0x1bc))return _0x107222[_0x5c47fd(0x8b4)];if(_0x3af66f===_0x5c47fd(0x78e))return _0x107222[_0x5c47fd(0x5f3)];if(_0x3af66f===_0x5c47fd(0x328))return _0x107222['XParamVocab3'];if(_0x3af66f===_0x5c47fd(0x1ba))return _0x107222['XParamVocab4'];if(_0x3af66f===_0x5c47fd(0x5a9))return _0x107222[_0x5c47fd(0x19c)];if(_0x3af66f===_0x5c47fd(0x83a))return _0x107222['XParamVocab6'];if(_0x3af66f===_0x5c47fd(0x6ab))return _0x107222[_0x5c47fd(0x1c1)];if(_0x3af66f===_0x5c47fd(0x7ea))return _0x107222[_0x5c47fd(0x6c7)];if(_0x3af66f===_0x5c47fd(0x81e))return _0x107222[_0x5c47fd(0x18b)];if(_0x3af66f===_0x5c47fd(0x7ab))return _0x107222['SParamVocab0'];if(_0x3af66f===_0x5c47fd(0x598))return _0x107222[_0x5c47fd(0x263)];if(_0x3af66f===_0x5c47fd(0x274))return _0x107222[_0x5c47fd(0x57d)];if(_0x3af66f===_0x5c47fd(0x155))return _0x107222[_0x5c47fd(0x1e4)];if(_0x3af66f===_0x5c47fd(0x5ed))return _0x107222[_0x5c47fd(0x21b)];if(_0x3af66f===_0x5c47fd(0x3b8))return _0x107222[_0x5c47fd(0x2c8)];if(_0x3af66f==='PDR')return _0x107222['SParamVocab6'];if(_0x3af66f===_0x5c47fd(0x49b))return _0x107222[_0x5c47fd(0x803)];if(_0x3af66f===_0x5c47fd(0x29c))return _0x107222[_0x5c47fd(0x43d)];if(_0x3af66f===_0x5c47fd(0x71c))return _0x107222[_0x5c47fd(0x447)];if(VisuMZ[_0x5c47fd(0x601)][_0x5c47fd(0x626)][_0x3af66f])return VisuMZ['CoreEngine'][_0x5c47fd(0x626)][_0x3af66f];return'';},TextManager['getInputButtonString']=function(_0x41c306){const _0x4766c6=_0x45f0a9,_0x2efd92=Input[_0x4766c6(0x455)]();return _0x2efd92===_0x4766c6(0x7d0)?this[_0x4766c6(0x289)](_0x41c306):this[_0x4766c6(0x243)](_0x2efd92,_0x41c306);},TextManager[_0x45f0a9(0x289)]=function(_0xa7ef0d){const _0x4d7a27=_0x45f0a9;let _0x1b7945=VisuMZ[_0x4d7a27(0x601)][_0x4d7a27(0x5ba)]['ButtonAssist'][_0x4d7a27(0x8ad)];if(!_0x1b7945){if(_0xa7ef0d===_0x4d7a27(0x844))_0xa7ef0d=_0x4d7a27(0x227);if(_0xa7ef0d===_0x4d7a27(0x442))_0xa7ef0d=_0x4d7a27(0x227);}let _0x2493bf=[];for(let _0x21da93 in Input[_0x4d7a27(0x399)]){_0x21da93=Number(_0x21da93);if(_0x21da93>=0x60&&_0x21da93<=0x69)continue;if([0x12,0x20][_0x4d7a27(0x65f)](_0x21da93))continue;_0xa7ef0d===Input[_0x4d7a27(0x399)][_0x21da93]&&_0x2493bf[_0x4d7a27(0x5f7)](_0x21da93);}for(let _0x5d80cc=0x0;_0x5d80cc<_0x2493bf[_0x4d7a27(0x2ad)];_0x5d80cc++){_0x2493bf[_0x5d80cc]=TextManager['stringKeyMap'][_0x2493bf[_0x5d80cc]];}return this[_0x4d7a27(0x2c2)](_0x2493bf);},TextManager['makeInputButtonString']=function(_0x4855fc){const _0x34a2a6=_0x45f0a9,_0x7d51e8=VisuMZ[_0x34a2a6(0x601)]['Settings'][_0x34a2a6(0x554)],_0x3212b7=_0x7d51e8[_0x34a2a6(0x7a5)];let _0x40dfbe='';if(_0x4855fc[_0x34a2a6(0x65f)]('UP'))_0x40dfbe='UP';else{if(_0x4855fc[_0x34a2a6(0x65f)](_0x34a2a6(0x22e)))_0x40dfbe='DOWN';else{if(_0x4855fc[_0x34a2a6(0x65f)](_0x34a2a6(0x6b7)))_0x40dfbe=_0x34a2a6(0x6b7);else _0x4855fc[_0x34a2a6(0x65f)](_0x34a2a6(0x8a8))?_0x40dfbe='RIGHT':_0x40dfbe=_0x4855fc[_0x34a2a6(0x3d1)]();}}const _0x17ff57=_0x34a2a6(0x6e3)['format'](_0x40dfbe);return _0x7d51e8[_0x17ff57]?_0x7d51e8[_0x17ff57]:_0x3212b7[_0x34a2a6(0x525)](_0x40dfbe);},TextManager['getInputMultiButtonStrings']=function(_0x550cf2,_0x286f67){const _0x16b8ae=_0x45f0a9,_0x46b3c5=VisuMZ[_0x16b8ae(0x601)][_0x16b8ae(0x5ba)][_0x16b8ae(0x554)],_0x5a8a13=_0x46b3c5[_0x16b8ae(0x301)],_0x5df05a=this['getInputButtonString'](_0x550cf2),_0x56a5c1=this['getInputButtonString'](_0x286f67);return _0x5a8a13[_0x16b8ae(0x525)](_0x5df05a,_0x56a5c1);},TextManager[_0x45f0a9(0x243)]=function(_0x24bf63,_0x5cae4d){const _0x513b7a=_0x45f0a9,_0x20a66d=_0x24bf63[_0x513b7a(0x709)]()[_0x513b7a(0x88c)](),_0xbda05a=VisuMZ[_0x513b7a(0x601)][_0x513b7a(0x267)][_0x20a66d];if(!_0xbda05a)return this[_0x513b7a(0x7c9)](_0x24bf63,_0x5cae4d);return _0xbda05a[_0x5cae4d]||this[_0x513b7a(0x289)](_0x24bf63,_0x5cae4d);},TextManager[_0x45f0a9(0x7c9)]=function(_0x17a1e4,_0x5fe60a){const _0x1d2b45=_0x45f0a9,_0x44f545=_0x17a1e4['toLowerCase']()[_0x1d2b45(0x88c)]();for(const _0x397dd1 in VisuMZ[_0x1d2b45(0x601)]['ControllerMatches']){if(_0x44f545['includes'](_0x397dd1)){const _0x46dc4b=VisuMZ[_0x1d2b45(0x601)][_0x1d2b45(0x13b)][_0x397dd1],_0x3bfd29=VisuMZ[_0x1d2b45(0x601)][_0x1d2b45(0x267)][_0x46dc4b];return _0x3bfd29[_0x5fe60a]||this[_0x1d2b45(0x289)](_0x5fe60a);}}return this[_0x1d2b45(0x289)](_0x5fe60a);},VisuMZ['CoreEngine'][_0x45f0a9(0x8d8)]=ColorManager[_0x45f0a9(0x5ec)],ColorManager[_0x45f0a9(0x5ec)]=function(){const _0x1bb23b=_0x45f0a9;VisuMZ[_0x1bb23b(0x601)][_0x1bb23b(0x8d8)][_0x1bb23b(0x573)](this),this[_0x1bb23b(0x8ae)]=this[_0x1bb23b(0x8ae)]||{};},ColorManager[_0x45f0a9(0x559)]=function(_0x40f29b,_0x1a21ce){const _0x4f6178=_0x45f0a9;return _0x1a21ce=String(_0x1a21ce),this['_colorCache']=this['_colorCache']||{},_0x1a21ce[_0x4f6178(0x2ee)](/#(.*)/i)?this[_0x4f6178(0x8ae)][_0x40f29b]=_0x4f6178(0x30e)[_0x4f6178(0x525)](String(RegExp['$1'])):this[_0x4f6178(0x8ae)][_0x40f29b]=this['textColor'](Number(_0x1a21ce)),this[_0x4f6178(0x8ae)][_0x40f29b];},ColorManager[_0x45f0a9(0x1f8)]=function(_0x264794){const _0x559643=_0x45f0a9;return _0x264794=String(_0x264794),_0x264794[_0x559643(0x2ee)](/#(.*)/i)?_0x559643(0x30e)[_0x559643(0x525)](String(RegExp['$1'])):this['textColor'](Number(_0x264794));},ColorManager[_0x45f0a9(0x3f0)]=function(){this['_colorCache']={};},ColorManager['normalColor']=function(){const _0x5eb168=_0x45f0a9,_0x376b3e=_0x5eb168(0x182);this[_0x5eb168(0x8ae)]=this[_0x5eb168(0x8ae)]||{};if(this[_0x5eb168(0x8ae)][_0x376b3e])return this['_colorCache'][_0x376b3e];const _0x47d1cd=VisuMZ[_0x5eb168(0x601)][_0x5eb168(0x5ba)]['Color'][_0x5eb168(0x555)];return this['getColorDataFromPluginParameters'](_0x376b3e,_0x47d1cd);},ColorManager[_0x45f0a9(0x849)]=function(){const _0x40bf33=_0x45f0a9,_0x38960d='_stored_systemColor';this['_colorCache']=this[_0x40bf33(0x8ae)]||{};if(this[_0x40bf33(0x8ae)][_0x38960d])return this[_0x40bf33(0x8ae)][_0x38960d];const _0x4fce44=VisuMZ[_0x40bf33(0x601)][_0x40bf33(0x5ba)][_0x40bf33(0x28d)][_0x40bf33(0x538)];return this[_0x40bf33(0x559)](_0x38960d,_0x4fce44);},ColorManager[_0x45f0a9(0x768)]=function(){const _0x4e4494=_0x45f0a9,_0x231594=_0x4e4494(0x4d4);this[_0x4e4494(0x8ae)]=this[_0x4e4494(0x8ae)]||{};if(this[_0x4e4494(0x8ae)][_0x231594])return this[_0x4e4494(0x8ae)][_0x231594];const _0x1202b5=VisuMZ[_0x4e4494(0x601)][_0x4e4494(0x5ba)][_0x4e4494(0x28d)][_0x4e4494(0x653)];return this['getColorDataFromPluginParameters'](_0x231594,_0x1202b5);},ColorManager[_0x45f0a9(0x819)]=function(){const _0x39d2d8=_0x45f0a9,_0x426b30=_0x39d2d8(0x782);this['_colorCache']=this[_0x39d2d8(0x8ae)]||{};if(this[_0x39d2d8(0x8ae)][_0x426b30])return this[_0x39d2d8(0x8ae)][_0x426b30];const _0x164ce0=VisuMZ[_0x39d2d8(0x601)][_0x39d2d8(0x5ba)][_0x39d2d8(0x28d)]['ColorDeath'];return this[_0x39d2d8(0x559)](_0x426b30,_0x164ce0);},ColorManager[_0x45f0a9(0x76d)]=function(){const _0x926fe7=_0x45f0a9,_0x568a8f=_0x926fe7(0x864);this['_colorCache']=this[_0x926fe7(0x8ae)]||{};if(this[_0x926fe7(0x8ae)][_0x568a8f])return this[_0x926fe7(0x8ae)][_0x568a8f];const _0x4bcc59=VisuMZ[_0x926fe7(0x601)][_0x926fe7(0x5ba)][_0x926fe7(0x28d)][_0x926fe7(0x749)];return this['getColorDataFromPluginParameters'](_0x568a8f,_0x4bcc59);},ColorManager[_0x45f0a9(0x493)]=function(){const _0x47357a=_0x45f0a9,_0x35e4b5=_0x47357a(0x49a);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x35e4b5])return this[_0x47357a(0x8ae)][_0x35e4b5];const _0xb4d1b=VisuMZ[_0x47357a(0x601)][_0x47357a(0x5ba)][_0x47357a(0x28d)][_0x47357a(0x3ee)];return this['getColorDataFromPluginParameters'](_0x35e4b5,_0xb4d1b);},ColorManager['hpGaugeColor2']=function(){const _0x117c19=_0x45f0a9,_0x186758=_0x117c19(0x1a4);this[_0x117c19(0x8ae)]=this[_0x117c19(0x8ae)]||{};if(this[_0x117c19(0x8ae)][_0x186758])return this['_colorCache'][_0x186758];const _0x4df8c5=VisuMZ['CoreEngine'][_0x117c19(0x5ba)][_0x117c19(0x28d)][_0x117c19(0x8cc)];return this['getColorDataFromPluginParameters'](_0x186758,_0x4df8c5);},ColorManager[_0x45f0a9(0x3f8)]=function(){const _0x1112f0=_0x45f0a9,_0x2f0080=_0x1112f0(0x14e);this[_0x1112f0(0x8ae)]=this[_0x1112f0(0x8ae)]||{};if(this[_0x1112f0(0x8ae)][_0x2f0080])return this['_colorCache'][_0x2f0080];const _0xc8f0b6=VisuMZ[_0x1112f0(0x601)][_0x1112f0(0x5ba)][_0x1112f0(0x28d)][_0x1112f0(0x8be)];return this[_0x1112f0(0x559)](_0x2f0080,_0xc8f0b6);},ColorManager[_0x45f0a9(0x1d4)]=function(){const _0x18a18b=_0x45f0a9,_0x3d4882='_stored_mpGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x3d4882])return this['_colorCache'][_0x3d4882];const _0x4238ef=VisuMZ[_0x18a18b(0x601)][_0x18a18b(0x5ba)][_0x18a18b(0x28d)][_0x18a18b(0x6a3)];return this[_0x18a18b(0x559)](_0x3d4882,_0x4238ef);},ColorManager[_0x45f0a9(0x880)]=function(){const _0x5ef6bb=_0x45f0a9,_0x2f53c1='_stored_mpCostColor';this['_colorCache']=this[_0x5ef6bb(0x8ae)]||{};if(this[_0x5ef6bb(0x8ae)][_0x2f53c1])return this[_0x5ef6bb(0x8ae)][_0x2f53c1];const _0x561264=VisuMZ[_0x5ef6bb(0x601)][_0x5ef6bb(0x5ba)][_0x5ef6bb(0x28d)][_0x5ef6bb(0x117)];return this['getColorDataFromPluginParameters'](_0x2f53c1,_0x561264);},ColorManager[_0x45f0a9(0x7c0)]=function(){const _0x91d148=_0x45f0a9,_0x45ab19=_0x91d148(0x517);this[_0x91d148(0x8ae)]=this[_0x91d148(0x8ae)]||{};if(this[_0x91d148(0x8ae)][_0x45ab19])return this['_colorCache'][_0x45ab19];const _0x3ffa08=VisuMZ[_0x91d148(0x601)][_0x91d148(0x5ba)][_0x91d148(0x28d)][_0x91d148(0x81b)];return this['getColorDataFromPluginParameters'](_0x45ab19,_0x3ffa08);},ColorManager[_0x45f0a9(0x4da)]=function(){const _0x4b18fb=_0x45f0a9,_0x16c8fc='_stored_powerDownColor';this[_0x4b18fb(0x8ae)]=this['_colorCache']||{};if(this[_0x4b18fb(0x8ae)][_0x16c8fc])return this[_0x4b18fb(0x8ae)][_0x16c8fc];const _0x211ee5=VisuMZ[_0x4b18fb(0x601)][_0x4b18fb(0x5ba)][_0x4b18fb(0x28d)][_0x4b18fb(0x3ec)];return this[_0x4b18fb(0x559)](_0x16c8fc,_0x211ee5);},ColorManager[_0x45f0a9(0x3b6)]=function(){const _0x249fb5=_0x45f0a9,_0x27cac7=_0x249fb5(0x1ed);this[_0x249fb5(0x8ae)]=this[_0x249fb5(0x8ae)]||{};if(this[_0x249fb5(0x8ae)][_0x27cac7])return this[_0x249fb5(0x8ae)][_0x27cac7];const _0xee5441=VisuMZ[_0x249fb5(0x601)]['Settings'][_0x249fb5(0x28d)][_0x249fb5(0x8aa)];return this['getColorDataFromPluginParameters'](_0x27cac7,_0xee5441);},ColorManager[_0x45f0a9(0x31c)]=function(){const _0x176378=_0x45f0a9,_0xaf2f41=_0x176378(0x37c);this[_0x176378(0x8ae)]=this[_0x176378(0x8ae)]||{};if(this[_0x176378(0x8ae)][_0xaf2f41])return this[_0x176378(0x8ae)][_0xaf2f41];const _0x114dd7=VisuMZ[_0x176378(0x601)][_0x176378(0x5ba)][_0x176378(0x28d)][_0x176378(0x50d)];return this['getColorDataFromPluginParameters'](_0xaf2f41,_0x114dd7);},ColorManager[_0x45f0a9(0x7e0)]=function(){const _0x406c81=_0x45f0a9,_0x175438=_0x406c81(0x63c);this[_0x406c81(0x8ae)]=this[_0x406c81(0x8ae)]||{};if(this[_0x406c81(0x8ae)][_0x175438])return this[_0x406c81(0x8ae)][_0x175438];const _0x50d4df=VisuMZ[_0x406c81(0x601)]['Settings'][_0x406c81(0x28d)]['ColorTPGauge1'];return this[_0x406c81(0x559)](_0x175438,_0x50d4df);},ColorManager[_0x45f0a9(0x6d2)]=function(){const _0x31433e=_0x45f0a9,_0x380b44=_0x31433e(0x5b6);this[_0x31433e(0x8ae)]=this['_colorCache']||{};if(this['_colorCache'][_0x380b44])return this[_0x31433e(0x8ae)][_0x380b44];const _0x57df9e=VisuMZ[_0x31433e(0x601)][_0x31433e(0x5ba)]['Color'][_0x31433e(0x8a6)];return this[_0x31433e(0x559)](_0x380b44,_0x57df9e);},ColorManager[_0x45f0a9(0x7fb)]=function(){const _0x1bc554=_0x45f0a9,_0x166765=_0x1bc554(0x7f7);this['_colorCache']=this[_0x1bc554(0x8ae)]||{};if(this[_0x1bc554(0x8ae)][_0x166765])return this['_colorCache'][_0x166765];const _0x2e29b7=VisuMZ[_0x1bc554(0x601)]['Settings']['Color'][_0x1bc554(0x755)];return this['getColorDataFromPluginParameters'](_0x166765,_0x2e29b7);},ColorManager['pendingColor']=function(){const _0x389d9e=_0x45f0a9,_0x454186=_0x389d9e(0x5e9);this[_0x389d9e(0x8ae)]=this[_0x389d9e(0x8ae)]||{};if(this[_0x389d9e(0x8ae)][_0x454186])return this[_0x389d9e(0x8ae)][_0x454186];const _0x493527=VisuMZ['CoreEngine'][_0x389d9e(0x5ba)][_0x389d9e(0x28d)]['ColorTPCost'];return this[_0x389d9e(0x559)](_0x454186,_0x493527);},ColorManager['expGaugeColor1']=function(){const _0xf7bc89=_0x45f0a9,_0x198276=_0xf7bc89(0x63f);this[_0xf7bc89(0x8ae)]=this[_0xf7bc89(0x8ae)]||{};if(this['_colorCache'][_0x198276])return this[_0xf7bc89(0x8ae)][_0x198276];const _0x1d3d24=VisuMZ['CoreEngine'][_0xf7bc89(0x5ba)][_0xf7bc89(0x28d)][_0xf7bc89(0x7a4)];return this[_0xf7bc89(0x559)](_0x198276,_0x1d3d24);},ColorManager[_0x45f0a9(0x166)]=function(){const _0x310005=_0x45f0a9,_0x3abe05=_0x310005(0x2db);this[_0x310005(0x8ae)]=this[_0x310005(0x8ae)]||{};if(this[_0x310005(0x8ae)][_0x3abe05])return this[_0x310005(0x8ae)][_0x3abe05];const _0x388b71=VisuMZ[_0x310005(0x601)][_0x310005(0x5ba)][_0x310005(0x28d)][_0x310005(0x38a)];return this[_0x310005(0x559)](_0x3abe05,_0x388b71);},ColorManager[_0x45f0a9(0x425)]=function(){const _0xcfcf58=_0x45f0a9,_0x51d133='_stored_maxLvGaugeColor1';this[_0xcfcf58(0x8ae)]=this[_0xcfcf58(0x8ae)]||{};if(this[_0xcfcf58(0x8ae)][_0x51d133])return this[_0xcfcf58(0x8ae)][_0x51d133];const _0x205861=VisuMZ['CoreEngine'][_0xcfcf58(0x5ba)][_0xcfcf58(0x28d)]['ColorMaxLvGauge1'];return this[_0xcfcf58(0x559)](_0x51d133,_0x205861);},ColorManager[_0x45f0a9(0x3cd)]=function(){const _0x2f323e=_0x45f0a9,_0x48a4fa='_stored_maxLvGaugeColor2';this[_0x2f323e(0x8ae)]=this[_0x2f323e(0x8ae)]||{};if(this[_0x2f323e(0x8ae)][_0x48a4fa])return this[_0x2f323e(0x8ae)][_0x48a4fa];const _0x4510d2=VisuMZ[_0x2f323e(0x601)]['Settings'][_0x2f323e(0x28d)][_0x2f323e(0x150)];return this['getColorDataFromPluginParameters'](_0x48a4fa,_0x4510d2);},ColorManager[_0x45f0a9(0x82d)]=function(_0x2a9c70){const _0x305f44=_0x45f0a9;return VisuMZ['CoreEngine'][_0x305f44(0x5ba)][_0x305f44(0x28d)][_0x305f44(0x587)][_0x305f44(0x573)](this,_0x2a9c70);},ColorManager[_0x45f0a9(0x7bd)]=function(_0xd04bb9){const _0x5d87d0=_0x45f0a9;return VisuMZ[_0x5d87d0(0x601)][_0x5d87d0(0x5ba)][_0x5d87d0(0x28d)][_0x5d87d0(0x121)][_0x5d87d0(0x573)](this,_0xd04bb9);},ColorManager[_0x45f0a9(0x377)]=function(_0x145d10){const _0x397b1e=_0x45f0a9;return VisuMZ[_0x397b1e(0x601)][_0x397b1e(0x5ba)]['Color'][_0x397b1e(0x62a)][_0x397b1e(0x573)](this,_0x145d10);},ColorManager[_0x45f0a9(0x4ed)]=function(_0x46a39c){const _0x32c562=_0x45f0a9;return VisuMZ[_0x32c562(0x601)][_0x32c562(0x5ba)][_0x32c562(0x28d)]['ParamChange'][_0x32c562(0x573)](this,_0x46a39c);},ColorManager[_0x45f0a9(0x38c)]=function(_0xcc1035){const _0x2f041b=_0x45f0a9;return VisuMZ[_0x2f041b(0x601)][_0x2f041b(0x5ba)][_0x2f041b(0x28d)][_0x2f041b(0x584)]['call'](this,_0xcc1035);},ColorManager[_0x45f0a9(0x886)]=function(){const _0x14808a=_0x45f0a9;return VisuMZ['CoreEngine'][_0x14808a(0x5ba)][_0x14808a(0x28d)][_0x14808a(0x594)];},ColorManager[_0x45f0a9(0x713)]=function(){const _0x589e31=_0x45f0a9;return VisuMZ[_0x589e31(0x601)][_0x589e31(0x5ba)][_0x589e31(0x28d)][_0x589e31(0x702)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager['outlineColorGauge']=function(){const _0x2fa682=_0x45f0a9;return VisuMZ[_0x2fa682(0x601)][_0x2fa682(0x5ba)][_0x2fa682(0x28d)][_0x2fa682(0x52e)]||_0x2fa682(0x5f8);},ColorManager[_0x45f0a9(0x486)]=function(){const _0x108ff5=_0x45f0a9;return VisuMZ[_0x108ff5(0x601)][_0x108ff5(0x5ba)][_0x108ff5(0x28d)][_0x108ff5(0x3fd)];},ColorManager[_0x45f0a9(0x1e2)]=function(){const _0x1cb6a4=_0x45f0a9;return VisuMZ[_0x1cb6a4(0x601)]['Settings'][_0x1cb6a4(0x28d)][_0x1cb6a4(0x1e8)];},ColorManager['itemBackColor1']=function(){const _0x474ec0=_0x45f0a9;return VisuMZ[_0x474ec0(0x601)][_0x474ec0(0x5ba)][_0x474ec0(0x28d)][_0x474ec0(0x5db)];},ColorManager['itemBackColor2']=function(){const _0x274b59=_0x45f0a9;return VisuMZ[_0x274b59(0x601)][_0x274b59(0x5ba)][_0x274b59(0x28d)][_0x274b59(0x761)];},SceneManager[_0x45f0a9(0x120)]=[],SceneManager[_0x45f0a9(0x28b)]=function(){const _0x50d9d9=_0x45f0a9;return this['_scene']&&this[_0x50d9d9(0x4a0)][_0x50d9d9(0x1d3)]===Scene_Battle;},SceneManager[_0x45f0a9(0x8fd)]=function(){const _0x19f80b=_0x45f0a9;return this[_0x19f80b(0x4a0)]&&this[_0x19f80b(0x4a0)][_0x19f80b(0x1d3)]===Scene_Map;},SceneManager[_0x45f0a9(0x88d)]=function(){const _0x433243=_0x45f0a9;return this[_0x433243(0x4a0)]&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x786)]=SceneManager['initialize'],SceneManager[_0x45f0a9(0x73f)]=function(){const _0x1a2153=_0x45f0a9;VisuMZ['CoreEngine']['SceneManager_initialize']['call'](this),this[_0x1a2153(0x834)]();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x1c9)]=SceneManager[_0x45f0a9(0x814)],SceneManager[_0x45f0a9(0x814)]=function(_0x247640){const _0x526752=_0x45f0a9;if($gameTemp)this['onKeyDownKeysF6F7'](_0x247640);VisuMZ['CoreEngine'][_0x526752(0x1c9)]['call'](this,_0x247640);},SceneManager[_0x45f0a9(0x503)]=function(_0x34e8fd){const _0x14cb61=_0x45f0a9;if(!_0x34e8fd[_0x14cb61(0x1a0)]&&!_0x34e8fd[_0x14cb61(0x4a7)])switch(_0x34e8fd[_0x14cb61(0x7d9)]){case 0x52:this[_0x14cb61(0x7c6)]();break;case 0x54:this[_0x14cb61(0x727)]();break;case 0x75:this[_0x14cb61(0x809)]();break;case 0x76:if(Input[_0x14cb61(0x16c)]('shift')||Input[_0x14cb61(0x16c)](_0x14cb61(0x3cf)))return;this[_0x14cb61(0x4a2)]();break;}else{if(_0x34e8fd[_0x14cb61(0x1a0)]){let _0x2fa4f9=_0x34e8fd[_0x14cb61(0x7d9)];if(_0x2fa4f9>=0x31&&_0x2fa4f9<=0x39){const _0x39d052=_0x2fa4f9-0x30;return SceneManager[_0x14cb61(0x76e)](_0x39d052);}else{if(_0x2fa4f9>=0x61&&_0x2fa4f9<=0x69){const _0x1db2a9=_0x2fa4f9-0x60;return SceneManager['playtestQuickLoad'](_0x1db2a9);}}}}},SceneManager['playTestF6']=function(){const _0x6c47b2=_0x45f0a9;if($gameTemp[_0x6c47b2(0x88e)]()&&VisuMZ['CoreEngine'][_0x6c47b2(0x5ba)][_0x6c47b2(0x8f1)]['F6key']){ConfigManager[_0x6c47b2(0x777)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x6c47b2(0x894)]=0x0,ConfigManager[_0x6c47b2(0x467)]=0x0,ConfigManager['seVolume']=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x6c47b2(0x467)]=0x64,ConfigManager[_0x6c47b2(0x777)]=0x64);ConfigManager[_0x6c47b2(0x8db)]();if(this[_0x6c47b2(0x4a0)][_0x6c47b2(0x1d3)]===Scene_Options){if(this['_scene'][_0x6c47b2(0x8d4)])this[_0x6c47b2(0x4a0)][_0x6c47b2(0x8d4)][_0x6c47b2(0x302)]();if(this[_0x6c47b2(0x4a0)][_0x6c47b2(0x720)])this['_scene']['_listWindow']['refresh']();}}},SceneManager[_0x45f0a9(0x4a2)]=function(){const _0x34c819=_0x45f0a9;$gameTemp[_0x34c819(0x88e)]()&&VisuMZ[_0x34c819(0x601)][_0x34c819(0x5ba)][_0x34c819(0x8f1)]['F7key']&&($gameTemp[_0x34c819(0x21d)]=!$gameTemp['_playTestFastMode']);},SceneManager[_0x45f0a9(0x7c6)]=function(){const _0x493e98=_0x45f0a9;if(!VisuMZ[_0x493e98(0x601)]['Settings']['QoL'][_0x493e98(0x1b6)])return;if(!$gameTemp['isPlaytest']())return;if(!SceneManager['isSceneBattle']())return;if(!Input[_0x493e98(0x16c)](_0x493e98(0x491)))return;for(const _0x38c604 of $gameParty[_0x493e98(0x1e9)]()){if(!_0x38c604)continue;_0x38c604[_0x493e98(0x680)]();}},SceneManager[_0x45f0a9(0x727)]=function(){const _0x333995=_0x45f0a9;if(!VisuMZ[_0x333995(0x601)][_0x333995(0x5ba)][_0x333995(0x8f1)][_0x333995(0x158)])return;if(!$gameTemp[_0x333995(0x88e)]())return;if(!SceneManager[_0x333995(0x28b)]())return;if(!Input[_0x333995(0x16c)](_0x333995(0x491)))return;for(const _0x1117bd of $gameParty['members']()){if(!_0x1117bd)continue;_0x1117bd[_0x333995(0x261)](_0x1117bd['maxTp']());}},SceneManager[_0x45f0a9(0x76e)]=function(_0x67125){const _0x13d3e7=_0x45f0a9;if(!$gameTemp[_0x13d3e7(0x88e)]())return;if(!DataManager[_0x13d3e7(0x1ec)](_0x67125))return;if(!(VisuMZ['CoreEngine'][_0x13d3e7(0x5ba)][_0x13d3e7(0x8f1)][_0x13d3e7(0x202)]??!![]))return;this[_0x13d3e7(0x5f7)](Scene_QuickLoad),this[_0x13d3e7(0x8a3)](_0x67125);},SceneManager[_0x45f0a9(0x834)]=function(){const _0x130b37=_0x45f0a9;this[_0x130b37(0x3a6)]=![],this[_0x130b37(0x87f)]=!VisuMZ[_0x130b37(0x601)][_0x130b37(0x5ba)]['UI'][_0x130b37(0x281)];},SceneManager[_0x45f0a9(0x39b)]=function(_0x2ddd23){const _0x52add7=_0x45f0a9;VisuMZ['CoreEngine'][_0x52add7(0x5ba)]['UI'][_0x52add7(0x8ac)]&&(this[_0x52add7(0x3a6)]=_0x2ddd23);},SceneManager[_0x45f0a9(0x5f1)]=function(){const _0x2c519e=_0x45f0a9;return this[_0x2c519e(0x3a6)];},SceneManager[_0x45f0a9(0x60d)]=function(){const _0x5c7d49=_0x45f0a9;return this[_0x5c7d49(0x87f)];},SceneManager[_0x45f0a9(0x68c)]=function(){const _0xe1a5a0=_0x45f0a9;return this[_0xe1a5a0(0x60d)]()||this[_0xe1a5a0(0x5f1)]();},VisuMZ['CoreEngine'][_0x45f0a9(0x47d)]=SceneManager[_0x45f0a9(0x597)],SceneManager[_0x45f0a9(0x597)]=function(){const _0x23ff84=_0x45f0a9;return VisuMZ[_0x23ff84(0x601)]['Settings'][_0x23ff84(0x8f1)][_0x23ff84(0x37a)]?VisuMZ[_0x23ff84(0x601)][_0x23ff84(0x47d)][_0x23ff84(0x573)](this):!![];},SceneManager[_0x45f0a9(0x317)]=function(_0x45f438){const _0x5e3205=_0x45f0a9;if(_0x45f438 instanceof Error)this[_0x5e3205(0x26b)](_0x45f438);else _0x45f438 instanceof Array&&_0x45f438[0x0]===_0x5e3205(0x6b2)?this[_0x5e3205(0x4a8)](_0x45f438):this[_0x5e3205(0x477)](_0x45f438);this[_0x5e3205(0x18c)]();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x452)]=BattleManager[_0x45f0a9(0x3dd)],BattleManager[_0x45f0a9(0x3dd)]=function(){const _0x5b68cf=_0x45f0a9;return VisuMZ[_0x5b68cf(0x601)]['Settings'][_0x5b68cf(0x8f1)][_0x5b68cf(0x6aa)]?this[_0x5b68cf(0x7d8)]():VisuMZ['CoreEngine'][_0x5b68cf(0x452)][_0x5b68cf(0x573)](this);},BattleManager[_0x45f0a9(0x7d8)]=function(){const _0x454aaa=_0x45f0a9;return $gameParty['performEscape'](),SoundManager[_0x454aaa(0x728)](),this[_0x454aaa(0x816)](),!![];},BattleManager['isTpb']=function(){const _0x34bdce=_0x45f0a9;return $gameSystem[_0x34bdce(0x87a)]()>=0x1;},BattleManager[_0x45f0a9(0x78f)]=function(){const _0x58e8a7=_0x45f0a9;return $gameSystem[_0x58e8a7(0x87a)]()===0x1;},VisuMZ[_0x45f0a9(0x601)]['Game_Temp_initialize']=Game_Temp[_0x45f0a9(0x7bc)]['initialize'],Game_Temp[_0x45f0a9(0x7bc)]['initialize']=function(){const _0x6ff98a=_0x45f0a9;VisuMZ[_0x6ff98a(0x601)]['Game_Temp_initialize'][_0x6ff98a(0x573)](this),this['forceOutOfPlaytest'](),this[_0x6ff98a(0x1c4)](),this[_0x6ff98a(0x571)]();},Game_Temp[_0x45f0a9(0x7bc)]['forceOutOfPlaytest']=function(){const _0x7a02c7=_0x45f0a9;VisuMZ[_0x7a02c7(0x601)]['Settings']['QoL'][_0x7a02c7(0x686)]&&(this[_0x7a02c7(0x5aa)]=![]);},Game_Temp[_0x45f0a9(0x7bc)][_0x45f0a9(0x3e1)]=function(_0x5533dd){this['_lastPluginCommandInterpreter']=_0x5533dd;},Game_Temp['prototype']['getLastPluginCommandInterpreter']=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x45f0a9(0x7bc)][_0x45f0a9(0x624)]=function(){const _0x4eab8c=_0x45f0a9;this[_0x4eab8c(0x7da)]=undefined,this[_0x4eab8c(0x6f0)]=undefined,this['_forcedBattleGridSystem']=undefined;},Game_Temp[_0x45f0a9(0x7bc)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x3d10bd){const _0x5dda3e=_0x45f0a9;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x5dda3e(0x20b)]($dataMap[_0x5dda3e(0x483)]);const _0x579cec=$dataTroops[_0x3d10bd];if(_0x579cec){let _0x39215e=DataManager['createTroopNote'](_0x579cec['id']);this[_0x5dda3e(0x20b)](_0x39215e);}},Game_Temp[_0x45f0a9(0x7bc)][_0x45f0a9(0x20b)]=function(_0x414128){const _0x211f72=_0x45f0a9;if(!_0x414128)return;if(_0x414128[_0x211f72(0x2ee)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x211f72(0x7da)]='FV';else{if(_0x414128[_0x211f72(0x2ee)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x211f72(0x7da)]='SV';else{if(_0x414128['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x3590ea=String(RegExp['$1']);if(_0x3590ea[_0x211f72(0x2ee)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x211f72(0x7da)]='FV';else _0x3590ea['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x414128[_0x211f72(0x2ee)](/<(?:DTB)>/i))this[_0x211f72(0x6f0)]=0x0;else{if(_0x414128[_0x211f72(0x2ee)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x211f72(0x6f0)]=0x1;else{if(_0x414128[_0x211f72(0x2ee)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x211f72(0x6f0)]=0x2;else{if(_0x414128[_0x211f72(0x2ee)](/<(?:TPB|ATB)>/i))this['_forcedBattleSys']=0x2;else{if(_0x414128['match'](/<(?:CTB)>/i))Imported[_0x211f72(0x15e)]&&(this['_forcedBattleSys']='CTB');else{if(_0x414128[_0x211f72(0x2ee)](/<(?:STB)>/i))Imported[_0x211f72(0x8f5)]&&(this[_0x211f72(0x6f0)]='STB');else{if(_0x414128[_0x211f72(0x2ee)](/<(?:BTB)>/i))Imported[_0x211f72(0x836)]&&(this[_0x211f72(0x6f0)]=_0x211f72(0x41e));else{if(_0x414128[_0x211f72(0x2ee)](/<(?:FTB)>/i))Imported[_0x211f72(0x381)]&&(this[_0x211f72(0x6f0)]=_0x211f72(0x175));else{if(_0x414128['match'](/<(?:OTB)>/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x211f72(0x6f0)]='OTB');else{if(_0x414128['match'](/<(?:ETB)>/i))Imported[_0x211f72(0x68e)]&&(this['_forcedBattleSys']=_0x211f72(0x545));else{if(_0x414128[_0x211f72(0x2ee)](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this[_0x211f72(0x6f0)]='PTB');else{if(_0x414128['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x262929=String(RegExp['$1']);if(_0x262929[_0x211f72(0x2ee)](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x262929['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x211f72(0x6f0)]=0x1;else{if(_0x262929[_0x211f72(0x2ee)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x211f72(0x6f0)]=0x2;else{if(_0x262929[_0x211f72(0x2ee)](/CTB/i))Imported[_0x211f72(0x15e)]&&(this[_0x211f72(0x6f0)]=_0x211f72(0x8b8));else{if(_0x262929['match'](/STB/i))Imported[_0x211f72(0x8f5)]&&(this[_0x211f72(0x6f0)]=_0x211f72(0x164));else{if(_0x262929[_0x211f72(0x2ee)](/BTB/i))Imported[_0x211f72(0x836)]&&(this[_0x211f72(0x6f0)]='BTB');else{if(_0x262929[_0x211f72(0x2ee)](/FTB/i))Imported[_0x211f72(0x381)]&&(this[_0x211f72(0x6f0)]='FTB');else{if(_0x262929[_0x211f72(0x2ee)](/OTB/i))Imported[_0x211f72(0x1f5)]&&(this[_0x211f72(0x6f0)]='OTB');else{if(_0x262929[_0x211f72(0x2ee)](/ETB/i))Imported[_0x211f72(0x68e)]&&(this[_0x211f72(0x6f0)]='ETB');else _0x262929[_0x211f72(0x2ee)](/PTB/i)&&(Imported[_0x211f72(0x501)]&&(this[_0x211f72(0x6f0)]=_0x211f72(0x194)));}}}}}}}}}}}}}}}}}}}}if(_0x414128[_0x211f72(0x2ee)](/<(?:|BATTLE )GRID>/i))this[_0x211f72(0x3d6)]=!![];else _0x414128[_0x211f72(0x2ee)](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x211f72(0x3d6)]=![]);},Game_Temp[_0x45f0a9(0x7bc)][_0x45f0a9(0x1c4)]=function(){const _0x294c9d=_0x45f0a9;this[_0x294c9d(0x1cf)]=[];},Game_Temp['prototype'][_0x45f0a9(0x20c)]=function(_0x488b1a,_0x2d91c8,_0x138d3f,_0x23a9bc){const _0x358fd3=_0x45f0a9;if(!this['showFauxAnimations']())return;_0x138d3f=_0x138d3f||![],_0x23a9bc=_0x23a9bc||![];if($dataAnimations[_0x2d91c8]){const _0xc7b2e5={'targets':_0x488b1a,'animationId':_0x2d91c8,'mirror':_0x138d3f,'mute':_0x23a9bc};this['_fauxAnimationQueue'][_0x358fd3(0x5f7)](_0xc7b2e5);for(const _0x5411bb of _0x488b1a){_0x5411bb['startAnimation']&&_0x5411bb[_0x358fd3(0x714)]();}}},Game_Temp[_0x45f0a9(0x7bc)]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x45f0a9(0x7bc)][_0x45f0a9(0x28c)]=function(){const _0x373c8e=_0x45f0a9;return this[_0x373c8e(0x1cf)][_0x373c8e(0x491)]();},Game_Temp['prototype'][_0x45f0a9(0x571)]=function(){const _0x2f3ecf=_0x45f0a9;this[_0x2f3ecf(0x216)]=[];},Game_Temp[_0x45f0a9(0x7bc)][_0x45f0a9(0x272)]=function(_0x5a8d54,_0x311bf5,_0x391a44,_0x434d60,_0x59d60b){const _0x299484=_0x45f0a9;if(!this['showPointAnimations']())return;_0x434d60=_0x434d60||![],_0x59d60b=_0x59d60b||![];if($dataAnimations[_0x391a44]){const _0x38b3bf={'x':_0x5a8d54,'y':_0x311bf5,'animationId':_0x391a44,'mirror':_0x434d60,'mute':_0x59d60b};this[_0x299484(0x216)]['push'](_0x38b3bf);}},Game_Temp[_0x45f0a9(0x7bc)][_0x45f0a9(0x387)]=function(){return!![];},Game_Temp[_0x45f0a9(0x7bc)][_0x45f0a9(0x70e)]=function(){const _0x5f1367=_0x45f0a9;return this['_pointAnimationQueue'][_0x5f1367(0x491)]();},VisuMZ['CoreEngine'][_0x45f0a9(0x2f5)]=Game_System['prototype']['initialize'],Game_System['prototype'][_0x45f0a9(0x73f)]=function(){const _0x5561a0=_0x45f0a9;VisuMZ['CoreEngine'][_0x5561a0(0x2f5)][_0x5561a0(0x573)](this),this['initCoreEngine']();},Game_System[_0x45f0a9(0x7bc)]['initCoreEngine']=function(){const _0x5c3161=_0x45f0a9;this[_0x5c3161(0x84f)]={'SideView':$dataSystem[_0x5c3161(0x7cb)],'BattleSystem':this[_0x5c3161(0x3a8)](),'FontSize':$dataSystem[_0x5c3161(0x3c9)][_0x5c3161(0x30c)],'Padding':0xc};},Game_System['prototype']['isSideView']=function(){const _0x53233f=_0x45f0a9;if($gameTemp[_0x53233f(0x7da)]==='SV')return!![];else{if($gameTemp[_0x53233f(0x7da)]==='FV')return![];}if(this[_0x53233f(0x84f)]===undefined)this[_0x53233f(0x4ab)]();if(this['_CoreEngineSettings']['SideView']===undefined)this['initCoreEngine']();return this[_0x53233f(0x84f)][_0x53233f(0x83e)];},Game_System[_0x45f0a9(0x7bc)][_0x45f0a9(0x3f6)]=function(_0x15d86b){const _0x37ffdb=_0x45f0a9;if(this['_CoreEngineSettings']===undefined)this[_0x37ffdb(0x4ab)]();if(this[_0x37ffdb(0x84f)][_0x37ffdb(0x83e)]===undefined)this[_0x37ffdb(0x4ab)]();this[_0x37ffdb(0x84f)]['SideView']=_0x15d86b;},Game_System['prototype'][_0x45f0a9(0x219)]=function(){const _0x32a6f5=_0x45f0a9;if(this[_0x32a6f5(0x84f)]===undefined)this[_0x32a6f5(0x4ab)]();this[_0x32a6f5(0x84f)]['BattleSystem']=this[_0x32a6f5(0x3a8)]();},Game_System['prototype'][_0x45f0a9(0x3a8)]=function(){const _0x248866=_0x45f0a9,_0x2a6854=(VisuMZ['CoreEngine']['Settings']['BattleSystem']||_0x248866(0x617))[_0x248866(0x26d)]()[_0x248866(0x88c)]();return VisuMZ[_0x248866(0x601)][_0x248866(0x78c)](_0x2a6854);},Game_System[_0x45f0a9(0x7bc)]['getBattleSystem']=function(){const _0x54d73c=_0x45f0a9;if($gameTemp[_0x54d73c(0x6f0)]!==undefined)return $gameTemp[_0x54d73c(0x6f0)];if(this['_CoreEngineSettings']===undefined)this[_0x54d73c(0x4ab)]();if(this[_0x54d73c(0x84f)]['BattleSystem']===undefined)this[_0x54d73c(0x219)]();return this[_0x54d73c(0x84f)][_0x54d73c(0x16e)];},Game_System['prototype'][_0x45f0a9(0x8bf)]=function(_0x2b14a5){const _0x5a3cce=_0x45f0a9;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x5a3cce(0x84f)][_0x5a3cce(0x16e)]===undefined)this[_0x5a3cce(0x219)]();this['_CoreEngineSettings'][_0x5a3cce(0x16e)]=_0x2b14a5;},Game_System[_0x45f0a9(0x7bc)][_0x45f0a9(0x310)]=function(){const _0x209dfc=_0x45f0a9;if(this[_0x209dfc(0x84f)]===undefined)this[_0x209dfc(0x4ab)]();if(this[_0x209dfc(0x84f)][_0x209dfc(0x4b3)]===undefined)this['initCoreEngine']();return this[_0x209dfc(0x84f)][_0x209dfc(0x4b3)];},Game_System[_0x45f0a9(0x7bc)][_0x45f0a9(0x7fe)]=function(_0x702b4b){const _0x4db68f=_0x45f0a9;if(this[_0x4db68f(0x84f)]===undefined)this[_0x4db68f(0x4ab)]();if(this[_0x4db68f(0x84f)][_0x4db68f(0x875)]===undefined)this[_0x4db68f(0x4ab)]();this[_0x4db68f(0x84f)][_0x4db68f(0x4b3)]=_0x702b4b;},Game_System['prototype']['windowPadding']=function(){const _0x1cb1a2=_0x45f0a9;if(this['_CoreEngineSettings']===undefined)this[_0x1cb1a2(0x4ab)]();if(this[_0x1cb1a2(0x84f)][_0x1cb1a2(0x89d)]===undefined)this['initCoreEngine']();return this[_0x1cb1a2(0x84f)][_0x1cb1a2(0x89d)];},Game_System[_0x45f0a9(0x7bc)][_0x45f0a9(0x296)]=function(_0x30f474){const _0x3f1461=_0x45f0a9;if(this[_0x3f1461(0x84f)]===undefined)this[_0x3f1461(0x4ab)]();if(this[_0x3f1461(0x84f)]['TimeProgress']===undefined)this[_0x3f1461(0x4ab)]();this[_0x3f1461(0x84f)][_0x3f1461(0x89d)]=_0x30f474;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x621)]=Game_Screen[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)],Game_Screen[_0x45f0a9(0x7bc)]['initialize']=function(){const _0x245cd5=_0x45f0a9;VisuMZ[_0x245cd5(0x601)][_0x245cd5(0x621)][_0x245cd5(0x573)](this),this[_0x245cd5(0x80e)]();},Game_Screen[_0x45f0a9(0x7bc)][_0x45f0a9(0x80e)]=function(){const _0x4e46ec=_0x45f0a9,_0x51ce0b=VisuMZ['CoreEngine'][_0x4e46ec(0x5ba)][_0x4e46ec(0x338)];this[_0x4e46ec(0x46e)]=_0x51ce0b?.[_0x4e46ec(0x4ba)]||_0x4e46ec(0x779);},Game_Screen[_0x45f0a9(0x7bc)][_0x45f0a9(0x3ef)]=function(){const _0x587bc7=_0x45f0a9;if(this[_0x587bc7(0x46e)]===undefined)this[_0x587bc7(0x80e)]();return this[_0x587bc7(0x46e)];},Game_Screen[_0x45f0a9(0x7bc)]['setCoreEngineScreenShakeStyle']=function(_0x447e53){const _0x530758=_0x45f0a9;if(this[_0x530758(0x46e)]===undefined)this[_0x530758(0x80e)]();this['_coreEngineShakeStyle']=_0x447e53['toLowerCase']()[_0x530758(0x88c)]();},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x4fd)]=function(){const _0x356b58=_0x45f0a9;if($gameParty['inBattle']())return![];return this[_0x356b58(0x5b8)]()&&this[_0x356b58(0x5b8)]()[_0x356b58(0x249)](0x0)==='!';},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x5b8)]=function(){const _0x5a9709=_0x45f0a9;return this[_0x5a9709(0x229)]['split']('/')[_0x5a9709(0x3d1)]();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x58a)]=Game_Picture[_0x45f0a9(0x7bc)]['x'],Game_Picture[_0x45f0a9(0x7bc)]['x']=function(){const _0x514c04=_0x45f0a9;return this[_0x514c04(0x4fd)]()?this['xScrollLinkedOffset']():VisuMZ[_0x514c04(0x601)][_0x514c04(0x58a)][_0x514c04(0x573)](this);},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x1f9)]=function(){const _0x3a5f05=_0x45f0a9,_0x41891b=$gameMap[_0x3a5f05(0x608)]()*$gameMap[_0x3a5f05(0x28e)]();return(this['_x']-_0x41891b)*$gameScreen[_0x3a5f05(0x81a)]();},VisuMZ[_0x45f0a9(0x601)]['Game_Picture_y']=Game_Picture[_0x45f0a9(0x7bc)]['y'],Game_Picture[_0x45f0a9(0x7bc)]['y']=function(){const _0x43f8f2=_0x45f0a9;return this[_0x43f8f2(0x4fd)]()?this[_0x43f8f2(0x125)]():VisuMZ[_0x43f8f2(0x601)]['Game_Picture_y'][_0x43f8f2(0x573)](this);},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x125)]=function(){const _0x219920=_0x45f0a9,_0xb4ce9e=$gameMap['displayY']()*$gameMap[_0x219920(0x62e)]();return(this['_y']-_0xb4ce9e)*$gameScreen[_0x219920(0x81a)]();},VisuMZ['CoreEngine'][_0x45f0a9(0x76b)]=Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x24f)],Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x24f)]=function(){const _0xe848f7=_0x45f0a9;let _0x33c281=VisuMZ[_0xe848f7(0x601)][_0xe848f7(0x76b)][_0xe848f7(0x573)](this);return this[_0xe848f7(0x4fd)]()&&(_0x33c281*=$gameScreen['zoomScale']()),_0x33c281;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x7f4)]=Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x817)],Game_Picture[_0x45f0a9(0x7bc)]['scaleY']=function(){const _0x485882=_0x45f0a9;let _0x50c99a=VisuMZ[_0x485882(0x601)]['Game_Picture_scaleY'][_0x485882(0x573)](this);return this[_0x485882(0x4fd)]()&&(_0x50c99a*=$gameScreen[_0x485882(0x81a)]()),_0x50c99a;},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x564)]=function(_0x49e6fc){const _0x346277=_0x45f0a9;this[_0x346277(0x839)]=_0x49e6fc;},VisuMZ['CoreEngine']['Game_Picture_calcEasing']=Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x65e)],Game_Picture['prototype']['calcEasing']=function(_0x51242e){const _0x27210b=_0x45f0a9;return this[_0x27210b(0x839)]=this[_0x27210b(0x839)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x27210b(0x839)])?VisuMZ[_0x27210b(0x601)][_0x27210b(0x7f1)][_0x27210b(0x573)](this,_0x51242e):VisuMZ['ApplyEasing'](_0x51242e,this['_coreEasingType']);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x8fb)]=Game_Picture[_0x45f0a9(0x7bc)]['initRotation'],Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x1f0)]=function(){const _0x5d04cb=_0x45f0a9;VisuMZ[_0x5d04cb(0x601)][_0x5d04cb(0x8fb)]['call'](this),this['initRotationCoreEngine']();},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x6cc)]=function(){const _0x51244c=_0x45f0a9;this['_anglePlus']={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x51244c(0x7e6)};},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x815)]=Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x4b1)],Game_Picture['prototype'][_0x45f0a9(0x4b1)]=function(){const _0x42ca42=_0x45f0a9;let _0xcf73c2=VisuMZ[_0x42ca42(0x601)][_0x42ca42(0x815)]['call'](this);return _0xcf73c2+=this[_0x42ca42(0x8b5)](),_0xcf73c2;},Game_Picture['prototype'][_0x45f0a9(0x8b5)]=function(){const _0x18a474=_0x45f0a9;if(this[_0x18a474(0x57a)]===undefined)this['initRotationCoreEngine']();return this[_0x18a474(0x57a)][_0x18a474(0x2d5)]||0x0;},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x245)]=function(_0x2419b3,_0x2a7cf2,_0x3d7660){const _0xe90dbd=_0x45f0a9;if(this['_anglePlus']===undefined)this[_0xe90dbd(0x6cc)]();this[_0xe90dbd(0x57a)][_0xe90dbd(0x1dd)]=_0x2419b3||0x0,this[_0xe90dbd(0x57a)][_0xe90dbd(0x2d9)]=_0x2a7cf2||0x0,this[_0xe90dbd(0x57a)][_0xe90dbd(0x33b)]=_0x2a7cf2||0x0,this[_0xe90dbd(0x57a)][_0xe90dbd(0x765)]=_0x3d7660||_0xe90dbd(0x7e6),_0x2a7cf2<=0x0&&(this[_0xe90dbd(0x57a)][_0xe90dbd(0x2d5)]=this[_0xe90dbd(0x57a)]['target']);},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x577)]=function(_0x2b2a60,_0x3608ba,_0x2ecf9e){const _0x21f4c1=_0x45f0a9;if(this['_anglePlus']===undefined)this['initRotationCoreEngine']();this[_0x21f4c1(0x57a)][_0x21f4c1(0x1dd)]+=_0x2b2a60||0x0,this['_anglePlus'][_0x21f4c1(0x2d9)]=_0x3608ba||0x0,this[_0x21f4c1(0x57a)]['wholeDuration']=_0x3608ba||0x0,this['_anglePlus'][_0x21f4c1(0x765)]=_0x2ecf9e||_0x21f4c1(0x7e6),_0x3608ba<=0x0&&(this[_0x21f4c1(0x57a)][_0x21f4c1(0x2d5)]=this[_0x21f4c1(0x57a)][_0x21f4c1(0x1dd)]);},VisuMZ['CoreEngine']['Game_Picture_updateRotation']=Game_Picture['prototype'][_0x45f0a9(0x665)],Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x665)]=function(){const _0x1cc007=_0x45f0a9;VisuMZ[_0x1cc007(0x601)][_0x1cc007(0x715)]['call'](this),this[_0x1cc007(0x311)]();},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x311)]=function(){const _0x60f145=_0x45f0a9;if(this[_0x60f145(0x57a)]===undefined)this[_0x60f145(0x6cc)]();const _0x55c9b8=this[_0x60f145(0x57a)];if(_0x55c9b8[_0x60f145(0x2d9)]<=0x0)return;_0x55c9b8[_0x60f145(0x2d5)]=this['applyEasingAnglePlus'](_0x55c9b8[_0x60f145(0x2d5)],_0x55c9b8[_0x60f145(0x1dd)]),_0x55c9b8['duration']--,_0x55c9b8[_0x60f145(0x2d9)]<=0x0&&(_0x55c9b8['current']=_0x55c9b8[_0x60f145(0x1dd)]);},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x19a)]=function(_0x188d44,_0x5269cd){const _0x374344=_0x45f0a9,_0x1af98e=this[_0x374344(0x57a)],_0x2b8170=_0x1af98e[_0x374344(0x765)],_0x1ec582=_0x1af98e[_0x374344(0x2d9)],_0x3eb952=_0x1af98e[_0x374344(0x33b)],_0x2ba4e0=VisuMZ['ApplyEasing']((_0x3eb952-_0x1ec582)/_0x3eb952,_0x2b8170),_0x5d3077=VisuMZ['ApplyEasing']((_0x3eb952-_0x1ec582+0x1)/_0x3eb952,_0x2b8170),_0x27d1f6=(_0x188d44-_0x5269cd*_0x2ba4e0)/(0x1-_0x2ba4e0);return _0x27d1f6+(_0x5269cd-_0x27d1f6)*_0x5d3077;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x341)]=Game_Action[_0x45f0a9(0x7bc)][_0x45f0a9(0x426)],Game_Action[_0x45f0a9(0x7bc)][_0x45f0a9(0x426)]=function(_0x40e6d7){const _0x55c1d6=_0x45f0a9;return VisuMZ[_0x55c1d6(0x601)][_0x55c1d6(0x5ba)][_0x55c1d6(0x8f1)][_0x55c1d6(0x8f4)]?this[_0x55c1d6(0x39d)](_0x40e6d7):VisuMZ['CoreEngine']['Game_Action_itemHit'][_0x55c1d6(0x573)](this,_0x40e6d7);},Game_Action[_0x45f0a9(0x7bc)][_0x45f0a9(0x39d)]=function(_0x405456){const _0x47c5f6=_0x45f0a9,_0x30420b=this[_0x47c5f6(0x11b)](_0x405456),_0x21bf12=this[_0x47c5f6(0x7ca)](_0x405456),_0x43a844=this[_0x47c5f6(0x8df)](_0x405456);return _0x30420b*(_0x21bf12-_0x43a844);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x638)]=Game_Action['prototype'][_0x45f0a9(0x5fb)],Game_Action['prototype'][_0x45f0a9(0x5fb)]=function(_0x295ee1){const _0x373d73=_0x45f0a9;return VisuMZ['CoreEngine'][_0x373d73(0x5ba)][_0x373d73(0x8f1)][_0x373d73(0x8f4)]?0x0:VisuMZ[_0x373d73(0x601)][_0x373d73(0x638)][_0x373d73(0x573)](this,_0x295ee1);},Game_Action[_0x45f0a9(0x7bc)]['itemSuccessRate']=function(_0x40e808){const _0x59b6a6=_0x45f0a9;return this['item']()[_0x59b6a6(0x610)]*0.01;},Game_Action['prototype'][_0x45f0a9(0x7ca)]=function(_0x35a2c6){const _0x34510a=_0x45f0a9;if(VisuMZ[_0x34510a(0x601)][_0x34510a(0x5ba)][_0x34510a(0x8f1)]['AccuracyBoost']&&this[_0x34510a(0x484)]())return 0x1;return this[_0x34510a(0x402)]()?VisuMZ[_0x34510a(0x601)][_0x34510a(0x5ba)][_0x34510a(0x8f1)]['AccuracyBoost']&&this[_0x34510a(0x644)]()[_0x34510a(0x29a)]()?this[_0x34510a(0x644)]()['hit']+0.05:this[_0x34510a(0x644)]()[_0x34510a(0x5c6)]:0x1;},Game_Action[_0x45f0a9(0x7bc)][_0x45f0a9(0x8df)]=function(_0x4940c2){const _0x3a2dba=_0x45f0a9;if(this[_0x3a2dba(0x644)]()[_0x3a2dba(0x29a)]()===_0x4940c2[_0x3a2dba(0x29a)]())return 0x0;if(this[_0x3a2dba(0x402)]())return VisuMZ['CoreEngine'][_0x3a2dba(0x5ba)][_0x3a2dba(0x8f1)]['AccuracyBoost']&&_0x4940c2[_0x3a2dba(0x845)]()?_0x4940c2[_0x3a2dba(0x810)]-0.05:_0x4940c2[_0x3a2dba(0x810)];else return this[_0x3a2dba(0x36d)]()?_0x4940c2[_0x3a2dba(0x2c6)]:0x0;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x708)]=Game_Action['prototype'][_0x45f0a9(0x8b7)],Game_Action[_0x45f0a9(0x7bc)]['updateLastTarget']=function(_0x252954){const _0x180c2b=_0x45f0a9;VisuMZ['CoreEngine'][_0x180c2b(0x708)][_0x180c2b(0x573)](this,_0x252954);if(VisuMZ['CoreEngine'][_0x180c2b(0x5ba)][_0x180c2b(0x8f1)][_0x180c2b(0x8f4)])return;const _0x157151=_0x252954[_0x180c2b(0x3f5)]();_0x157151[_0x180c2b(0x43c)]&&(0x1-this[_0x180c2b(0x5fb)](_0x252954)>this[_0x180c2b(0x426)](_0x252954)&&(_0x157151[_0x180c2b(0x43c)]=![],_0x157151[_0x180c2b(0x35d)]=!![]));},VisuMZ['CoreEngine'][_0x45f0a9(0x905)]=Game_BattlerBase['prototype']['initMembers'],Game_BattlerBase[_0x45f0a9(0x7bc)]['initMembers']=function(){const _0x2b1d20=_0x45f0a9;this[_0x2b1d20(0x379)]={},VisuMZ[_0x2b1d20(0x601)][_0x2b1d20(0x905)][_0x2b1d20(0x573)](this);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x858)]=Game_BattlerBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x302)],Game_BattlerBase[_0x45f0a9(0x7bc)]['refresh']=function(){const _0x2bf2a2=_0x45f0a9;this['_cache']={},VisuMZ[_0x2bf2a2(0x601)][_0x2bf2a2(0x858)]['call'](this);},Game_BattlerBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x116)]=function(_0x3effbe){const _0x4b3728=_0x45f0a9;return this[_0x4b3728(0x379)]=this['_cache']||{},this[_0x4b3728(0x379)][_0x3effbe]!==undefined;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x355)]=function(_0x4ea38b){const _0x502643=_0x45f0a9;return _0x4ea38b=_0x4ea38b||'',_0x4ea38b='\x20'+_0x4ea38b,(VisuMZ[_0x502643(0x601)][_0x502643(0x5ba)][_0x502643(0x6ca)][_0x502643(0x67c)]??!![])&&(_0x4ea38b=_0x4ea38b[_0x502643(0x5a2)](/\s(?:USER|THIS)\.mhp\b/gi,'this.paramBase(0)'),_0x4ea38b=_0x4ea38b[_0x502643(0x5a2)](/\s(?:USER|THIS)\.mmp\b/gi,_0x502643(0x5d4)),_0x4ea38b=_0x4ea38b[_0x502643(0x5a2)](/\s(?:USER|THIS)\.atk\b/gi,_0x502643(0x548)),_0x4ea38b=_0x4ea38b[_0x502643(0x5a2)](/\s(?:USER|THIS)\.def\b/gi,_0x502643(0x397)),_0x4ea38b=_0x4ea38b['replace'](/\s(?:USER|THIS)\.mat\b/gi,_0x502643(0x5d5)),_0x4ea38b=_0x4ea38b[_0x502643(0x5a2)](/\s(?:USER|THIS)\.mdf\b/gi,'this.paramBase(5)'),_0x4ea38b=_0x4ea38b[_0x502643(0x5a2)](/\s(?:USER|THIS)\.agi\b/gi,'this.paramBase(6)'),_0x4ea38b=_0x4ea38b[_0x502643(0x5a2)](/\s(?:USER|THIS)\.luk\b/gi,'this.paramBase(7)'),_0x4ea38b=_0x4ea38b[_0x502643(0x5a2)](/\s(?:USER|THIS)\.param\(/gi,_0x502643(0x441))),_0x4ea38b=_0x4ea38b[_0x502643(0x5a2)](/\suser\./gi,_0x502643(0x551)),_0x4ea38b;},Game_BattlerBase['prototype'][_0x45f0a9(0x74b)]=function(_0x36c9f1){const _0x3e2672=_0x45f0a9,_0xe8bb6d=(_0x1a9841,_0x413adf)=>{const _0xb466e9=_0x25ac;if(!_0x413adf)return _0x1a9841;if(_0x413adf[_0xb466e9(0x483)][_0xb466e9(0x2ee)](VisuMZ['CoreEngine'][_0xb466e9(0x268)]['paramPlus'][_0x36c9f1])){var _0x989276=Number(RegExp['$1']);_0x1a9841+=_0x989276;}if(_0x413adf[_0xb466e9(0x483)][_0xb466e9(0x2ee)](VisuMZ[_0xb466e9(0x601)][_0xb466e9(0x268)]['paramPlusJS'][_0x36c9f1])){var _0x4806b2=String(RegExp['$1']);_0x4806b2=VisuMZ[_0xb466e9(0x601)]['JsReplaceUserVar'](_0x4806b2);try{_0x1a9841+=eval(_0x4806b2);}catch(_0x1593b8){if($gameTemp[_0xb466e9(0x88e)]())console['log'](_0x1593b8);}}return _0x1a9841;};return this['traitObjects']()[_0x3e2672(0x69c)](_0xe8bb6d,this[_0x3e2672(0x88b)][_0x36c9f1]);},Game_BattlerBase['prototype'][_0x45f0a9(0x393)]=function(_0x3738bf){const _0x3d6cf7=_0x45f0a9;var _0x24c23c=_0x3d6cf7(0x8f8)+(this[_0x3d6cf7(0x29a)]()?_0x3d6cf7(0x200):_0x3d6cf7(0x54a))+_0x3d6cf7(0x5c2)+_0x3738bf;if(this['checkCacheKey'](_0x24c23c))return this['_cache'][_0x24c23c];this['_cache'][_0x24c23c]=eval(VisuMZ[_0x3d6cf7(0x601)][_0x3d6cf7(0x5ba)][_0x3d6cf7(0x6ca)][_0x24c23c]);const _0x2063a8=(_0x12066a,_0x498cde)=>{const _0x2fdd27=_0x3d6cf7;if(!_0x498cde)return _0x12066a;if(_0x498cde[_0x2fdd27(0x483)][_0x2fdd27(0x2ee)](VisuMZ[_0x2fdd27(0x601)]['RegExp'][_0x2fdd27(0x393)][_0x3738bf])){var _0x5a7007=Number(RegExp['$1']);if(_0x5a7007===0x0)_0x5a7007=Number[_0x2fdd27(0x6ea)];_0x12066a=Math['max'](_0x12066a,_0x5a7007);}if(_0x498cde[_0x2fdd27(0x483)][_0x2fdd27(0x2ee)](VisuMZ[_0x2fdd27(0x601)][_0x2fdd27(0x268)][_0x2fdd27(0x744)][_0x3738bf])){var _0x55a8c1=String(RegExp['$1']);_0x55a8c1=VisuMZ['CoreEngine'][_0x2fdd27(0x355)](_0x55a8c1);try{_0x12066a=Math['max'](_0x12066a,Number(eval(_0x55a8c1)));}catch(_0x18809f){if($gameTemp[_0x2fdd27(0x88e)]())console[_0x2fdd27(0x4e0)](_0x18809f);}}return _0x12066a;};if(this[_0x3d6cf7(0x379)][_0x24c23c]===0x0)this[_0x3d6cf7(0x379)][_0x24c23c]=Number[_0x3d6cf7(0x6ea)];return this[_0x3d6cf7(0x379)][_0x24c23c]=this[_0x3d6cf7(0x58d)]()[_0x3d6cf7(0x69c)](_0x2063a8,this[_0x3d6cf7(0x379)][_0x24c23c]),this['_cache'][_0x24c23c];},Game_BattlerBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x7fd)]=function(_0x1c6244){const _0x354701=_0x45f0a9,_0x8be71e=this['traitsPi'](Game_BattlerBase[_0x354701(0x52d)],_0x1c6244),_0x4d3561=(_0x3611ad,_0xd3a38f)=>{const _0x418120=_0x354701;if(!_0xd3a38f)return _0x3611ad;if(_0xd3a38f['note']['match'](VisuMZ['CoreEngine'][_0x418120(0x268)][_0x418120(0x237)][_0x1c6244])){var _0x3e77d1=Number(RegExp['$1'])/0x64;_0x3611ad*=_0x3e77d1;}if(_0xd3a38f['note'][_0x418120(0x2ee)](VisuMZ[_0x418120(0x601)][_0x418120(0x268)][_0x418120(0x19e)][_0x1c6244])){var _0x3e77d1=Number(RegExp['$1']);_0x3611ad*=_0x3e77d1;}if(_0xd3a38f[_0x418120(0x483)][_0x418120(0x2ee)](VisuMZ['CoreEngine'][_0x418120(0x268)][_0x418120(0x63a)][_0x1c6244])){var _0x1de5f0=String(RegExp['$1']);_0x1de5f0=VisuMZ[_0x418120(0x601)][_0x418120(0x355)](_0x1de5f0);try{_0x3611ad*=eval(_0x1de5f0);}catch(_0x1cebb7){if($gameTemp[_0x418120(0x88e)]())console[_0x418120(0x4e0)](_0x1cebb7);}}return _0x3611ad;};return this['traitObjects']()[_0x354701(0x69c)](_0x4d3561,_0x8be71e);},Game_BattlerBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x45d)]=function(_0xff9604){const _0x25a8da=_0x45f0a9,_0x14320a=(_0x2b4181,_0x2cace5)=>{const _0x2c98be=_0x25ac;if(!_0x2cace5)return _0x2b4181;if(_0x2cace5[_0x2c98be(0x483)]['match'](VisuMZ[_0x2c98be(0x601)][_0x2c98be(0x268)][_0x2c98be(0x81f)][_0xff9604])){var _0x4aba19=Number(RegExp['$1']);_0x2b4181+=_0x4aba19;}if(_0x2cace5[_0x2c98be(0x483)][_0x2c98be(0x2ee)](VisuMZ[_0x2c98be(0x601)]['RegExp']['paramFlatJS'][_0xff9604])){var _0x132948=String(RegExp['$1']);_0x132948=VisuMZ[_0x2c98be(0x601)][_0x2c98be(0x355)](_0x132948);try{_0x2b4181+=eval(_0x132948);}catch(_0x250353){if($gameTemp[_0x2c98be(0x88e)]())console[_0x2c98be(0x4e0)](_0x250353);}}return _0x2b4181;};return this[_0x25a8da(0x58d)]()['reduce'](_0x14320a,0x0);},Game_BattlerBase[_0x45f0a9(0x7bc)]['param']=function(_0x1227ec){const _0x45cc93=_0x45f0a9;let _0x39ad16=_0x45cc93(0x1a7)+_0x1227ec+_0x45cc93(0x17b);if(this[_0x45cc93(0x116)](_0x39ad16))return this[_0x45cc93(0x379)][_0x39ad16];return this['_cache'][_0x39ad16]=Math[_0x45cc93(0x640)](VisuMZ[_0x45cc93(0x601)][_0x45cc93(0x5ba)][_0x45cc93(0x6ca)][_0x45cc93(0x2c1)][_0x45cc93(0x573)](this,_0x1227ec)),this[_0x45cc93(0x379)][_0x39ad16];},Game_BattlerBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x368)]=function(_0x1e77e9){const _0x3a88c2=_0x45f0a9,_0x26b36b=(_0x37b766,_0x2a9447)=>{const _0x435499=_0x25ac;if(!_0x2a9447)return _0x37b766;if(_0x2a9447[_0x435499(0x483)][_0x435499(0x2ee)](VisuMZ[_0x435499(0x601)][_0x435499(0x268)][_0x435499(0x7be)][_0x1e77e9])){var _0x439fc0=Number(RegExp['$1'])/0x64;_0x37b766+=_0x439fc0;}if(_0x2a9447[_0x435499(0x483)]['match'](VisuMZ['CoreEngine']['RegExp']['xparamPlus2'][_0x1e77e9])){var _0x439fc0=Number(RegExp['$1']);_0x37b766+=_0x439fc0;}if(_0x2a9447['note']['match'](VisuMZ['CoreEngine'][_0x435499(0x268)][_0x435499(0x854)][_0x1e77e9])){var _0x3602a4=String(RegExp['$1']);_0x3602a4=VisuMZ[_0x435499(0x601)][_0x435499(0x355)](_0x3602a4);try{_0x37b766+=eval(_0x3602a4);}catch(_0x46e482){if($gameTemp[_0x435499(0x88e)]())console['log'](_0x46e482);}}return _0x37b766;};return this['traitObjects']()[_0x3a88c2(0x69c)](_0x26b36b,0x0);},Game_BattlerBase['prototype'][_0x45f0a9(0x60b)]=function(_0x57ce4d){const _0x3f52ab=_0x45f0a9,_0x2b28ae=(_0x4dd435,_0x1ec161)=>{const _0xb773c3=_0x25ac;if(!_0x1ec161)return _0x4dd435;if(_0x1ec161['note'][_0xb773c3(0x2ee)](VisuMZ['CoreEngine'][_0xb773c3(0x268)][_0xb773c3(0x8e4)][_0x57ce4d])){var _0x1523e9=Number(RegExp['$1'])/0x64;_0x4dd435*=_0x1523e9;}if(_0x1ec161[_0xb773c3(0x483)][_0xb773c3(0x2ee)](VisuMZ[_0xb773c3(0x601)][_0xb773c3(0x268)][_0xb773c3(0x417)][_0x57ce4d])){var _0x1523e9=Number(RegExp['$1']);_0x4dd435*=_0x1523e9;}if(_0x1ec161[_0xb773c3(0x483)][_0xb773c3(0x2ee)](VisuMZ['CoreEngine'][_0xb773c3(0x268)][_0xb773c3(0x438)][_0x57ce4d])){var _0x99786f=String(RegExp['$1']);_0x99786f=VisuMZ[_0xb773c3(0x601)][_0xb773c3(0x355)](_0x99786f);try{_0x4dd435*=eval(_0x99786f);}catch(_0x580a24){if($gameTemp['isPlaytest']())console[_0xb773c3(0x4e0)](_0x580a24);}}return _0x4dd435;};return this[_0x3f52ab(0x58d)]()['reduce'](_0x2b28ae,0x1);},Game_BattlerBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x583)]=function(_0x3b9a3c){const _0x5b4d94=_0x45f0a9,_0x19cd1a=(_0x636a1c,_0x47ab25)=>{const _0x441033=_0x25ac;if(!_0x47ab25)return _0x636a1c;if(_0x47ab25['note']['match'](VisuMZ[_0x441033(0x601)][_0x441033(0x268)]['xparamFlat1'][_0x3b9a3c])){var _0x4c76cf=Number(RegExp['$1'])/0x64;_0x636a1c+=_0x4c76cf;}if(_0x47ab25['note'][_0x441033(0x2ee)](VisuMZ[_0x441033(0x601)][_0x441033(0x268)][_0x441033(0x648)][_0x3b9a3c])){var _0x4c76cf=Number(RegExp['$1']);_0x636a1c+=_0x4c76cf;}if(_0x47ab25[_0x441033(0x483)][_0x441033(0x2ee)](VisuMZ[_0x441033(0x601)][_0x441033(0x268)][_0x441033(0x5af)][_0x3b9a3c])){var _0x5a3e67=String(RegExp['$1']);_0x5a3e67=VisuMZ['CoreEngine'][_0x441033(0x355)](_0x5a3e67);try{_0x636a1c+=eval(_0x5a3e67);}catch(_0x41d90e){if($gameTemp[_0x441033(0x88e)]())console[_0x441033(0x4e0)](_0x41d90e);}}return _0x636a1c;};return this[_0x5b4d94(0x58d)]()['reduce'](_0x19cd1a,0x0);},Game_BattlerBase['prototype'][_0x45f0a9(0x138)]=function(_0x48e3a6){const _0x3a8554=_0x45f0a9;let _0x30cb8b=_0x3a8554(0x138)+_0x48e3a6+_0x3a8554(0x17b);if(this[_0x3a8554(0x116)](_0x30cb8b))return this[_0x3a8554(0x379)][_0x30cb8b];return this[_0x3a8554(0x379)][_0x30cb8b]=VisuMZ[_0x3a8554(0x601)]['Settings'][_0x3a8554(0x6ca)]['XParameterFormula'][_0x3a8554(0x573)](this,_0x48e3a6),this[_0x3a8554(0x379)][_0x30cb8b];},Game_BattlerBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x3d4)]=function(_0x3659b3){const _0x1ec0a7=_0x45f0a9,_0x2121fb=(_0x446d3b,_0x2dfe3b)=>{const _0x1394a2=_0x25ac;if(!_0x2dfe3b)return _0x446d3b;if(_0x2dfe3b['note'][_0x1394a2(0x2ee)](VisuMZ[_0x1394a2(0x601)][_0x1394a2(0x268)][_0x1394a2(0x481)][_0x3659b3])){var _0x5ba5cb=Number(RegExp['$1'])/0x64;_0x446d3b+=_0x5ba5cb;}if(_0x2dfe3b[_0x1394a2(0x483)][_0x1394a2(0x2ee)](VisuMZ[_0x1394a2(0x601)]['RegExp'][_0x1394a2(0x5f2)][_0x3659b3])){var _0x5ba5cb=Number(RegExp['$1']);_0x446d3b+=_0x5ba5cb;}if(_0x2dfe3b[_0x1394a2(0x483)][_0x1394a2(0x2ee)](VisuMZ[_0x1394a2(0x601)][_0x1394a2(0x268)]['sparamPlusJS'][_0x3659b3])){var _0x1bd734=String(RegExp['$1']);_0x1bd734=VisuMZ[_0x1394a2(0x601)][_0x1394a2(0x355)](_0x1bd734);try{_0x446d3b+=eval(_0x1bd734);}catch(_0x379897){if($gameTemp['isPlaytest']())console[_0x1394a2(0x4e0)](_0x379897);}}return _0x446d3b;};return this[_0x1ec0a7(0x58d)]()[_0x1ec0a7(0x69c)](_0x2121fb,0x0);},Game_BattlerBase[_0x45f0a9(0x7bc)]['sparamRate']=function(_0x42d50a){const _0x37dccd=_0x45f0a9,_0x1dff6e=(_0x1fdb0e,_0x590e49)=>{const _0x7605e0=_0x25ac;if(!_0x590e49)return _0x1fdb0e;if(_0x590e49[_0x7605e0(0x483)][_0x7605e0(0x2ee)](VisuMZ[_0x7605e0(0x601)][_0x7605e0(0x268)]['sparamRate1'][_0x42d50a])){var _0x8925e3=Number(RegExp['$1'])/0x64;_0x1fdb0e*=_0x8925e3;}if(_0x590e49['note'][_0x7605e0(0x2ee)](VisuMZ[_0x7605e0(0x601)][_0x7605e0(0x268)]['sparamRate2'][_0x42d50a])){var _0x8925e3=Number(RegExp['$1']);_0x1fdb0e*=_0x8925e3;}if(_0x590e49[_0x7605e0(0x483)][_0x7605e0(0x2ee)](VisuMZ[_0x7605e0(0x601)][_0x7605e0(0x268)][_0x7605e0(0x12c)][_0x42d50a])){var _0x41cdf5=String(RegExp['$1']);_0x41cdf5=VisuMZ[_0x7605e0(0x601)][_0x7605e0(0x355)](_0x41cdf5);try{_0x1fdb0e*=eval(_0x41cdf5);}catch(_0xefc6a5){if($gameTemp[_0x7605e0(0x88e)]())console[_0x7605e0(0x4e0)](_0xefc6a5);}}return _0x1fdb0e;};return this[_0x37dccd(0x58d)]()[_0x37dccd(0x69c)](_0x1dff6e,0x1);},Game_BattlerBase['prototype'][_0x45f0a9(0x404)]=function(_0x5316b7){const _0x3d2668=_0x45f0a9,_0x3855e1=(_0x587e58,_0x3dfe20)=>{const _0x44458d=_0x25ac;if(!_0x3dfe20)return _0x587e58;if(_0x3dfe20[_0x44458d(0x483)]['match'](VisuMZ['CoreEngine'][_0x44458d(0x268)][_0x44458d(0x5a4)][_0x5316b7])){var _0x47bf21=Number(RegExp['$1'])/0x64;_0x587e58+=_0x47bf21;}if(_0x3dfe20[_0x44458d(0x483)][_0x44458d(0x2ee)](VisuMZ['CoreEngine']['RegExp'][_0x44458d(0x198)][_0x5316b7])){var _0x47bf21=Number(RegExp['$1']);_0x587e58+=_0x47bf21;}if(_0x3dfe20[_0x44458d(0x483)][_0x44458d(0x2ee)](VisuMZ[_0x44458d(0x601)][_0x44458d(0x268)][_0x44458d(0x2f3)][_0x5316b7])){var _0x581b17=String(RegExp['$1']);_0x581b17=VisuMZ['CoreEngine'][_0x44458d(0x355)](_0x581b17);try{_0x587e58+=eval(_0x581b17);}catch(_0x4093af){if($gameTemp['isPlaytest']())console['log'](_0x4093af);}}return _0x587e58;};return this[_0x3d2668(0x58d)]()[_0x3d2668(0x69c)](_0x3855e1,0x0);},Game_BattlerBase[_0x45f0a9(0x7bc)]['sparam']=function(_0x368efc){const _0x550b43=_0x45f0a9;let _0x36a168='sparam'+_0x368efc+_0x550b43(0x17b);if(this[_0x550b43(0x116)](_0x36a168))return this[_0x550b43(0x379)][_0x36a168];return this[_0x550b43(0x379)][_0x36a168]=VisuMZ[_0x550b43(0x601)]['Settings']['Param'][_0x550b43(0x45b)][_0x550b43(0x573)](this,_0x368efc),this['_cache'][_0x36a168];},Game_BattlerBase['prototype']['paramValueByName']=function(_0x5249b6,_0x3041f2){const _0x57175c=_0x45f0a9;if(typeof paramId==='number')return this[_0x57175c(0x1a7)](_0x5249b6);_0x5249b6=String(_0x5249b6||'')[_0x57175c(0x26d)]();if(_0x5249b6==='MAXHP')return this[_0x57175c(0x1a7)](0x0);if(_0x5249b6===_0x57175c(0x300))return this[_0x57175c(0x1a7)](0x1);if(_0x5249b6===_0x57175c(0x5cc))return this[_0x57175c(0x1a7)](0x2);if(_0x5249b6===_0x57175c(0x2cc))return this[_0x57175c(0x1a7)](0x3);if(_0x5249b6==='MAT')return this[_0x57175c(0x1a7)](0x4);if(_0x5249b6===_0x57175c(0x2da))return this[_0x57175c(0x1a7)](0x5);if(_0x5249b6===_0x57175c(0x356))return this[_0x57175c(0x1a7)](0x6);if(_0x5249b6===_0x57175c(0x265))return this[_0x57175c(0x1a7)](0x7);if(_0x5249b6===_0x57175c(0x51c))return _0x3041f2?String(Math[_0x57175c(0x640)](this[_0x57175c(0x138)](0x0)*0x64))+'%':this[_0x57175c(0x138)](0x0);if(_0x5249b6===_0x57175c(0x1bc))return _0x3041f2?String(Math[_0x57175c(0x640)](this['xparam'](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x5249b6===_0x57175c(0x78e))return _0x3041f2?String(Math[_0x57175c(0x640)](this[_0x57175c(0x138)](0x2)*0x64))+'%':this[_0x57175c(0x138)](0x2);if(_0x5249b6==='CEV')return _0x3041f2?String(Math[_0x57175c(0x640)](this[_0x57175c(0x138)](0x3)*0x64))+'%':this[_0x57175c(0x138)](0x3);if(_0x5249b6===_0x57175c(0x1ba))return _0x3041f2?String(Math['round'](this[_0x57175c(0x138)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x5249b6===_0x57175c(0x5a9))return _0x3041f2?String(Math[_0x57175c(0x640)](this[_0x57175c(0x138)](0x5)*0x64))+'%':this[_0x57175c(0x138)](0x5);if(_0x5249b6==='CNT')return _0x3041f2?String(Math[_0x57175c(0x640)](this[_0x57175c(0x138)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x5249b6===_0x57175c(0x6ab))return _0x3041f2?String(Math[_0x57175c(0x640)](this['xparam'](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x5249b6===_0x57175c(0x7ea))return _0x3041f2?String(Math[_0x57175c(0x640)](this['xparam'](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x5249b6===_0x57175c(0x81e))return _0x3041f2?String(Math[_0x57175c(0x640)](this[_0x57175c(0x138)](0x9)*0x64))+'%':this[_0x57175c(0x138)](0x9);if(_0x5249b6===_0x57175c(0x7ab))return _0x3041f2?String(Math['round'](this[_0x57175c(0x863)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x5249b6===_0x57175c(0x598))return _0x3041f2?String(Math['round'](this[_0x57175c(0x863)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x5249b6===_0x57175c(0x274))return _0x3041f2?String(Math[_0x57175c(0x640)](this['sparam'](0x2)*0x64))+'%':this[_0x57175c(0x863)](0x2);if(_0x5249b6==='PHA')return _0x3041f2?String(Math['round'](this[_0x57175c(0x863)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x5249b6==='MCR')return _0x3041f2?String(Math['round'](this[_0x57175c(0x863)](0x4)*0x64))+'%':this[_0x57175c(0x863)](0x4);if(_0x5249b6===_0x57175c(0x3b8))return _0x3041f2?String(Math['round'](this[_0x57175c(0x863)](0x5)*0x64))+'%':this[_0x57175c(0x863)](0x5);if(_0x5249b6===_0x57175c(0x313))return _0x3041f2?String(Math[_0x57175c(0x640)](this[_0x57175c(0x863)](0x6)*0x64))+'%':this[_0x57175c(0x863)](0x6);if(_0x5249b6===_0x57175c(0x49b))return _0x3041f2?String(Math[_0x57175c(0x640)](this[_0x57175c(0x863)](0x7)*0x64))+'%':this[_0x57175c(0x863)](0x7);if(_0x5249b6==='FDR')return _0x3041f2?String(Math[_0x57175c(0x640)](this['sparam'](0x8)*0x64))+'%':this[_0x57175c(0x863)](0x8);if(_0x5249b6==='EXR')return _0x3041f2?String(Math[_0x57175c(0x640)](this[_0x57175c(0x863)](0x9)*0x64))+'%':this[_0x57175c(0x863)](0x9);if(VisuMZ[_0x57175c(0x601)][_0x57175c(0x401)][_0x5249b6]){const _0x35f985=VisuMZ[_0x57175c(0x601)][_0x57175c(0x401)][_0x5249b6],_0x53f0a3=this[_0x35f985];return VisuMZ[_0x57175c(0x601)][_0x57175c(0x8ea)][_0x5249b6]===_0x57175c(0x8f2)?_0x53f0a3:_0x3041f2?String(Math[_0x57175c(0x640)](_0x53f0a3*0x64))+'%':_0x53f0a3;}return'';},Game_BattlerBase['prototype'][_0x45f0a9(0x40b)]=function(){const _0x1e889a=_0x45f0a9;return this['isAlive']()&&this['_hp']<this[_0x1e889a(0x759)]*VisuMZ[_0x1e889a(0x601)][_0x1e889a(0x5ba)][_0x1e889a(0x6ca)][_0x1e889a(0x635)];},Game_Battler['prototype'][_0x45f0a9(0x49c)]=function(){const _0x153dfd=_0x45f0a9;SoundManager[_0x153dfd(0x140)](),this[_0x153dfd(0x8b3)](_0x153dfd(0x6f6));},VisuMZ['CoreEngine']['Game_Actor_paramBase']=Game_Actor['prototype']['paramBase'],Game_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x796)]=function(_0x16c75c){const _0xeafbbb=_0x45f0a9;if(this[_0xeafbbb(0x74f)]>0x63)return this[_0xeafbbb(0x45a)](_0x16c75c);return VisuMZ[_0xeafbbb(0x601)]['Game_Actor_paramBase']['call'](this,_0x16c75c);},Game_Actor[_0x45f0a9(0x7bc)]['paramBaseAboveLevel99']=function(_0x1464aa){const _0x7e98af=_0x45f0a9,_0x3b5653=this[_0x7e98af(0x6be)]()[_0x7e98af(0x5a5)][_0x1464aa][0x63],_0x176f54=this[_0x7e98af(0x6be)]()[_0x7e98af(0x5a5)][_0x1464aa][0x62];return _0x3b5653+(_0x3b5653-_0x176f54)*(this[_0x7e98af(0x74f)]-0x63);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x6f5)]=Game_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x83f)],Game_Actor[_0x45f0a9(0x7bc)]['changeClass']=function(_0x5b8e20,_0x1b2be5){const _0x2725eb=_0x45f0a9;$gameTemp[_0x2725eb(0x497)]=!![],VisuMZ[_0x2725eb(0x601)][_0x2725eb(0x6f5)][_0x2725eb(0x573)](this,_0x5b8e20,_0x1b2be5),$gameTemp[_0x2725eb(0x497)]=undefined;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x552)]=Game_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x465)],Game_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x465)]=function(){const _0x81cbea=_0x45f0a9;VisuMZ['CoreEngine']['Game_Actor_levelUp'][_0x81cbea(0x573)](this);if(!$gameTemp[_0x81cbea(0x497)])this['levelUpRecovery']();},Game_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x4e1)]=function(){const _0x2d7a30=_0x45f0a9;this[_0x2d7a30(0x379)]={};if(VisuMZ[_0x2d7a30(0x601)]['Settings'][_0x2d7a30(0x8f1)][_0x2d7a30(0x1c3)])this[_0x2d7a30(0x34d)]=this[_0x2d7a30(0x759)];if(VisuMZ[_0x2d7a30(0x601)][_0x2d7a30(0x5ba)]['QoL'][_0x2d7a30(0x7f0)])this[_0x2d7a30(0x670)]=this['mmp'];},Game_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x6df)]=function(){const _0x44af27=_0x45f0a9;if(this['isMaxLevel']())return 0x1;const _0x39d543=this[_0x44af27(0x549)]()-this[_0x44af27(0x400)](),_0x223ecd=this[_0x44af27(0x1cb)]()-this[_0x44af27(0x400)]();return(_0x223ecd/_0x39d543)[_0x44af27(0x5b1)](0x0,0x1);},Game_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x58d)]=function(){const _0x5182f9=_0x45f0a9,_0x3f6db2=Game_Battler['prototype']['traitObjects'][_0x5182f9(0x573)](this);for(const _0x1fcbab of this[_0x5182f9(0x560)]()){_0x1fcbab&&_0x3f6db2[_0x5182f9(0x5f7)](_0x1fcbab);}return _0x3f6db2[_0x5182f9(0x5f7)](this[_0x5182f9(0x6be)](),this[_0x5182f9(0x592)]()),_0x3f6db2;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x83d)]=Game_Actor[_0x45f0a9(0x7bc)]['isPreserveTp'],Game_Actor[_0x45f0a9(0x7bc)]['isPreserveTp']=function(){const _0x42615d=_0x45f0a9;if(!$gameParty[_0x42615d(0x6c9)]())return!![];return VisuMZ[_0x42615d(0x601)][_0x42615d(0x83d)]['call'](this);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x1d8)]=Game_Unit[_0x45f0a9(0x7bc)][_0x45f0a9(0x7e4)],Game_Unit[_0x45f0a9(0x7bc)][_0x45f0a9(0x7e4)]=function(_0x75fcc){const _0x321ccd=_0x45f0a9;this[_0x321ccd(0x6ee)]=!![],VisuMZ['CoreEngine'][_0x321ccd(0x1d8)][_0x321ccd(0x573)](this,_0x75fcc);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x833)]=Game_Unit[_0x45f0a9(0x7bc)]['onBattleEnd'],Game_Unit[_0x45f0a9(0x7bc)][_0x45f0a9(0x505)]=function(){const _0x4fc542=_0x45f0a9;for(const _0x521b40 of this[_0x4fc542(0x1e9)]()){_0x521b40&&!_0x521b40[_0x4fc542(0x14f)]()&&_0x521b40['clearTp']();}VisuMZ[_0x4fc542(0x601)][_0x4fc542(0x833)][_0x4fc542(0x573)](this);},Object[_0x45f0a9(0x81c)](Game_Enemy[_0x45f0a9(0x7bc)],'level',{'get':function(){const _0xabb474=_0x45f0a9;return this[_0xabb474(0x206)]();},'configurable':!![]}),Game_Enemy[_0x45f0a9(0x7bc)][_0x45f0a9(0x206)]=function(){const _0x489e72=_0x45f0a9;return this[_0x489e72(0x4c9)]()[_0x489e72(0x74f)];},Game_Enemy[_0x45f0a9(0x7bc)][_0x45f0a9(0x4ec)]=function(){const _0xd5e07d=_0x45f0a9;!this['_repositioned']&&(this['_screenY']+=Math[_0xd5e07d(0x640)]((Graphics[_0xd5e07d(0x2a5)]-0x270)/0x2),this[_0xd5e07d(0x3a0)]-=Math[_0xd5e07d(0x5ae)]((Graphics[_0xd5e07d(0x2a5)]-Graphics[_0xd5e07d(0x7f2)])/0x2),$gameSystem[_0xd5e07d(0x2a4)]()?this[_0xd5e07d(0x20d)]-=Math[_0xd5e07d(0x5ae)]((Graphics[_0xd5e07d(0x4bc)]-Graphics[_0xd5e07d(0x2a2)])/0x2):this[_0xd5e07d(0x20d)]+=Math[_0xd5e07d(0x640)]((Graphics[_0xd5e07d(0x2a2)]-0x330)/0x2)),this['_repositioned']=!![];},Game_Party[_0x45f0a9(0x7bc)][_0x45f0a9(0x647)]=function(){const _0x2409f6=_0x45f0a9;return VisuMZ[_0x2409f6(0x601)][_0x2409f6(0x5ba)][_0x2409f6(0x187)][_0x2409f6(0x6ae)];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x8ff)]=Game_Party[_0x45f0a9(0x7bc)][_0x45f0a9(0x183)],Game_Party[_0x45f0a9(0x7bc)][_0x45f0a9(0x183)]=function(_0xdddcb6){const _0x275647=_0x45f0a9;if(VisuMZ[_0x275647(0x601)][_0x275647(0x5ba)][_0x275647(0x8f1)][_0x275647(0x903)]&&DataManager[_0x275647(0x824)](_0xdddcb6))return;VisuMZ[_0x275647(0x601)][_0x275647(0x8ff)]['call'](this,_0xdddcb6);},Game_Party[_0x45f0a9(0x7bc)]['setupBattleTestItems']=function(){const _0x5c7bd6=_0x45f0a9,_0x4f83d2=VisuMZ['CoreEngine'][_0x5c7bd6(0x5ba)]['QoL'],_0x5b3736=_0x4f83d2[_0x5c7bd6(0x321)]??0x63;let _0x3ed311=[];(_0x4f83d2['BTestItems']??!![])&&(_0x3ed311=_0x3ed311[_0x5c7bd6(0x61b)]($dataItems));(_0x4f83d2[_0x5c7bd6(0x8d0)]??!![])&&(_0x3ed311=_0x3ed311['concat']($dataWeapons));(_0x4f83d2[_0x5c7bd6(0x1ce)]??!![])&&(_0x3ed311=_0x3ed311[_0x5c7bd6(0x61b)]($dataArmors));for(const _0x1f1618 of _0x3ed311){if(!_0x1f1618)continue;if(_0x1f1618[_0x5c7bd6(0x3d0)][_0x5c7bd6(0x88c)]()<=0x0)continue;if(_0x1f1618[_0x5c7bd6(0x3d0)]['match'](/-----/i))continue;this[_0x5c7bd6(0x675)](_0x1f1618,_0x5b3736);}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x735)]=Game_Troop[_0x45f0a9(0x7bc)]['setup'],Game_Troop[_0x45f0a9(0x7bc)][_0x45f0a9(0x197)]=function(_0x4472cd){const _0x39dd9b=_0x45f0a9;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x4472cd),VisuMZ['CoreEngine'][_0x39dd9b(0x735)]['call'](this,_0x4472cd);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x458)]=Game_Map[_0x45f0a9(0x7bc)]['setup'],Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x197)]=function(_0x36cbfc){const _0x5b0215=_0x45f0a9;VisuMZ[_0x5b0215(0x601)][_0x5b0215(0x458)][_0x5b0215(0x573)](this,_0x36cbfc),this[_0x5b0215(0x47c)](),this[_0x5b0215(0x248)](_0x36cbfc),this[_0x5b0215(0x533)]();},Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x248)]=function(){const _0x403cd2=_0x45f0a9;this[_0x403cd2(0x5d9)]=VisuMZ[_0x403cd2(0x601)][_0x403cd2(0x5ba)]['QoL'][_0x403cd2(0x724)]||![];const _0x1370f1=VisuMZ['CoreEngine'][_0x403cd2(0x5ba)][_0x403cd2(0x64b)],_0x2da7ea=$dataMap?$dataMap[_0x403cd2(0x483)]||'':'';if(_0x2da7ea['match'](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];else _0x2da7ea[_0x403cd2(0x2ee)](/<HIDE TILE SHADOWS>/i)&&(this[_0x403cd2(0x5d9)]=!![]);if(_0x2da7ea['match'](/<SCROLL LOCK X>/i))this[_0x403cd2(0x558)]()[_0x403cd2(0x129)]=!![],this['centerCameraCheckData']()[_0x403cd2(0x608)]=_0x1370f1[_0x403cd2(0x7eb)];else _0x2da7ea['match'](/<SCROLL LOCK X: (.*?)>/i)&&(this['centerCameraCheckData']()[_0x403cd2(0x129)]=!![],this[_0x403cd2(0x558)]()[_0x403cd2(0x608)]=Number(RegExp['$1']));if(_0x2da7ea[_0x403cd2(0x2ee)](/<SCROLL LOCK Y>/i))this[_0x403cd2(0x558)]()['centerY']=!![],this[_0x403cd2(0x558)]()[_0x403cd2(0x4b0)]=_0x1370f1[_0x403cd2(0x539)];else _0x2da7ea['match'](/<SCROLL LOCK Y: (.*?)>/i)&&(this['centerCameraCheckData']()[_0x403cd2(0x8d9)]=!![],this['centerCameraCheckData']()[_0x403cd2(0x4b0)]=Number(RegExp['$1']));},Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x286)]=function(){const _0x111a40=_0x45f0a9;if(this[_0x111a40(0x5d9)]===undefined)this[_0x111a40(0x248)]();return this['_hideTileShadows'];},Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x47c)]=function(){const _0x19dbfd=_0x45f0a9,_0x29aef1=VisuMZ[_0x19dbfd(0x601)][_0x19dbfd(0x5ba)][_0x19dbfd(0x64b)];this[_0x19dbfd(0x6ac)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x29aef1[_0x19dbfd(0x367)]){const _0x15bb59=Graphics[_0x19dbfd(0x4bc)]/this['tileWidth']();_0x15bb59%0x1!==0x0&&Math[_0x19dbfd(0x7b9)](_0x15bb59)===this[_0x19dbfd(0x4bc)]()&&!this['isLoopHorizontal']()&&(this[_0x19dbfd(0x6ac)][_0x19dbfd(0x129)]=!![],this['_centerCameraCheck']['displayX']=_0x29aef1[_0x19dbfd(0x7eb)]||0x0);}if(_0x29aef1[_0x19dbfd(0x800)]){const _0x584755=Graphics[_0x19dbfd(0x2a5)]/this[_0x19dbfd(0x62e)]();_0x584755%0x1!==0x0&&Math[_0x19dbfd(0x7b9)](_0x584755)===this['height']()&&!this[_0x19dbfd(0x89f)]()&&(this[_0x19dbfd(0x6ac)]['centerY']=!![],this[_0x19dbfd(0x6ac)][_0x19dbfd(0x4b0)]=_0x29aef1[_0x19dbfd(0x539)]||0x0);}$gameScreen[_0x19dbfd(0x81a)]()===0x1&&(this[_0x19dbfd(0x558)]()['centerX']&&(this[_0x19dbfd(0x776)]=this['centerCameraCheckData']()[_0x19dbfd(0x608)]),this[_0x19dbfd(0x558)]()[_0x19dbfd(0x8d9)]&&(this[_0x19dbfd(0x8f0)]=this[_0x19dbfd(0x558)]()['displayY']));},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x8bc)]=Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x439)],Game_Map[_0x45f0a9(0x7bc)]['setDisplayPos']=function(_0x23e4b6,_0x38fb7c){const _0x3d9069=_0x45f0a9;VisuMZ['CoreEngine'][_0x3d9069(0x8bc)]['call'](this,_0x23e4b6,_0x38fb7c),$gameScreen[_0x3d9069(0x81a)]()===0x1&&(!this[_0x3d9069(0x163)]()&&this['centerCameraCheckData']()[_0x3d9069(0x129)]&&(this[_0x3d9069(0x776)]=this[_0x3d9069(0x558)]()[_0x3d9069(0x608)]),!this['isLoopVertical']()&&this[_0x3d9069(0x558)]()[_0x3d9069(0x8d9)]&&(this[_0x3d9069(0x8f0)]=this[_0x3d9069(0x558)]()[_0x3d9069(0x4b0)]));},Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x558)]=function(){const _0x1d6d85=_0x45f0a9;if(this['_centerCameraCheck']===undefined)this['checkCoreEngineDisplayCenter']();return this[_0x1d6d85(0x6ac)];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x1d1)]=Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x811)],Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x811)]=function(_0x309693){const _0x1ece5e=_0x45f0a9;if(this['centerCameraCheckData']()[_0x1ece5e(0x8d9)]&&$gameScreen['zoomScale']()===0x1){this[_0x1ece5e(0x8f0)]=this[_0x1ece5e(0x558)]()[_0x1ece5e(0x4b0)];return;}VisuMZ['CoreEngine'][_0x1ece5e(0x1d1)][_0x1ece5e(0x573)](this,_0x309693);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x835)]=Game_Map['prototype'][_0x45f0a9(0x589)],Game_Map[_0x45f0a9(0x7bc)]['scrollLeft']=function(_0x529378){const _0x5d2be4=_0x45f0a9;if(this['centerCameraCheckData']()['centerX']&&$gameScreen['zoomScale']()===0x1){this[_0x5d2be4(0x776)]=this[_0x5d2be4(0x558)]()[_0x5d2be4(0x608)];return;}VisuMZ[_0x5d2be4(0x601)]['Game_Map_scrollLeft']['call'](this,_0x529378);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x575)]=Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x8e8)],Game_Map['prototype'][_0x45f0a9(0x8e8)]=function(_0x537ccf){const _0x5ed105=_0x45f0a9;if(this[_0x5ed105(0x558)]()[_0x5ed105(0x129)]&&$gameScreen[_0x5ed105(0x81a)]()===0x1){this[_0x5ed105(0x776)]=this[_0x5ed105(0x558)]()['displayX'];return;}VisuMZ[_0x5ed105(0x601)][_0x5ed105(0x575)][_0x5ed105(0x573)](this,_0x537ccf);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x7f9)]=Game_Map['prototype'][_0x45f0a9(0x325)],Game_Map['prototype'][_0x45f0a9(0x325)]=function(_0x5dae3d){const _0x55a38d=_0x45f0a9;if(this['centerCameraCheckData']()[_0x55a38d(0x8d9)]&&$gameScreen['zoomScale']()===0x1){this['_displayY']=this['centerCameraCheckData']()[_0x55a38d(0x4b0)];return;}VisuMZ['CoreEngine'][_0x55a38d(0x7f9)]['call'](this,_0x5dae3d);},Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x533)]=function(){const _0x3fd315=_0x45f0a9;this[_0x3fd315(0x7f3)]={};const _0x45069b=this[_0x3fd315(0x8a0)]();if(!_0x45069b)return{};const _0x5a266b=_0x45069b['note']||'',_0x385038=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x5be187={};const _0x393537=_0x5a266b['match'](_0x385038);if(_0x393537)for(const _0x5c847a of _0x393537){_0x5c847a['match'](_0x385038);const _0x33edd5=Number(RegExp['$1'])[_0x3fd315(0x5b1)](0x1,0x10),_0x1019d6=String(RegExp['$2'])[_0x3fd315(0x208)](',')['map'](_0x47739b=>Number(_0x47739b)[_0x3fd315(0x5b1)](0x1,0x7));for(const _0x14eac4 of _0x1019d6){_0x5be187[_0x14eac4]=_0x33edd5;}}this[_0x3fd315(0x7f3)]=_0x5be187;},Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x5b0)]=function(){const _0x9b9479=_0x45f0a9;if(this[_0x9b9479(0x7f3)]===undefined)this[_0x9b9479(0x533)]();return this[_0x9b9479(0x7f3)];},Game_Map[_0x45f0a9(0x7bc)]['isTileExtended']=function(_0xec1dc){const _0x5af8ea=_0x45f0a9;if(_0xec1dc>=0x400)return![];const _0xfdc0a3=$gameMap[_0x5af8ea(0x5b0)]();if(Object['keys'](_0xfdc0a3)[_0x5af8ea(0x2ad)]<=0x0)return![];const _0x352935=this[_0x5af8ea(0x8cd)](),_0x320f44=_0x352935[_0xec1dc]>>0xc,_0x4e3ac5=_0xfdc0a3[_0x320f44]||0x0;return _0x4e3ac5>0x0;},VisuMZ['CoreEngine'][_0x45f0a9(0x3c6)]=Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x562)],Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x562)]=function(_0x598af5){const _0x514405=_0x45f0a9;VisuMZ[_0x514405(0x601)][_0x514405(0x3c6)]['call'](this,_0x598af5),this[_0x514405(0x871)](),SceneManager[_0x514405(0x4a0)][_0x514405(0x29e)][_0x514405(0x314)]();},Game_Map['prototype'][_0x45f0a9(0x871)]=function(){const _0x281961=_0x45f0a9,_0x3a395f=this[_0x281961(0x5b0)]();if(Object[_0x281961(0x890)](_0x3a395f)[_0x281961(0x2ad)]<=0x0)return;const _0x56b8b1=SceneManager['_scene'][_0x281961(0x29e)];_0x56b8b1&&(_0x56b8b1[_0x281961(0x5ff)]&&_0x56b8b1[_0x281961(0x5ff)](),_0x56b8b1[_0x281961(0x667)]&&_0x56b8b1[_0x281961(0x667)]());},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x415)]=Game_Character['prototype']['processMoveCommand'],Game_Character[_0x45f0a9(0x7bc)][_0x45f0a9(0x185)]=function(_0x462846){const _0x5c112d=_0x45f0a9;try{VisuMZ['CoreEngine'][_0x5c112d(0x415)][_0x5c112d(0x573)](this,_0x462846);}catch(_0x433581){if($gameTemp[_0x5c112d(0x88e)]())console[_0x5c112d(0x4e0)](_0x433581);}},Game_Player[_0x45f0a9(0x7bc)]['makeEncounterCount']=function(){const _0x19ccf0=_0x45f0a9,_0x1f1ac4=$gameMap[_0x19ccf0(0x876)]();this[_0x19ccf0(0x20a)]=Math[_0x19ccf0(0x54d)](_0x1f1ac4)+Math[_0x19ccf0(0x54d)](_0x1f1ac4)+this[_0x19ccf0(0x742)]();},Game_Player[_0x45f0a9(0x7bc)][_0x45f0a9(0x742)]=function(){const _0xefecef=_0x45f0a9;return $dataMap&&$dataMap[_0xefecef(0x483)]&&$dataMap[_0xefecef(0x483)][_0xefecef(0x2ee)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine'][_0xefecef(0x5ba)][_0xefecef(0x8f1)][_0xefecef(0x4a1)];},VisuMZ[_0x45f0a9(0x601)]['Game_Event_isCollidedWithEvents']=Game_Event['prototype'][_0x45f0a9(0x23c)],Game_Event['prototype'][_0x45f0a9(0x23c)]=function(_0xa1535e,_0x1afc00){const _0x1557bb=_0x45f0a9;return this['isSmartEventCollisionOn']()?this[_0x1557bb(0x221)](_0xa1535e,_0x1afc00):VisuMZ['CoreEngine'][_0x1557bb(0x36f)][_0x1557bb(0x573)](this,_0xa1535e,_0x1afc00);},Game_Event[_0x45f0a9(0x7bc)][_0x45f0a9(0x469)]=function(){const _0x428ebd=_0x45f0a9;return VisuMZ[_0x428ebd(0x601)]['Settings'][_0x428ebd(0x8f1)][_0x428ebd(0x634)];},Game_Event[_0x45f0a9(0x7bc)][_0x45f0a9(0x221)]=function(_0x5a59ab,_0x45d348){const _0x2fe788=_0x45f0a9;if(!this[_0x2fe788(0x63d)]())return![];else{const _0x1c0e07=$gameMap[_0x2fe788(0x69e)](_0x5a59ab,_0x45d348)[_0x2fe788(0x87c)](_0x5a1da0=>_0x5a1da0[_0x2fe788(0x63d)]());return _0x1c0e07[_0x2fe788(0x2ad)]>0x0;}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x848)]=Game_Interpreter[_0x45f0a9(0x7bc)]['command105'],Game_Interpreter[_0x45f0a9(0x7bc)][_0x45f0a9(0x576)]=function(_0x567a9e){const _0x240fe1=_0x45f0a9,_0x1f93b1=this['getCombinedScrollingText']();return _0x1f93b1['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x240fe1(0x3ce)](_0x1f93b1):VisuMZ['CoreEngine'][_0x240fe1(0x848)][_0x240fe1(0x573)](this,_0x567a9e);},Game_Interpreter[_0x45f0a9(0x7bc)]['getCombinedScrollingText']=function(){const _0x5baac8=_0x45f0a9;let _0x3ce2d0='',_0x4c63f6=this[_0x5baac8(0x135)]+0x1;while(this[_0x5baac8(0x244)][_0x4c63f6]&&this[_0x5baac8(0x244)][_0x4c63f6][_0x5baac8(0x134)]===0x195){_0x3ce2d0+=this[_0x5baac8(0x244)][_0x4c63f6][_0x5baac8(0x16b)][0x0]+'\x0a',_0x4c63f6++;}return _0x3ce2d0;},Game_Interpreter['prototype']['runCombinedScrollingTextAsCode']=function(_0x226060){const _0x3680b5=_0x45f0a9;try{eval(_0x226060);}catch(_0xa68741){$gameTemp['isPlaytest']()&&(console['log'](_0x3680b5(0x6a4)),console[_0x3680b5(0x4e0)](_0xa68741));}return!![];},VisuMZ[_0x45f0a9(0x601)]['Game_Interpreter_command111']=Game_Interpreter[_0x45f0a9(0x7bc)][_0x45f0a9(0x58c)],Game_Interpreter['prototype'][_0x45f0a9(0x58c)]=function(_0x53df96){const _0x554c0f=_0x45f0a9;try{VisuMZ['CoreEngine'][_0x554c0f(0x760)]['call'](this,_0x53df96);}catch(_0xd8654f){$gameTemp[_0x554c0f(0x88e)]()&&(console[_0x554c0f(0x4e0)](_0x554c0f(0x546)),console['log'](_0xd8654f)),this[_0x554c0f(0x58f)]();}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command122']=Game_Interpreter[_0x45f0a9(0x7bc)][_0x45f0a9(0x4c5)],Game_Interpreter[_0x45f0a9(0x7bc)][_0x45f0a9(0x4c5)]=function(_0x1be657){const _0x40322f=_0x45f0a9;try{VisuMZ[_0x40322f(0x601)][_0x40322f(0x502)][_0x40322f(0x573)](this,_0x1be657);}catch(_0x2a95d8){$gameTemp[_0x40322f(0x88e)]()&&(console[_0x40322f(0x4e0)]('Control\x20Variables\x20Script\x20Error'),console[_0x40322f(0x4e0)](_0x2a95d8));}return!![];},VisuMZ['CoreEngine'][_0x45f0a9(0x119)]=Game_Interpreter['prototype'][_0x45f0a9(0x553)],Game_Interpreter[_0x45f0a9(0x7bc)][_0x45f0a9(0x553)]=function(){const _0x2a45d1=_0x45f0a9;try{VisuMZ[_0x2a45d1(0x601)][_0x2a45d1(0x119)][_0x2a45d1(0x573)](this);}catch(_0x371dd5){$gameTemp[_0x2a45d1(0x88e)]()&&(console[_0x2a45d1(0x4e0)]('Script\x20Call\x20Error'),console['log'](_0x371dd5));}return!![];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x542)]=Game_Interpreter['prototype'][_0x45f0a9(0x189)],Game_Interpreter[_0x45f0a9(0x7bc)]['command357']=function(_0x193486){const _0x18f455=_0x45f0a9;return $gameTemp[_0x18f455(0x3e1)](this),VisuMZ['CoreEngine'][_0x18f455(0x542)]['call'](this,_0x193486);},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x6cf)]=function(){const _0x1e045b=_0x45f0a9;return VisuMZ['CoreEngine'][_0x1e045b(0x5ba)]['UI'][_0x1e045b(0x717)];},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x2d7)]=function(){const _0x27cf58=_0x45f0a9;return VisuMZ[_0x27cf58(0x601)][_0x27cf58(0x5ba)]['UI']['BottomHelp'];},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x3e9)]=function(){const _0x215dad=_0x45f0a9;return VisuMZ[_0x215dad(0x601)][_0x215dad(0x5ba)]['UI'][_0x215dad(0x25d)];},Scene_Base['prototype'][_0x45f0a9(0x856)]=function(){const _0x1bc6d5=_0x45f0a9;return VisuMZ[_0x1bc6d5(0x601)][_0x1bc6d5(0x5ba)]['UI'][_0x1bc6d5(0x7ff)];},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x4b6)]=function(){const _0x304f90=_0x45f0a9;return VisuMZ[_0x304f90(0x601)][_0x304f90(0x5ba)]['UI'][_0x304f90(0x859)];},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x867)]=function(){const _0x16b3b4=_0x45f0a9;return VisuMZ[_0x16b3b4(0x601)][_0x16b3b4(0x5ba)]['UI'][_0x16b3b4(0x42a)];},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x1a8)]=function(){const _0x2da001=_0x45f0a9;return VisuMZ[_0x2da001(0x601)][_0x2da001(0x5ba)][_0x2da001(0x74d)][_0x2da001(0x118)];},VisuMZ['CoreEngine'][_0x45f0a9(0x6b4)]=Scene_Base['prototype'][_0x45f0a9(0x298)],Scene_Base[_0x45f0a9(0x7bc)]['createWindowLayer']=function(){const _0x2d2f45=_0x45f0a9;VisuMZ[_0x2d2f45(0x601)]['Scene_Base_createWindowLayer'][_0x2d2f45(0x573)](this),this['createButtonAssistWindow'](),this[_0x2d2f45(0x69f)](),this[_0x2d2f45(0x8fc)]['x']=Math[_0x2d2f45(0x640)](this['_windowLayer']['x']),this['_windowLayer']['y']=Math['round'](this['_windowLayer']['y']);},Scene_Base['prototype'][_0x45f0a9(0x6e9)]=function(){},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x69f)]=function(){const _0x31beb7=_0x45f0a9;this['_textPopupWindow']=new Window_TextPopup(),this[_0x31beb7(0x2c5)](this['_textPopupWindow']);},$textPopup=function(_0x387e93){const _0x140650=_0x45f0a9,_0xa253c7=SceneManager['_scene']['_textPopupWindow'];_0xa253c7&&_0xa253c7[_0x140650(0x35c)](_0x387e93);},Scene_Base['prototype'][_0x45f0a9(0x361)]=function(){return TextManager['getInputMultiButtonStrings']('pageup','pagedown');},Scene_Base['prototype'][_0x45f0a9(0x3da)]=function(){const _0x2608f7=_0x45f0a9;return TextManager[_0x2608f7(0x360)]('tab');},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x561)]=function(){const _0x28b093=_0x45f0a9;return TextManager[_0x28b093(0x360)]('shift');},Scene_Base[_0x45f0a9(0x7bc)]['buttonAssistKey4']=function(){const _0x2ff3f3=_0x45f0a9;return TextManager[_0x2ff3f3(0x360)]('ok');},Scene_Base['prototype'][_0x45f0a9(0x1f3)]=function(){const _0x25ce01=_0x45f0a9;return TextManager[_0x25ce01(0x360)](_0x25ce01(0x844));},Scene_Base[_0x45f0a9(0x7bc)]['buttonAssistText1']=function(){const _0x124af2=_0x45f0a9;return this[_0x124af2(0x3f1)]&&this[_0x124af2(0x3f1)][_0x124af2(0x470)]?TextManager[_0x124af2(0x614)]:'';},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x440)]=function(){return'';},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x1f1)]=function(){return'';},Scene_Base[_0x45f0a9(0x7bc)]['buttonAssistText4']=function(){const _0x49d27d=_0x45f0a9;return TextManager[_0x49d27d(0x787)];},Scene_Base['prototype']['buttonAssistText5']=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x269)]=function(){return 0x0;},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x7f6)]=function(){return 0x0;},Scene_Base['prototype'][_0x45f0a9(0x619)]=function(){return 0x0;},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x7de)]=function(){return 0x0;},Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x133)]=function(){return 0x0;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x866)]=Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x5c9)],Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x5c9)]=function(){const _0x249812=_0x45f0a9;VisuMZ[_0x249812(0x601)][_0x249812(0x866)]['call'](this),this['loadGameImagesCoreEngine']();},Scene_Boot['prototype'][_0x45f0a9(0x270)]=function(){const _0x2dbbd3=_0x45f0a9,_0x296fd4=[_0x2dbbd3(0x320),'battlebacks1',_0x2dbbd3(0x13f),_0x2dbbd3(0x1a2),_0x2dbbd3(0x657),_0x2dbbd3(0x64d),_0x2dbbd3(0x8e1),_0x2dbbd3(0x515),_0x2dbbd3(0x4d7),_0x2dbbd3(0x2bd),'system',_0x2dbbd3(0x48a),_0x2dbbd3(0x6bb),'titles2'];for(const _0x2b1f4e of _0x296fd4){const _0x59a56c=VisuMZ[_0x2dbbd3(0x601)]['Settings'][_0x2dbbd3(0x87b)][_0x2b1f4e],_0x2b478f=_0x2dbbd3(0x730)[_0x2dbbd3(0x525)](_0x2b1f4e);for(const _0x4b5f1d of _0x59a56c){ImageManager['loadBitmap'](_0x2b478f,_0x4b5f1d);}}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x1fb)]=Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x353)],Scene_Boot['prototype'][_0x45f0a9(0x353)]=function(){const _0x5afdb3=_0x45f0a9;Utils[_0x5afdb3(0x22c)](_0x5afdb3(0x2a3))&&VisuMZ[_0x5afdb3(0x601)][_0x5afdb3(0x5ba)][_0x5afdb3(0x8f1)][_0x5afdb3(0x674)]?this['startAutoNewGame']():VisuMZ[_0x5afdb3(0x601)]['Scene_Boot_startNormalGame'][_0x5afdb3(0x573)](this);},Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x580)]=function(){const _0x5e6787=_0x45f0a9;this[_0x5e6787(0x83b)](),DataManager[_0x5e6787(0x567)](),SceneManager[_0x5e6787(0x5d2)](Scene_Map);},Scene_Boot[_0x45f0a9(0x7bc)]['adjustBoxSize']=function(){const _0xe8a430=_0x45f0a9,_0xcaec1a=$dataSystem['advanced'][_0xe8a430(0x861)],_0x1a153a=$dataSystem[_0xe8a430(0x3c9)][_0xe8a430(0x434)],_0x351aca=VisuMZ[_0xe8a430(0x601)]['Settings']['UI'][_0xe8a430(0x427)];Graphics[_0xe8a430(0x2a2)]=_0xcaec1a-_0x351aca*0x2,Graphics[_0xe8a430(0x7f2)]=_0x1a153a-_0x351aca*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x23b)]=Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x8cb)],Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x8cb)]=function(){const _0x20c1de=_0x45f0a9;this[_0x20c1de(0x771)]()?this[_0x20c1de(0x652)]():VisuMZ['CoreEngine']['Scene_Boot_updateDocumentTitle'][_0x20c1de(0x573)](this);},Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x771)]=function(){const _0x4c24ed=_0x45f0a9;if(Scene_Title['subtitle']==='')return![];if(Scene_Title[_0x4c24ed(0x499)]===_0x4c24ed(0x7e5))return![];if(Scene_Title['version']==='')return![];if(Scene_Title['version']===_0x4c24ed(0x853))return![];return!![];},Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x652)]=function(){const _0x3c2f07=_0x45f0a9,_0x23e255=$dataSystem[_0x3c2f07(0x23a)],_0x156fdb=Scene_Title[_0x3c2f07(0x499)]||'',_0x47ce6c=Scene_Title[_0x3c2f07(0x59b)]||'',_0x236185=VisuMZ[_0x3c2f07(0x601)]['Settings'][_0x3c2f07(0x568)]['Title'][_0x3c2f07(0x718)],_0x45f272=_0x236185[_0x3c2f07(0x525)](_0x23e255,_0x156fdb,_0x47ce6c);document[_0x3c2f07(0x550)]=_0x45f272;},Scene_Boot[_0x45f0a9(0x7bc)][_0x45f0a9(0x6fa)]=function(){const _0x1b1952=_0x45f0a9;if(VisuMZ[_0x1b1952(0x601)][_0x1b1952(0x5ba)]['UI']['SideButtons']){const _0x382576=Graphics[_0x1b1952(0x4bc)]-Graphics[_0x1b1952(0x2a2)]-VisuMZ[_0x1b1952(0x601)][_0x1b1952(0x5ba)]['UI'][_0x1b1952(0x427)]*0x2,_0x3018e7=Sprite_Button[_0x1b1952(0x7bc)]['blockWidth']['call'](this)*0x4;if(_0x382576>=_0x3018e7)SceneManager[_0x1b1952(0x39b)](!![]);}},Scene_Title[_0x45f0a9(0x499)]=VisuMZ['CoreEngine']['Settings'][_0x45f0a9(0x568)][_0x45f0a9(0x6e1)]['Subtitle'],Scene_Title['version']=VisuMZ[_0x45f0a9(0x601)]['Settings'][_0x45f0a9(0x568)][_0x45f0a9(0x6e1)]['Version'],Scene_Title[_0x45f0a9(0x611)]=VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)]['TitlePicButtons'],VisuMZ[_0x45f0a9(0x601)]['Scene_Title_drawGameTitle']=Scene_Title[_0x45f0a9(0x7bc)]['drawGameTitle'],Scene_Title['prototype']['drawGameTitle']=function(){const _0x5b2d36=_0x45f0a9;VisuMZ['CoreEngine'][_0x5b2d36(0x5ba)]['MenuLayout'][_0x5b2d36(0x6e1)][_0x5b2d36(0x324)][_0x5b2d36(0x573)](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x5b2d36(0x499)]!=='Subtitle')this[_0x5b2d36(0x242)]();if(Scene_Title['version']!==''&&Scene_Title[_0x5b2d36(0x59b)]!==_0x5b2d36(0x853))this[_0x5b2d36(0x8f9)]();},Scene_Title[_0x45f0a9(0x7bc)][_0x45f0a9(0x242)]=function(){const _0x46f9b3=_0x45f0a9;VisuMZ['CoreEngine']['Settings'][_0x46f9b3(0x568)][_0x46f9b3(0x6e1)][_0x46f9b3(0x242)][_0x46f9b3(0x573)](this);},Scene_Title[_0x45f0a9(0x7bc)][_0x45f0a9(0x8f9)]=function(){const _0x46edb0=_0x45f0a9;VisuMZ[_0x46edb0(0x601)]['Settings']['MenuLayout']['Title'][_0x46edb0(0x8f9)]['call'](this);},Scene_Title[_0x45f0a9(0x7bc)][_0x45f0a9(0x8b9)]=function(){const _0x449dcf=_0x45f0a9;this[_0x449dcf(0x8e7)]();const _0x3a6628=$dataSystem['titleCommandWindow'][_0x449dcf(0x1bd)],_0x132a7a=this['commandWindowRect']();this[_0x449dcf(0x306)]=new Window_TitleCommand(_0x132a7a),this[_0x449dcf(0x306)][_0x449dcf(0x3f2)](_0x3a6628);const _0x12c233=this[_0x449dcf(0x8d6)]();this[_0x449dcf(0x306)][_0x449dcf(0x2f0)](_0x12c233['x'],_0x12c233['y'],_0x12c233[_0x449dcf(0x4bc)],_0x12c233[_0x449dcf(0x2a5)]),this['_commandWindow'][_0x449dcf(0x7c5)](),this[_0x449dcf(0x306)]['refresh'](),this['_commandWindow'][_0x449dcf(0x4be)](),this['addWindow'](this[_0x449dcf(0x306)]);},Scene_Title[_0x45f0a9(0x7bc)][_0x45f0a9(0x2be)]=function(){const _0x3f9ffb=_0x45f0a9;return this[_0x3f9ffb(0x306)]?this[_0x3f9ffb(0x306)]['maxItems']():VisuMZ['CoreEngine'][_0x3f9ffb(0x5ba)][_0x3f9ffb(0x66f)]['length'];},Scene_Title[_0x45f0a9(0x7bc)][_0x45f0a9(0x8d6)]=function(){const _0x3ac80c=_0x45f0a9;return VisuMZ[_0x3ac80c(0x601)][_0x3ac80c(0x5ba)]['MenuLayout']['Title'][_0x3ac80c(0x225)][_0x3ac80c(0x573)](this);},Scene_Title[_0x45f0a9(0x7bc)][_0x45f0a9(0x8e7)]=function(){const _0x287522=_0x45f0a9;for(const _0xbaf63a of Scene_Title[_0x287522(0x611)]){const _0x4639d7=new Sprite_TitlePictureButton(_0xbaf63a);this['addChild'](_0x4639d7);}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x490)]=Scene_Map['prototype']['initialize'],Scene_Map[_0x45f0a9(0x7bc)]['initialize']=function(){const _0x1008dd=_0x45f0a9;VisuMZ[_0x1008dd(0x601)]['Scene_Map_initialize'][_0x1008dd(0x573)](this),$gameTemp[_0x1008dd(0x624)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x411)]=Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x30b)],Scene_Map['prototype'][_0x45f0a9(0x30b)]=function(){const _0x149278=_0x45f0a9;VisuMZ[_0x149278(0x601)][_0x149278(0x411)]['call'](this),$gameTemp[_0x149278(0x21d)]&&!$gameMessage[_0x149278(0x349)]()&&(this[_0x149278(0x5a7)](),SceneManager[_0x149278(0x2cd)]());},Scene_Map[_0x45f0a9(0x7bc)]['terminate']=function(){const _0x137591=_0x45f0a9;Scene_Message['prototype']['terminate'][_0x137591(0x573)](this),!SceneManager[_0x137591(0x7fa)](Scene_Battle)&&(this[_0x137591(0x29e)][_0x137591(0x314)](),this['_mapNameWindow']['hide'](),this['_windowLayer'][_0x137591(0x470)]=![],SceneManager['snapForBackground']()),$gameScreen[_0x137591(0x5b9)](),this[_0x137591(0x38e)]();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x27f)]=Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x5bd)],Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x5bd)]=function(){const _0x520af8=_0x45f0a9;VisuMZ['CoreEngine']['Scene_Map_createMenuButton'][_0x520af8(0x573)](this),SceneManager['isSideButtonLayout']()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map['prototype']['moveMenuButtonSideButtonLayout']=function(){const _0x198e2f=_0x45f0a9;this[_0x198e2f(0x532)]['x']=Graphics[_0x198e2f(0x2a2)]+0x4;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x791)]=Scene_Map[_0x45f0a9(0x7bc)]['updateScene'],Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x2d0)]=function(){const _0x120dc5=_0x45f0a9;VisuMZ['CoreEngine'][_0x120dc5(0x791)][_0x120dc5(0x573)](this),this['updateDashToggle']();},Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x2d3)]=function(){const _0x183b35=_0x45f0a9;Input['isTriggered'](_0x183b35(0x68d))&&(ConfigManager[_0x183b35(0x3fe)]=!ConfigManager[_0x183b35(0x3fe)],ConfigManager['save']());},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x492)]=Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x5a7)],Scene_Map['prototype'][_0x45f0a9(0x5a7)]=function(){const _0x3dcae3=_0x45f0a9;VisuMZ[_0x3dcae3(0x601)][_0x3dcae3(0x492)]['call'](this),this[_0x3dcae3(0x3fa)]();},Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x38e)]=function(){const _0x285ae1=_0x45f0a9;this[_0x285ae1(0x2dc)]=[];},Scene_Map[_0x45f0a9(0x7bc)]['updateOnceParallelInterpreters']=function(){const _0x38d6c3=_0x45f0a9;if(!this[_0x38d6c3(0x2dc)])return;for(const _0x23ff01 of this[_0x38d6c3(0x2dc)]){_0x23ff01&&_0x23ff01[_0x38d6c3(0x314)]();}},Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x775)]=function(_0x3a7f85,_0x4118b7){const _0x25afb5=_0x45f0a9,_0x33056f=$dataCommonEvents[_0x3a7f85];if(!_0x33056f)return;const _0x11159a=new Game_OnceParallelInterpreter();this[_0x25afb5(0x1b2)](_0x11159a),_0x11159a[_0x25afb5(0x785)](_0x3a7f85),_0x11159a['setEvent'](_0x4118b7);},Scene_Map['prototype'][_0x45f0a9(0x1b2)]=function(_0x3fee2a){const _0x159954=_0x45f0a9;this['_onceParallelInterpreters']=this[_0x159954(0x2dc)]||[],this[_0x159954(0x2dc)][_0x159954(0x5f7)](_0x3fee2a);},Scene_Map[_0x45f0a9(0x7bc)]['removeOnceParallelInterpreter']=function(_0x11876a){const _0x4ad886=_0x45f0a9;this[_0x4ad886(0x2dc)]=this[_0x4ad886(0x2dc)]||[],this['_onceParallelInterpreters'][_0x4ad886(0x354)](_0x11876a);};function Game_OnceParallelInterpreter(){this['initialize'](...arguments);}Game_OnceParallelInterpreter[_0x45f0a9(0x7bc)]=Object[_0x45f0a9(0x772)](Game_Interpreter['prototype']),Game_OnceParallelInterpreter[_0x45f0a9(0x7bc)]['constructor']=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x45f0a9(0x785)]=function(_0x77e813){const _0x3303b5=_0x45f0a9,_0xd27b25=$dataCommonEvents[_0x77e813];_0xd27b25?this[_0x3303b5(0x197)](_0xd27b25[_0x3303b5(0x53d)],0x0):this[_0x3303b5(0x6b8)]();},Game_OnceParallelInterpreter[_0x45f0a9(0x7bc)][_0x45f0a9(0x333)]=function(_0x47b624){this['_eventId']=_0x47b624||0x0;},Game_OnceParallelInterpreter[_0x45f0a9(0x7bc)][_0x45f0a9(0x6b8)]=function(){const _0x39f8a5=_0x45f0a9;if(!SceneManager[_0x39f8a5(0x8fd)]())return;SceneManager['_scene'][_0x39f8a5(0x7d5)](this),Game_Interpreter[_0x39f8a5(0x7bc)][_0x39f8a5(0x6b8)]['call'](this);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x6e5)]=Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x413)],Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x413)]=function(){const _0x454c2f=_0x45f0a9;let _0x41da2e=0x0;return SceneManager[_0x454c2f(0x68c)]()?_0x41da2e=this[_0x454c2f(0x7f8)]():_0x41da2e=VisuMZ[_0x454c2f(0x601)][_0x454c2f(0x6e5)]['call'](this),_0x41da2e;},Scene_MenuBase['prototype'][_0x45f0a9(0x7f8)]=function(){const _0x345220=_0x45f0a9;return this[_0x345220(0x2d7)]()?this[_0x345220(0x704)]():0x0;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x19b)]=Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x1fa)],Scene_MenuBase['prototype'][_0x45f0a9(0x1fa)]=function(){const _0x278600=_0x45f0a9;return SceneManager['areButtonsOutsideMainUI']()?this[_0x278600(0x767)]():VisuMZ[_0x278600(0x601)]['Scene_MenuBase_mainAreaTop']['call'](this);},Scene_MenuBase[_0x45f0a9(0x7bc)]['mainAreaTopSideButtonLayout']=function(){const _0x473f53=_0x45f0a9;if(!this[_0x473f53(0x2d7)]())return this[_0x473f53(0x80f)]();else return this[_0x473f53(0x56b)]()&&this['getButtonAssistLocation']()===_0x473f53(0x184)?Window_ButtonAssist[_0x473f53(0x7bc)][_0x473f53(0x59c)]():0x0;},VisuMZ['CoreEngine'][_0x45f0a9(0x75f)]=Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x299)],Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x299)]=function(){const _0x148da2=_0x45f0a9;let _0x11bbbf=0x0;return SceneManager[_0x148da2(0x68c)]()?_0x11bbbf=this['mainAreaHeightSideButtonLayout']():_0x11bbbf=VisuMZ['CoreEngine'][_0x148da2(0x75f)][_0x148da2(0x573)](this),this['isMenuButtonAssistEnabled']()&&this[_0x148da2(0x236)]()!==_0x148da2(0x77f)&&(_0x11bbbf-=Window_ButtonAssist['prototype']['lineHeight']()),_0x11bbbf;},Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x87d)]=function(){const _0x4a89bb=_0x45f0a9;return Graphics[_0x4a89bb(0x7f2)]-this[_0x4a89bb(0x370)]();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4db)]=Scene_MenuBase['prototype'][_0x45f0a9(0x521)],Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x521)]=function(){const _0x4fdff8=_0x45f0a9,_0x2d7380=VisuMZ['CoreEngine'][_0x4fdff8(0x5ba)][_0x4fdff8(0x85d)][_0x4fdff8(0x581)]??0x8;this[_0x4fdff8(0x217)]=new PIXI[(_0x4fdff8(0x6c4))][(_0x4fdff8(0x179))](_0x2d7380),this[_0x4fdff8(0x5df)]=new Sprite(),this[_0x4fdff8(0x5df)][_0x4fdff8(0x6e7)]=SceneManager[_0x4fdff8(0x2b5)](),this['_backgroundSprite'][_0x4fdff8(0x6c4)]=[this[_0x4fdff8(0x217)]],this['addChild'](this['_backgroundSprite']),this[_0x4fdff8(0x33c)](0xc0),this[_0x4fdff8(0x33c)](this['getBackgroundOpacity']()),this[_0x4fdff8(0x222)]();},Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x6bf)]=function(){const _0xc5ac77=_0x45f0a9,_0x35b6af=String(this[_0xc5ac77(0x1d3)][_0xc5ac77(0x3d0)]),_0xe96536=this['getCustomBackgroundSettings'](_0x35b6af);return _0xe96536?_0xe96536[_0xc5ac77(0x8a5)]:0xc0;},Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x222)]=function(){const _0x2555b9=_0x45f0a9,_0x5860d6=String(this[_0x2555b9(0x1d3)][_0x2555b9(0x3d0)]),_0x897bb4=this[_0x2555b9(0x44f)](_0x5860d6);_0x897bb4&&(_0x897bb4['BgFilename1']!==''||_0x897bb4['BgFilename2']!=='')&&(this[_0x2555b9(0x53e)]=new Sprite(ImageManager[_0x2555b9(0x89a)](_0x897bb4[_0x2555b9(0x3aa)])),this[_0x2555b9(0x50a)]=new Sprite(ImageManager[_0x2555b9(0x599)](_0x897bb4[_0x2555b9(0x339)])),this[_0x2555b9(0x2c5)](this[_0x2555b9(0x53e)]),this[_0x2555b9(0x2c5)](this[_0x2555b9(0x50a)]),this['_backSprite1'][_0x2555b9(0x6e7)]['addLoadListener'](this['adjustSprite'][_0x2555b9(0x159)](this,this[_0x2555b9(0x53e)])),this[_0x2555b9(0x50a)]['bitmap']['addLoadListener'](this[_0x2555b9(0x2e0)][_0x2555b9(0x159)](this,this[_0x2555b9(0x50a)])));},Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x44f)]=function(_0x25745c){const _0x16ba50=_0x45f0a9;return VisuMZ[_0x16ba50(0x601)][_0x16ba50(0x5ba)][_0x16ba50(0x85d)][_0x25745c]||VisuMZ[_0x16ba50(0x601)][_0x16ba50(0x5ba)][_0x16ba50(0x85d)]['Scene_Unlisted'];},Scene_MenuBase[_0x45f0a9(0x7bc)]['adjustSprite']=function(_0x13c5c0){const _0x1a3218=_0x45f0a9;this[_0x1a3218(0x71b)](_0x13c5c0),this[_0x1a3218(0x689)](_0x13c5c0);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x34a)]=Scene_MenuBase['prototype'][_0x45f0a9(0x3dc)],Scene_MenuBase['prototype'][_0x45f0a9(0x3dc)]=function(){const _0x1ceb56=_0x45f0a9;VisuMZ[_0x1ceb56(0x601)][_0x1ceb56(0x34a)][_0x1ceb56(0x573)](this),SceneManager['isSideButtonLayout']()&&this[_0x1ceb56(0x5ea)]();},Scene_MenuBase[_0x45f0a9(0x7bc)]['moveCancelButtonSideButtonLayout']=function(){const _0x4846ea=_0x45f0a9;this[_0x4846ea(0x738)]['x']=Graphics[_0x4846ea(0x2a2)]+0x4;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x89b)]=Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x750)],Scene_MenuBase[_0x45f0a9(0x7bc)]['createPageButtons']=function(){const _0x579442=_0x45f0a9;VisuMZ[_0x579442(0x601)][_0x579442(0x89b)][_0x579442(0x573)](this),SceneManager['isSideButtonLayout']()&&this[_0x579442(0x578)]();},Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x578)]=function(){const _0x335867=_0x45f0a9;this[_0x335867(0x3f1)]['x']=-0x1*(this[_0x335867(0x3f1)][_0x335867(0x4bc)]+this[_0x335867(0x4b5)][_0x335867(0x4bc)]+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x335867(0x4b5)]['width']+0x4);},Scene_MenuBase['prototype'][_0x45f0a9(0x56b)]=function(){const _0x34e7f8=_0x45f0a9;return VisuMZ[_0x34e7f8(0x601)][_0x34e7f8(0x5ba)][_0x34e7f8(0x554)][_0x34e7f8(0x3c4)];},Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x236)]=function(){const _0x3f8319=_0x45f0a9;return SceneManager['isSideButtonLayout']()||SceneManager['areButtonsHidden']()?VisuMZ[_0x3f8319(0x601)][_0x3f8319(0x5ba)][_0x3f8319(0x554)][_0x3f8319(0x870)]:_0x3f8319(0x77f);},Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x6e9)]=function(){const _0x43796b=_0x45f0a9;if(!this[_0x43796b(0x56b)]())return;const _0x41bda3=this[_0x43796b(0x865)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x41bda3),this[_0x43796b(0x2e9)](this[_0x43796b(0x874)]);},Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x865)]=function(){const _0x5e7a8e=_0x45f0a9;return this[_0x5e7a8e(0x236)]()===_0x5e7a8e(0x77f)?this[_0x5e7a8e(0x5d8)]():this[_0x5e7a8e(0x1c7)]();},Scene_MenuBase['prototype']['buttonAssistWindowButtonRect']=function(){const _0x1ed165=_0x45f0a9,_0x5dc32d=ConfigManager['touchUI']?(Sprite_Button[_0x1ed165(0x7bc)][_0x1ed165(0x146)]()+0x6)*0x2:0x0,_0x38ec02=this['buttonY'](),_0x5cf4ee=Graphics[_0x1ed165(0x2a2)]-_0x5dc32d*0x2,_0xe3925e=this[_0x1ed165(0x867)]();return new Rectangle(_0x5dc32d,_0x38ec02,_0x5cf4ee,_0xe3925e);},Scene_MenuBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x1c7)]=function(){const _0x50c86a=_0x45f0a9,_0x1e7f86=Graphics[_0x50c86a(0x2a2)],_0x4b175c=Window_ButtonAssist[_0x50c86a(0x7bc)]['lineHeight'](),_0x3d8cbd=0x0;let _0x3081b3=0x0;return this['getButtonAssistLocation']()===_0x50c86a(0x184)?_0x3081b3=0x0:_0x3081b3=Graphics[_0x50c86a(0x7f2)]-_0x4b175c,new Rectangle(_0x3d8cbd,_0x3081b3,_0x1e7f86,_0x4b175c);},Scene_Menu[_0x45f0a9(0x18e)]=VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x568)]['MainMenu'],VisuMZ['CoreEngine'][_0x45f0a9(0x2ec)]=Scene_Menu[_0x45f0a9(0x7bc)][_0x45f0a9(0x772)],Scene_Menu[_0x45f0a9(0x7bc)][_0x45f0a9(0x772)]=function(){const _0x2ee70c=_0x45f0a9;VisuMZ['CoreEngine'][_0x2ee70c(0x2ec)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x45f0a9(0x7bc)][_0x45f0a9(0x1e1)]=function(){const _0x23e6ab=_0x45f0a9;this[_0x23e6ab(0x306)]&&this[_0x23e6ab(0x306)]['setBackgroundType'](Scene_Menu[_0x23e6ab(0x18e)][_0x23e6ab(0x1b1)]),this[_0x23e6ab(0x15a)]&&this['_goldWindow'][_0x23e6ab(0x3f2)](Scene_Menu[_0x23e6ab(0x18e)]['GoldBgType']),this[_0x23e6ab(0x46c)]&&this[_0x23e6ab(0x46c)][_0x23e6ab(0x3f2)](Scene_Menu[_0x23e6ab(0x18e)][_0x23e6ab(0x788)]);},Scene_Menu[_0x45f0a9(0x7bc)][_0x45f0a9(0x8d6)]=function(){const _0x483b2e=_0x45f0a9;return Scene_Menu['layoutSettings'][_0x483b2e(0x225)][_0x483b2e(0x573)](this);},Scene_Menu[_0x45f0a9(0x7bc)][_0x45f0a9(0x5de)]=function(){const _0x12811a=_0x45f0a9;return Scene_Menu[_0x12811a(0x18e)][_0x12811a(0x3bb)][_0x12811a(0x573)](this);},Scene_Menu[_0x45f0a9(0x7bc)]['statusWindowRect']=function(){const _0x270609=_0x45f0a9;return Scene_Menu[_0x270609(0x18e)]['StatusRect'][_0x270609(0x573)](this);},Scene_Item[_0x45f0a9(0x18e)]=VisuMZ['CoreEngine'][_0x45f0a9(0x5ba)][_0x45f0a9(0x568)][_0x45f0a9(0x6c8)],VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x61c)]=Scene_Item[_0x45f0a9(0x7bc)][_0x45f0a9(0x772)],Scene_Item['prototype'][_0x45f0a9(0x772)]=function(){const _0x225b1e=_0x45f0a9;VisuMZ['CoreEngine'][_0x225b1e(0x61c)][_0x225b1e(0x573)](this),this[_0x225b1e(0x1e1)]();},Scene_Item[_0x45f0a9(0x7bc)][_0x45f0a9(0x1e1)]=function(){const _0x26e393=_0x45f0a9;this[_0x26e393(0x388)]&&this[_0x26e393(0x388)][_0x26e393(0x3f2)](Scene_Item[_0x26e393(0x18e)][_0x26e393(0x883)]),this[_0x26e393(0x661)]&&this[_0x26e393(0x661)][_0x26e393(0x3f2)](Scene_Item[_0x26e393(0x18e)][_0x26e393(0x6c5)]),this['_itemWindow']&&this[_0x26e393(0x459)]['setBackgroundType'](Scene_Item[_0x26e393(0x18e)][_0x26e393(0x7d7)]),this[_0x26e393(0x3ea)]&&this[_0x26e393(0x3ea)][_0x26e393(0x3f2)](Scene_Item[_0x26e393(0x18e)][_0x26e393(0x2fb)]);},Scene_Item['prototype'][_0x45f0a9(0x282)]=function(){const _0x5491f0=_0x45f0a9;return Scene_Item[_0x5491f0(0x18e)]['HelpRect'][_0x5491f0(0x573)](this);},Scene_Item[_0x45f0a9(0x7bc)][_0x45f0a9(0x8a9)]=function(){const _0x123e76=_0x45f0a9;return Scene_Item['layoutSettings'][_0x123e76(0x423)][_0x123e76(0x573)](this);},Scene_Item[_0x45f0a9(0x7bc)][_0x45f0a9(0x42e)]=function(){const _0xb7874f=_0x45f0a9;return Scene_Item[_0xb7874f(0x18e)][_0xb7874f(0x344)]['call'](this);},Scene_Item[_0x45f0a9(0x7bc)][_0x45f0a9(0x1fc)]=function(){const _0x3ef69b=_0x45f0a9;return Scene_Item[_0x3ef69b(0x18e)]['ActorRect']['call'](this);},Scene_Skill[_0x45f0a9(0x18e)]=VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x568)][_0x45f0a9(0x506)],VisuMZ['CoreEngine'][_0x45f0a9(0x55f)]=Scene_Skill['prototype'][_0x45f0a9(0x772)],Scene_Skill[_0x45f0a9(0x7bc)]['create']=function(){const _0x306718=_0x45f0a9;VisuMZ[_0x306718(0x601)][_0x306718(0x55f)][_0x306718(0x573)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x45f0a9(0x7bc)][_0x45f0a9(0x1e1)]=function(){const _0x3b3ce7=_0x45f0a9;this[_0x3b3ce7(0x388)]&&this[_0x3b3ce7(0x388)]['setBackgroundType'](Scene_Skill[_0x3b3ce7(0x18e)][_0x3b3ce7(0x883)]),this[_0x3b3ce7(0x12d)]&&this['_skillTypeWindow'][_0x3b3ce7(0x3f2)](Scene_Skill['layoutSettings']['SkillTypeBgType']),this[_0x3b3ce7(0x46c)]&&this['_statusWindow'][_0x3b3ce7(0x3f2)](Scene_Skill[_0x3b3ce7(0x18e)]['StatusBgType']),this[_0x3b3ce7(0x459)]&&this[_0x3b3ce7(0x459)]['setBackgroundType'](Scene_Skill[_0x3b3ce7(0x18e)]['ItemBgType']),this[_0x3b3ce7(0x3ea)]&&this[_0x3b3ce7(0x3ea)][_0x3b3ce7(0x3f2)](Scene_Skill['layoutSettings'][_0x3b3ce7(0x2fb)]);},Scene_Skill['prototype'][_0x45f0a9(0x282)]=function(){const _0x4a9248=_0x45f0a9;return Scene_Skill['layoutSettings'][_0x4a9248(0x1e0)][_0x4a9248(0x573)](this);},Scene_Skill[_0x45f0a9(0x7bc)][_0x45f0a9(0x130)]=function(){const _0x5ee9cf=_0x45f0a9;return Scene_Skill[_0x5ee9cf(0x18e)][_0x5ee9cf(0x537)][_0x5ee9cf(0x573)](this);},Scene_Skill['prototype'][_0x45f0a9(0x35f)]=function(){const _0x1ec690=_0x45f0a9;return Scene_Skill[_0x1ec690(0x18e)]['StatusRect'][_0x1ec690(0x573)](this);},Scene_Skill['prototype'][_0x45f0a9(0x42e)]=function(){const _0x242ebd=_0x45f0a9;return Scene_Skill[_0x242ebd(0x18e)][_0x242ebd(0x344)][_0x242ebd(0x573)](this);},Scene_Skill['prototype']['actorWindowRect']=function(){const _0x5b760b=_0x45f0a9;return Scene_Skill[_0x5b760b(0x18e)]['ActorRect']['call'](this);},Scene_Equip[_0x45f0a9(0x18e)]=VisuMZ['CoreEngine'][_0x45f0a9(0x5ba)][_0x45f0a9(0x568)][_0x45f0a9(0x4d0)],VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x1ca)]=Scene_Equip['prototype'][_0x45f0a9(0x772)],Scene_Equip[_0x45f0a9(0x7bc)][_0x45f0a9(0x772)]=function(){const _0x12c14b=_0x45f0a9;VisuMZ[_0x12c14b(0x601)][_0x12c14b(0x1ca)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x34db4d=_0x45f0a9;this[_0x34db4d(0x388)]&&this[_0x34db4d(0x388)][_0x34db4d(0x3f2)](Scene_Equip['layoutSettings'][_0x34db4d(0x883)]),this[_0x34db4d(0x46c)]&&this[_0x34db4d(0x46c)][_0x34db4d(0x3f2)](Scene_Equip[_0x34db4d(0x18e)][_0x34db4d(0x788)]),this[_0x34db4d(0x306)]&&this['_commandWindow'][_0x34db4d(0x3f2)](Scene_Equip[_0x34db4d(0x18e)]['CommandBgType']),this[_0x34db4d(0x292)]&&this[_0x34db4d(0x292)][_0x34db4d(0x3f2)](Scene_Equip[_0x34db4d(0x18e)][_0x34db4d(0x586)]),this[_0x34db4d(0x459)]&&this['_itemWindow'][_0x34db4d(0x3f2)](Scene_Equip[_0x34db4d(0x18e)][_0x34db4d(0x7d7)]);},Scene_Equip[_0x45f0a9(0x7bc)][_0x45f0a9(0x282)]=function(){const _0xa045eb=_0x45f0a9;return Scene_Equip[_0xa045eb(0x18e)][_0xa045eb(0x1e0)][_0xa045eb(0x573)](this);},Scene_Equip[_0x45f0a9(0x7bc)][_0x45f0a9(0x35f)]=function(){const _0x45f592=_0x45f0a9;return Scene_Equip[_0x45f592(0x18e)][_0x45f592(0x80d)][_0x45f592(0x573)](this);},Scene_Equip[_0x45f0a9(0x7bc)][_0x45f0a9(0x8d6)]=function(){const _0x266b9c=_0x45f0a9;return Scene_Equip[_0x266b9c(0x18e)][_0x266b9c(0x225)][_0x266b9c(0x573)](this);},Scene_Equip[_0x45f0a9(0x7bc)][_0x45f0a9(0x3c3)]=function(){const _0x1d3a3b=_0x45f0a9;return Scene_Equip[_0x1d3a3b(0x18e)][_0x1d3a3b(0x690)][_0x1d3a3b(0x573)](this);},Scene_Equip[_0x45f0a9(0x7bc)][_0x45f0a9(0x42e)]=function(){const _0x59161e=_0x45f0a9;return Scene_Equip[_0x59161e(0x18e)][_0x59161e(0x344)]['call'](this);},Scene_Status[_0x45f0a9(0x18e)]=VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)]['MenuLayout'][_0x45f0a9(0x591)],VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x154)]=Scene_Status['prototype'][_0x45f0a9(0x772)],Scene_Status[_0x45f0a9(0x7bc)]['create']=function(){const _0x408b5a=_0x45f0a9;VisuMZ[_0x408b5a(0x601)][_0x408b5a(0x154)]['call'](this),this[_0x408b5a(0x1e1)]();},Scene_Status[_0x45f0a9(0x7bc)][_0x45f0a9(0x1e1)]=function(){const _0xa6c746=_0x45f0a9;this[_0xa6c746(0x72d)]&&this['_profileWindow'][_0xa6c746(0x3f2)](Scene_Status[_0xa6c746(0x18e)]['ProfileBgType']),this['_statusWindow']&&this['_statusWindow'][_0xa6c746(0x3f2)](Scene_Status['layoutSettings'][_0xa6c746(0x788)]),this[_0xa6c746(0x2b1)]&&this['_statusParamsWindow'][_0xa6c746(0x3f2)](Scene_Status[_0xa6c746(0x18e)][_0xa6c746(0x1c6)]),this[_0xa6c746(0x51a)]&&this[_0xa6c746(0x51a)][_0xa6c746(0x3f2)](Scene_Status[_0xa6c746(0x18e)][_0xa6c746(0x5c7)]);},Scene_Status[_0x45f0a9(0x7bc)][_0x45f0a9(0x23d)]=function(){const _0xb7f76d=_0x45f0a9;return Scene_Status[_0xb7f76d(0x18e)]['ProfileRect']['call'](this);},Scene_Status[_0x45f0a9(0x7bc)][_0x45f0a9(0x35f)]=function(){const _0x442cbc=_0x45f0a9;return Scene_Status[_0x442cbc(0x18e)][_0x442cbc(0x80d)][_0x442cbc(0x573)](this);},Scene_Status[_0x45f0a9(0x7bc)]['statusParamsWindowRect']=function(){const _0x2f3a41=_0x45f0a9;return Scene_Status['layoutSettings'][_0x2f3a41(0x789)][_0x2f3a41(0x573)](this);},Scene_Status['prototype'][_0x45f0a9(0x4d1)]=function(){const _0x92b4e7=_0x45f0a9;return Scene_Status[_0x92b4e7(0x18e)][_0x92b4e7(0x374)]['call'](this);},Scene_Options[_0x45f0a9(0x18e)]=VisuMZ['CoreEngine'][_0x45f0a9(0x5ba)][_0x45f0a9(0x568)][_0x45f0a9(0x48b)],VisuMZ[_0x45f0a9(0x601)]['Scene_Options_create']=Scene_Options[_0x45f0a9(0x7bc)]['create'],Scene_Options[_0x45f0a9(0x7bc)]['create']=function(){const _0x46e3dd=_0x45f0a9;VisuMZ[_0x46e3dd(0x601)][_0x46e3dd(0x678)][_0x46e3dd(0x573)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options['prototype'][_0x45f0a9(0x1e1)]=function(){const _0x37d868=_0x45f0a9;this['_optionsWindow']&&this['_optionsWindow'][_0x37d868(0x3f2)](Scene_Options[_0x37d868(0x18e)][_0x37d868(0x7c3)]);},Scene_Options[_0x45f0a9(0x7bc)][_0x45f0a9(0x131)]=function(){const _0x269d40=_0x45f0a9;return Scene_Options[_0x269d40(0x18e)]['OptionsRect'][_0x269d40(0x573)](this);},Scene_Save[_0x45f0a9(0x18e)]=VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x568)][_0x45f0a9(0x75b)],Scene_Save[_0x45f0a9(0x7bc)][_0x45f0a9(0x772)]=function(){const _0x4c0c1e=_0x45f0a9;Scene_File[_0x4c0c1e(0x7bc)][_0x4c0c1e(0x772)]['call'](this),this[_0x4c0c1e(0x1e1)]();},Scene_Save[_0x45f0a9(0x7bc)][_0x45f0a9(0x1e1)]=function(){const _0x2121af=_0x45f0a9;this[_0x2121af(0x388)]&&this[_0x2121af(0x388)][_0x2121af(0x3f2)](Scene_Save[_0x2121af(0x18e)][_0x2121af(0x883)]),this[_0x2121af(0x720)]&&this[_0x2121af(0x720)][_0x2121af(0x3f2)](Scene_Save['layoutSettings'][_0x2121af(0x633)]);},Scene_Save['prototype'][_0x45f0a9(0x282)]=function(){const _0x50315f=_0x45f0a9;return Scene_Save[_0x50315f(0x18e)]['HelpRect'][_0x50315f(0x573)](this);},Scene_Save[_0x45f0a9(0x7bc)]['listWindowRect']=function(){const _0x1034c6=_0x45f0a9;return Scene_Save[_0x1034c6(0x18e)][_0x1034c6(0x695)][_0x1034c6(0x573)](this);},Scene_Load['layoutSettings']=VisuMZ['CoreEngine'][_0x45f0a9(0x5ba)][_0x45f0a9(0x568)][_0x45f0a9(0x523)],Scene_Load['prototype']['create']=function(){const _0xab9e59=_0x45f0a9;Scene_File[_0xab9e59(0x7bc)][_0xab9e59(0x772)][_0xab9e59(0x573)](this),this[_0xab9e59(0x1e1)]();},Scene_Load['prototype'][_0x45f0a9(0x1e1)]=function(){const _0x2ad43=_0x45f0a9;this['_helpWindow']&&this['_helpWindow'][_0x2ad43(0x3f2)](Scene_Load[_0x2ad43(0x18e)]['HelpBgType']),this[_0x2ad43(0x720)]&&this[_0x2ad43(0x720)]['setBackgroundType'](Scene_Load['layoutSettings'][_0x2ad43(0x633)]);},Scene_Load[_0x45f0a9(0x7bc)]['helpWindowRect']=function(){const _0x1a6f1f=_0x45f0a9;return Scene_Load['layoutSettings'][_0x1a6f1f(0x1e0)][_0x1a6f1f(0x573)](this);},Scene_Load['prototype']['listWindowRect']=function(){const _0x336841=_0x45f0a9;return Scene_Load[_0x336841(0x18e)][_0x336841(0x695)][_0x336841(0x573)](this);};function Scene_QuickLoad(){const _0x3f0902=_0x45f0a9;this[_0x3f0902(0x73f)](...arguments);}Scene_QuickLoad[_0x45f0a9(0x7bc)]=Object[_0x45f0a9(0x772)](Scene_Load[_0x45f0a9(0x7bc)]),Scene_QuickLoad[_0x45f0a9(0x7bc)][_0x45f0a9(0x1d3)]=Scene_QuickLoad,Scene_QuickLoad[_0x45f0a9(0x7bc)]['initialize']=function(){const _0x4cf945=_0x45f0a9;Scene_Load[_0x4cf945(0x7bc)][_0x4cf945(0x73f)][_0x4cf945(0x573)](this);},Scene_QuickLoad[_0x45f0a9(0x7bc)][_0x45f0a9(0x772)]=function(){const _0x4a4d09=_0x45f0a9;this[_0x4a4d09(0x1a1)](this[_0x4a4d09(0x4ff)]);},Scene_QuickLoad['prototype'][_0x45f0a9(0x2c7)]=function(_0x35044b){const _0x4ed763=_0x45f0a9;this[_0x4ed763(0x4ff)]=_0x35044b;},Scene_QuickLoad['prototype']['start']=function(){const _0xa55d92=_0x45f0a9;Scene_MenuBase['prototype']['start'][_0xa55d92(0x573)](this);},Scene_GameEnd[_0x45f0a9(0x18e)]=VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)]['MenuLayout'][_0x45f0a9(0x3fb)],VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x21c)]=Scene_GameEnd['prototype'][_0x45f0a9(0x521)],Scene_GameEnd['prototype'][_0x45f0a9(0x521)]=function(){const _0xba1bf8=_0x45f0a9;Scene_MenuBase['prototype'][_0xba1bf8(0x521)][_0xba1bf8(0x573)](this);},Scene_GameEnd[_0x45f0a9(0x7bc)][_0x45f0a9(0x8b9)]=function(){const _0x176c3b=_0x45f0a9,_0x51d562=this[_0x176c3b(0x8d6)]();this['_commandWindow']=new Window_GameEnd(_0x51d562),this['_commandWindow'][_0x176c3b(0x28a)]('cancel',this['popScene'][_0x176c3b(0x159)](this)),this['addWindow'](this[_0x176c3b(0x306)]),this[_0x176c3b(0x306)][_0x176c3b(0x3f2)](Scene_GameEnd[_0x176c3b(0x18e)][_0x176c3b(0x1b1)]);},Scene_GameEnd[_0x45f0a9(0x7bc)][_0x45f0a9(0x8d6)]=function(){const _0x1d6335=_0x45f0a9;return Scene_GameEnd[_0x1d6335(0x18e)][_0x1d6335(0x225)]['call'](this);},Scene_Shop[_0x45f0a9(0x18e)]=VisuMZ['CoreEngine']['Settings'][_0x45f0a9(0x568)][_0x45f0a9(0x793)],VisuMZ['CoreEngine'][_0x45f0a9(0x4ca)]=Scene_Shop[_0x45f0a9(0x7bc)]['create'],Scene_Shop['prototype']['create']=function(){const _0x5d0102=_0x45f0a9;VisuMZ['CoreEngine'][_0x5d0102(0x4ca)][_0x5d0102(0x573)](this),this[_0x5d0102(0x1e1)]();},Scene_Shop[_0x45f0a9(0x7bc)]['setCoreEngineUpdateWindowBg']=function(){const _0x52bbb4=_0x45f0a9;this[_0x52bbb4(0x388)]&&this['_helpWindow'][_0x52bbb4(0x3f2)](Scene_Shop[_0x52bbb4(0x18e)][_0x52bbb4(0x883)]),this[_0x52bbb4(0x15a)]&&this['_goldWindow'][_0x52bbb4(0x3f2)](Scene_Shop[_0x52bbb4(0x18e)][_0x52bbb4(0x825)]),this[_0x52bbb4(0x306)]&&this['_commandWindow'][_0x52bbb4(0x3f2)](Scene_Shop['layoutSettings'][_0x52bbb4(0x1b1)]),this[_0x52bbb4(0x8ee)]&&this[_0x52bbb4(0x8ee)][_0x52bbb4(0x3f2)](Scene_Shop['layoutSettings'][_0x52bbb4(0x49d)]),this[_0x52bbb4(0x4cf)]&&this['_numberWindow'][_0x52bbb4(0x3f2)](Scene_Shop['layoutSettings'][_0x52bbb4(0x683)]),this[_0x52bbb4(0x46c)]&&this['_statusWindow'][_0x52bbb4(0x3f2)](Scene_Shop[_0x52bbb4(0x18e)][_0x52bbb4(0x788)]),this[_0x52bbb4(0x72e)]&&this['_buyWindow'][_0x52bbb4(0x3f2)](Scene_Shop['layoutSettings'][_0x52bbb4(0x366)]),this['_categoryWindow']&&this[_0x52bbb4(0x661)]['setBackgroundType'](Scene_Shop[_0x52bbb4(0x18e)][_0x52bbb4(0x6c5)]),this['_sellWindow']&&this[_0x52bbb4(0x2d6)][_0x52bbb4(0x3f2)](Scene_Shop[_0x52bbb4(0x18e)][_0x52bbb4(0x3e7)]);},Scene_Shop['prototype'][_0x45f0a9(0x282)]=function(){const _0x3d6533=_0x45f0a9;return Scene_Shop[_0x3d6533(0x18e)]['HelpRect'][_0x3d6533(0x573)](this);},Scene_Shop[_0x45f0a9(0x7bc)][_0x45f0a9(0x5de)]=function(){const _0x5306c2=_0x45f0a9;return Scene_Shop[_0x5306c2(0x18e)][_0x5306c2(0x3bb)][_0x5306c2(0x573)](this);},Scene_Shop['prototype'][_0x45f0a9(0x8d6)]=function(){const _0x5c1743=_0x45f0a9;return Scene_Shop[_0x5c1743(0x18e)][_0x5c1743(0x225)][_0x5c1743(0x573)](this);},Scene_Shop[_0x45f0a9(0x7bc)][_0x45f0a9(0x56c)]=function(){const _0x3a16bd=_0x45f0a9;return Scene_Shop[_0x3a16bd(0x18e)][_0x3a16bd(0x563)]['call'](this);},Scene_Shop['prototype'][_0x45f0a9(0x41b)]=function(){const _0xc68626=_0x45f0a9;return Scene_Shop['layoutSettings'][_0xc68626(0x44d)]['call'](this);},Scene_Shop[_0x45f0a9(0x7bc)][_0x45f0a9(0x35f)]=function(){return Scene_Shop['layoutSettings']['StatusRect']['call'](this);},Scene_Shop['prototype'][_0x45f0a9(0x1c0)]=function(){const _0xc630d=_0x45f0a9;return Scene_Shop[_0xc630d(0x18e)][_0xc630d(0x6ec)][_0xc630d(0x573)](this);},Scene_Shop[_0x45f0a9(0x7bc)]['categoryWindowRect']=function(){const _0xf10bbb=_0x45f0a9;return Scene_Shop[_0xf10bbb(0x18e)][_0xf10bbb(0x423)][_0xf10bbb(0x573)](this);},Scene_Shop['prototype'][_0x45f0a9(0x22b)]=function(){const _0x39b89b=_0x45f0a9;return Scene_Shop[_0x39b89b(0x18e)][_0x39b89b(0x8e0)][_0x39b89b(0x573)](this);},Scene_Name[_0x45f0a9(0x18e)]=VisuMZ['CoreEngine'][_0x45f0a9(0x5ba)][_0x45f0a9(0x568)][_0x45f0a9(0x5c0)],VisuMZ['CoreEngine'][_0x45f0a9(0x453)]=Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x772)],Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x772)]=function(){const _0x38cf7c=_0x45f0a9;VisuMZ[_0x38cf7c(0x601)][_0x38cf7c(0x453)]['call'](this),this[_0x38cf7c(0x1e1)]();},Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x1e1)]=function(){const _0x4d577c=_0x45f0a9;this[_0x4d577c(0x604)]&&this[_0x4d577c(0x604)]['setBackgroundType'](Scene_Name['layoutSettings']['EditBgType']),this['_inputWindow']&&this[_0x4d577c(0x8ce)][_0x4d577c(0x3f2)](Scene_Name[_0x4d577c(0x18e)]['InputBgType']);},Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x370)]=function(){return 0x0;},Scene_Name['prototype']['editWindowRect']=function(){const _0x9cc69a=_0x45f0a9;return Scene_Name['layoutSettings'][_0x9cc69a(0x1ac)][_0x9cc69a(0x573)](this);},Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x472)]=function(){const _0x5d7dea=_0x45f0a9;return Scene_Name[_0x5d7dea(0x18e)][_0x5d7dea(0x428)][_0x5d7dea(0x573)](this);},Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x143)]=function(){const _0x1a8461=_0x45f0a9;if(!this[_0x1a8461(0x8ce)])return![];return VisuMZ[_0x1a8461(0x601)]['Settings'][_0x1a8461(0x395)][_0x1a8461(0x143)];},Scene_Name[_0x45f0a9(0x7bc)]['buttonAssistKey1']=function(){const _0x1351ba=_0x45f0a9;if(this[_0x1351ba(0x143)]()&&this[_0x1351ba(0x8ce)]['_mode']!==_0x1351ba(0x5fc))return TextManager[_0x1351ba(0x8ab)](_0x1351ba(0x234),'pagedown');return Scene_MenuBase[_0x1351ba(0x7bc)][_0x1351ba(0x361)]['call'](this);},Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x561)]=function(){const _0x496106=_0x45f0a9;return this[_0x496106(0x143)]()?TextManager[_0x496106(0x360)](_0x496106(0x80c)):Scene_MenuBase[_0x496106(0x7bc)][_0x496106(0x561)][_0x496106(0x573)](this);},Scene_Name['prototype']['buttonAssistKey4']=function(){const _0x1be41c=_0x45f0a9;if(this['EnableNameInput']()&&this[_0x1be41c(0x8ce)][_0x1be41c(0x8e3)]==='keyboard')return TextManager[_0x1be41c(0x2c2)](['ENTER']);return Scene_MenuBase[_0x1be41c(0x7bc)][_0x1be41c(0x535)][_0x1be41c(0x573)](this);},Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x1f3)]=function(){const _0x1285f6=_0x45f0a9;if(this[_0x1285f6(0x143)]()&&this[_0x1285f6(0x8ce)]['_mode']===_0x1285f6(0x5fc))return TextManager[_0x1285f6(0x2c2)]([_0x1285f6(0x3e8)]);return Scene_MenuBase[_0x1285f6(0x7bc)][_0x1285f6(0x1f3)][_0x1285f6(0x573)](this);},Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x766)]=function(){const _0x32c88d=_0x45f0a9;if(this[_0x32c88d(0x143)]()&&this[_0x32c88d(0x8ce)][_0x32c88d(0x8e3)]!=='keyboard'){const _0x2afded=VisuMZ[_0x32c88d(0x601)][_0x32c88d(0x5ba)][_0x32c88d(0x395)];return _0x2afded[_0x32c88d(0x3f3)]||'Page';}return Scene_MenuBase[_0x32c88d(0x7bc)]['buttonAssistText1'][_0x32c88d(0x573)](this);},Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x1f1)]=function(){const _0x5a45c9=_0x45f0a9;if(this[_0x5a45c9(0x143)]()){const _0xed1b0b=VisuMZ[_0x5a45c9(0x601)][_0x5a45c9(0x5ba)][_0x5a45c9(0x395)];return this['_inputWindow'][_0x5a45c9(0x8e3)]===_0x5a45c9(0x5fc)?_0xed1b0b['Keyboard']||'Keyboard':_0xed1b0b[_0x5a45c9(0x5bb)]||_0x5a45c9(0x5bb);}else return Scene_MenuBase[_0x5a45c9(0x7bc)][_0x5a45c9(0x1f1)][_0x5a45c9(0x573)](this);},Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x7ae)]=function(){const _0x33a1fd=_0x45f0a9;if(this[_0x33a1fd(0x143)]()){const _0x5c5d45=VisuMZ[_0x33a1fd(0x601)][_0x33a1fd(0x5ba)]['KeyboardInput'];if(this[_0x33a1fd(0x8ce)][_0x33a1fd(0x8e3)]===_0x33a1fd(0x5fc))return _0x5c5d45[_0x33a1fd(0x32f)]||_0x33a1fd(0x32f);}return Scene_MenuBase[_0x33a1fd(0x7bc)]['buttonAssistText4'][_0x33a1fd(0x573)](this);},VisuMZ['CoreEngine'][_0x45f0a9(0x888)]=Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x747)],Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x747)]=function(){const _0x2b12e3=_0x45f0a9;this[_0x2b12e3(0x304)]()?this[_0x2b12e3(0x4bd)]():VisuMZ[_0x2b12e3(0x601)][_0x2b12e3(0x888)][_0x2b12e3(0x573)](this);},Scene_Name[_0x45f0a9(0x7bc)]['doesNameContainBannedWords']=function(){const _0x3cf6d4=_0x45f0a9,_0x524adc=VisuMZ[_0x3cf6d4(0x601)][_0x3cf6d4(0x5ba)][_0x3cf6d4(0x395)];if(!_0x524adc)return![];const _0x49d3ee=_0x524adc[_0x3cf6d4(0x673)];if(!_0x49d3ee)return![];const _0x518ec0=this['_editWindow']['name']()[_0x3cf6d4(0x709)]();for(const _0x2f5ffc of _0x49d3ee){if(_0x518ec0['includes'](_0x2f5ffc['toLowerCase']()))return!![];}return![];},Scene_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x4bd)]=function(){const _0x53e2bc=_0x45f0a9;SoundManager[_0x53e2bc(0x823)]();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x6a6)]=Scene_Battle[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)],Scene_Battle['prototype'][_0x45f0a9(0x314)]=function(){const _0x1b5dbf=_0x45f0a9;VisuMZ[_0x1b5dbf(0x601)]['Scene_Battle_update'][_0x1b5dbf(0x573)](this);if($gameTemp[_0x1b5dbf(0x21d)])this[_0x1b5dbf(0x436)]();},Scene_Battle[_0x45f0a9(0x7bc)]['updatePlayTestF7']=function(){const _0x2ed654=_0x45f0a9;!BattleManager['isInputting']()&&!this[_0x2ed654(0x4e3)]&&!$gameMessage[_0x2ed654(0x349)]()&&(this[_0x2ed654(0x4e3)]=!![],this[_0x2ed654(0x314)](),SceneManager[_0x2ed654(0x2cd)](),this[_0x2ed654(0x4e3)]=![]);},VisuMZ[_0x45f0a9(0x601)]['Scene_Battle_createCancelButton']=Scene_Battle[_0x45f0a9(0x7bc)][_0x45f0a9(0x3dc)],Scene_Battle[_0x45f0a9(0x7bc)]['createCancelButton']=function(){const _0x244141=_0x45f0a9;VisuMZ[_0x244141(0x601)][_0x244141(0x271)]['call'](this),SceneManager[_0x244141(0x5f1)]()&&this[_0x244141(0x3f9)]();},Scene_Battle[_0x45f0a9(0x7bc)][_0x45f0a9(0x3f9)]=function(){const _0x3f95f1=_0x45f0a9;this[_0x3f95f1(0x738)]['x']=Graphics[_0x3f95f1(0x2a2)]+0x4,this[_0x3f95f1(0x3e9)]()?this[_0x3f95f1(0x738)]['y']=Graphics['boxHeight']-this['buttonAreaHeight']():this[_0x3f95f1(0x738)]['y']=0x0;},VisuMZ['CoreEngine']['Sprite_Button_initialize']=Sprite_Button[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)],Sprite_Button[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)]=function(_0x39c086){const _0x49707d=_0x45f0a9;VisuMZ[_0x49707d(0x601)][_0x49707d(0x132)]['call'](this,_0x39c086),this['initButtonHidden']();},Sprite_Button[_0x45f0a9(0x7bc)][_0x45f0a9(0x620)]=function(){const _0x410159=_0x45f0a9,_0x80439d=VisuMZ[_0x410159(0x601)][_0x410159(0x5ba)]['UI'];this[_0x410159(0x64a)]=![];switch(this['_buttonType']){case _0x410159(0x844):this[_0x410159(0x64a)]=!_0x80439d[_0x410159(0x757)];break;case _0x410159(0x234):case _0x410159(0x8ef):this[_0x410159(0x64a)]=!_0x80439d[_0x410159(0x1b8)];break;case _0x410159(0x6de):case'up':case _0x410159(0x297):case _0x410159(0x191):case'ok':this[_0x410159(0x64a)]=!_0x80439d['numberShowButton'];break;case _0x410159(0x442):this[_0x410159(0x64a)]=!_0x80439d[_0x410159(0x510)];break;}},VisuMZ['CoreEngine'][_0x45f0a9(0x6ed)]=Sprite_Button[_0x45f0a9(0x7bc)][_0x45f0a9(0x12e)],Sprite_Button[_0x45f0a9(0x7bc)]['updateOpacity']=function(){const _0x3873a5=_0x45f0a9;SceneManager[_0x3873a5(0x60d)]()||this['_isButtonHidden']?this[_0x3873a5(0x7f5)]():VisuMZ[_0x3873a5(0x601)][_0x3873a5(0x6ed)][_0x3873a5(0x573)](this);},Sprite_Button[_0x45f0a9(0x7bc)][_0x45f0a9(0x7f5)]=function(){const _0x261538=_0x45f0a9;this[_0x261538(0x470)]=![],this[_0x261538(0x694)]=0x0,this['x']=Graphics[_0x261538(0x4bc)]*0xa,this['y']=Graphics[_0x261538(0x2a5)]*0xa;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x390)]=Sprite_Battler[_0x45f0a9(0x7bc)][_0x45f0a9(0x24c)],Sprite_Battler[_0x45f0a9(0x7bc)][_0x45f0a9(0x24c)]=function(_0x327204,_0xbfa730,_0x1987cd){const _0x1f7304=_0x45f0a9;(this[_0x1f7304(0x422)]!==_0x327204||this[_0x1f7304(0x4b8)]!==_0xbfa730)&&(this[_0x1f7304(0x8c8)](_0x1f7304(0x7e6)),this['_movementWholeDuration']=_0x1987cd),VisuMZ[_0x1f7304(0x601)][_0x1f7304(0x390)]['call'](this,_0x327204,_0xbfa730,_0x1987cd);},Sprite_Battler['prototype'][_0x45f0a9(0x8c8)]=function(_0x1ad08f){const _0xa9f929=_0x45f0a9;this[_0xa9f929(0x51e)]=_0x1ad08f;},Sprite_Battler[_0x45f0a9(0x7bc)][_0x45f0a9(0x3e4)]=function(){const _0x1b2530=_0x45f0a9;if(this[_0x1b2530(0x7dc)]<=0x0)return;const _0x286844=this[_0x1b2530(0x7dc)],_0x2ec868=this[_0x1b2530(0x5ac)],_0xa732bf=this[_0x1b2530(0x51e)];this[_0x1b2530(0x62b)]=this[_0x1b2530(0x407)](this[_0x1b2530(0x62b)],this[_0x1b2530(0x422)],_0x286844,_0x2ec868,_0xa732bf),this['_offsetY']=this[_0x1b2530(0x407)](this['_offsetY'],this[_0x1b2530(0x4b8)],_0x286844,_0x2ec868,_0xa732bf),this[_0x1b2530(0x7dc)]--;if(this[_0x1b2530(0x7dc)]<=0x0)this[_0x1b2530(0x57e)]();},Sprite_Battler[_0x45f0a9(0x7bc)][_0x45f0a9(0x407)]=function(_0x16fcde,_0x22a3a3,_0x24b75c,_0x2b5f9d,_0x29506b){const _0x582a8b=_0x45f0a9,_0x388427=VisuMZ[_0x582a8b(0x266)]((_0x2b5f9d-_0x24b75c)/_0x2b5f9d,_0x29506b||_0x582a8b(0x7e6)),_0x27e65b=VisuMZ[_0x582a8b(0x266)]((_0x2b5f9d-_0x24b75c+0x1)/_0x2b5f9d,_0x29506b||'Linear'),_0x112a96=(_0x16fcde-_0x22a3a3*_0x388427)/(0x1-_0x388427);return _0x112a96+(_0x22a3a3-_0x112a96)*_0x27e65b;},VisuMZ[_0x45f0a9(0x601)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x56a)],Sprite_Actor['prototype'][_0x45f0a9(0x56a)]=function(_0x4e8fbc){const _0xf07007=_0x45f0a9;VisuMZ[_0xf07007(0x601)][_0xf07007(0x5ba)]['UI']['RepositionActors']?this[_0xf07007(0x7a9)](_0x4e8fbc):VisuMZ[_0xf07007(0x601)][_0xf07007(0x868)][_0xf07007(0x573)](this,_0x4e8fbc);},Sprite_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x7a9)]=function(_0x333bc8){const _0x126885=_0x45f0a9;let _0x3aa1cb=Math['round'](Graphics[_0x126885(0x4bc)]/0x2+0xc0);_0x3aa1cb-=Math[_0x126885(0x5ae)]((Graphics[_0x126885(0x4bc)]-Graphics[_0x126885(0x2a2)])/0x2),_0x3aa1cb+=_0x333bc8*0x20;let _0x39cfc1=Graphics['height']-0xc8-$gameParty[_0x126885(0x39f)]()*0x30;_0x39cfc1-=Math[_0x126885(0x5ae)]((Graphics['height']-Graphics[_0x126885(0x7f2)])/0x2),_0x39cfc1+=_0x333bc8*0x30,this[_0x126885(0x375)](_0x3aa1cb,_0x39cfc1);},Sprite_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x6c1)]=function(){const _0x3d944c=_0x45f0a9;this[_0x3d944c(0x24c)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x45f0a9(0x2ba)]=function(_0x1aa9f4){const _0x284b84=_0x45f0a9;this[_0x284b84(0x8fe)]=_0x1aa9f4;},VisuMZ[_0x45f0a9(0x601)]['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x45f0a9(0x7bc)][_0x45f0a9(0x500)],Sprite_Animation[_0x45f0a9(0x7bc)]['processSoundTimings']=function(){const _0x4d920d=_0x45f0a9;if(this['_muteSound'])return;VisuMZ[_0x4d920d(0x601)][_0x4d920d(0x73d)]['call'](this);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x7e9)]=Sprite_Animation['prototype'][_0x45f0a9(0x4cd)],Sprite_Animation['prototype'][_0x45f0a9(0x4cd)]=function(_0xbbcaf8){const _0x783bc0=_0x45f0a9;this['isAnimationOffsetXMirrored']()?this['setViewportCoreEngineFix'](_0xbbcaf8):VisuMZ[_0x783bc0(0x601)][_0x783bc0(0x7e9)]['call'](this,_0xbbcaf8);},Sprite_Animation[_0x45f0a9(0x7bc)]['isAnimationOffsetXMirrored']=function(){const _0x5f2167=_0x45f0a9;if(!this[_0x5f2167(0x3be)])return![];const _0x16b110=this[_0x5f2167(0x3be)][_0x5f2167(0x3d0)]||'';if(_0x16b110['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x16b110[_0x5f2167(0x2ee)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x5f2167(0x601)][_0x5f2167(0x5ba)][_0x5f2167(0x8f1)][_0x5f2167(0x190)];},Sprite_Animation['prototype']['setViewportCoreEngineFix']=function(_0x367c43){const _0x58e812=_0x45f0a9,_0x4a7d85=this['_viewportSize'],_0x10ef81=this[_0x58e812(0x30a)],_0x8c3b0b=this[_0x58e812(0x3be)][_0x58e812(0x5a1)]*(this['_mirror']?-0x1:0x1)-_0x4a7d85/0x2,_0x324a14=this[_0x58e812(0x3be)]['offsetY']-_0x10ef81/0x2,_0x2c6d65=this['targetPosition'](_0x367c43);_0x367c43['gl'][_0x58e812(0x41a)](_0x8c3b0b+_0x2c6d65['x'],_0x324a14+_0x2c6d65['y'],_0x4a7d85,_0x10ef81);},Sprite_Animation['prototype']['targetSpritePosition']=function(_0x52d412){const _0x31d3e5=_0x45f0a9;if(_0x52d412[_0x31d3e5(0x4e8)]){}const _0x3a1cee=this[_0x31d3e5(0x3be)]['name'];let _0x112465=_0x52d412[_0x31d3e5(0x2a5)]*_0x52d412['scale']['y'],_0x3614aa=0x0,_0x4306a1=-_0x112465/0x2;if(_0x3a1cee[_0x31d3e5(0x2ee)](/<(?:HEAD|HEADER|TOP)>/i))_0x4306a1=-_0x112465;if(_0x3a1cee[_0x31d3e5(0x2ee)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x4306a1=0x0;if(this[_0x31d3e5(0x3be)][_0x31d3e5(0x541)])_0x4306a1=0x0;if(_0x3a1cee[_0x31d3e5(0x2ee)](/<(?:LEFT)>/i))_0x3614aa=-_0x52d412[_0x31d3e5(0x4bc)]/0x2;if(_0x3a1cee[_0x31d3e5(0x2ee)](/<(?:RIGHT)>/i))_0x3614aa=_0x52d412[_0x31d3e5(0x4bc)]/0x2;_0x3a1cee[_0x31d3e5(0x2ee)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x3614aa=Number(RegExp['$1'])*_0x52d412[_0x31d3e5(0x4bc)]);_0x3a1cee[_0x31d3e5(0x2ee)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x4306a1=(0x1-Number(RegExp['$1']))*-_0x112465);_0x3a1cee[_0x31d3e5(0x2ee)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x3614aa=Number(RegExp['$1'])*_0x52d412['width'],_0x4306a1=(0x1-Number(RegExp['$2']))*-_0x112465);if(_0x3a1cee[_0x31d3e5(0x2ee)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x3614aa+=Number(RegExp['$1']);if(_0x3a1cee[_0x31d3e5(0x2ee)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x4306a1+=Number(RegExp['$1']);_0x3a1cee[_0x31d3e5(0x2ee)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x3614aa+=Number(RegExp['$1']),_0x4306a1+=Number(RegExp['$2']));const _0x22d368=new Point(_0x3614aa,_0x4306a1);return _0x52d412[_0x31d3e5(0x85f)](),_0x52d412['worldTransform'][_0x31d3e5(0x3ab)](_0x22d368);},Sprite_AnimationMV[_0x45f0a9(0x7bc)][_0x45f0a9(0x71e)]=function(){const _0x16475a=_0x45f0a9;this[_0x16475a(0x630)]=VisuMZ['CoreEngine'][_0x16475a(0x5ba)][_0x16475a(0x8f1)]['MvAnimationRate']??0x4,this['setupCustomRateCoreEngine'](),this['_rate']=this[_0x16475a(0x630)][_0x16475a(0x5b1)](0x1,0xa);},Sprite_AnimationMV[_0x45f0a9(0x7bc)]['setupCustomRateCoreEngine']=function(){const _0x4a195b=_0x45f0a9;if(!this[_0x4a195b(0x3be)]);const _0x29400f=this[_0x4a195b(0x3be)][_0x4a195b(0x3d0)]||'';_0x29400f[_0x4a195b(0x2ee)](/<RATE:[ ](\d+)>/i)&&(this[_0x4a195b(0x630)]=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV['prototype']['setMute']=function(_0x7af671){const _0x486f77=_0x45f0a9;this[_0x486f77(0x8fe)]=_0x7af671;},VisuMZ['CoreEngine'][_0x45f0a9(0x74c)]=Sprite_AnimationMV[_0x45f0a9(0x7bc)]['processTimingData'],Sprite_AnimationMV[_0x45f0a9(0x7bc)][_0x45f0a9(0x3b3)]=function(_0x4e9fb9){const _0x1cf20b=_0x45f0a9;this[_0x1cf20b(0x8fe)]&&(_0x4e9fb9=JsonEx[_0x1cf20b(0x3c2)](_0x4e9fb9),_0x4e9fb9['se']&&(_0x4e9fb9['se'][_0x1cf20b(0x804)]=0x0)),VisuMZ[_0x1cf20b(0x601)][_0x1cf20b(0x74c)][_0x1cf20b(0x573)](this,_0x4e9fb9);},VisuMZ['CoreEngine'][_0x45f0a9(0x418)]=Sprite_AnimationMV[_0x45f0a9(0x7bc)][_0x45f0a9(0x1bb)],Sprite_AnimationMV[_0x45f0a9(0x7bc)][_0x45f0a9(0x1bb)]=function(){const _0x43c332=_0x45f0a9;VisuMZ['CoreEngine'][_0x43c332(0x418)][_0x43c332(0x573)](this);if(this['_animation'][_0x43c332(0x1aa)]===0x3){if(this['x']===0x0)this['x']=Math[_0x43c332(0x640)](Graphics[_0x43c332(0x4bc)]/0x2);if(this['y']===0x0)this['y']=Math[_0x43c332(0x640)](Graphics[_0x43c332(0x2a5)]/0x2);}},Sprite_Damage[_0x45f0a9(0x7bc)][_0x45f0a9(0x73a)]=function(_0x59b43e){const _0x1ea2b1=_0x45f0a9;let _0x24ac0a=Math[_0x1ea2b1(0x8c7)](_0x59b43e)['toString']();this[_0x1ea2b1(0x5cd)]()&&(_0x24ac0a=VisuMZ[_0x1ea2b1(0x294)](_0x24ac0a));const _0x377cd8=this['fontSize'](),_0x33145d=Math[_0x1ea2b1(0x5ae)](_0x377cd8*0.75);for(let _0x573b75=0x0;_0x573b75<_0x24ac0a[_0x1ea2b1(0x2ad)];_0x573b75++){const _0x3f3ab2=this[_0x1ea2b1(0x37f)](_0x33145d,_0x377cd8);_0x3f3ab2[_0x1ea2b1(0x6e7)][_0x1ea2b1(0x631)](_0x24ac0a[_0x573b75],0x0,0x0,_0x33145d,_0x377cd8,_0x1ea2b1(0x76a)),_0x3f3ab2['x']=(_0x573b75-(_0x24ac0a[_0x1ea2b1(0x2ad)]-0x1)/0x2)*_0x33145d,_0x3f3ab2['dy']=-_0x573b75;}},Sprite_Damage[_0x45f0a9(0x7bc)][_0x45f0a9(0x5cd)]=function(){const _0x18acea=_0x45f0a9;return VisuMZ[_0x18acea(0x601)][_0x18acea(0x5ba)][_0x18acea(0x8f1)]['DigitGroupingDamageSprites'];},Sprite_Damage[_0x45f0a9(0x7bc)][_0x45f0a9(0x389)]=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x805)]=Sprite_Gauge[_0x45f0a9(0x7bc)][_0x45f0a9(0x7c4)],Sprite_Gauge[_0x45f0a9(0x7bc)][_0x45f0a9(0x7c4)]=function(){const _0x26ab9d=_0x45f0a9;return VisuMZ[_0x26ab9d(0x601)]['Sprite_Gauge_gaugeRate'][_0x26ab9d(0x573)](this)[_0x26ab9d(0x5b1)](0x0,0x1);},VisuMZ['CoreEngine'][_0x45f0a9(0x2a7)]=Sprite_Gauge[_0x45f0a9(0x7bc)][_0x45f0a9(0x67d)],Sprite_Gauge[_0x45f0a9(0x7bc)][_0x45f0a9(0x67d)]=function(){const _0x3bb2b9=_0x45f0a9;let _0x2b0bba=VisuMZ[_0x3bb2b9(0x601)]['Sprite_Gauge_currentValue'][_0x3bb2b9(0x573)](this);return _0x2b0bba;},Sprite_Gauge['prototype'][_0x45f0a9(0x5e8)]=function(){const _0xc25a29=_0x45f0a9;let _0x3d9ff1=this[_0xc25a29(0x67d)]();this[_0xc25a29(0x5cd)]()&&(_0x3d9ff1=VisuMZ[_0xc25a29(0x294)](_0x3d9ff1));const _0x112976=this['bitmapWidth']()-0x1,_0x22b03e=this[_0xc25a29(0x471)]?this[_0xc25a29(0x471)]():this[_0xc25a29(0x160)]();this[_0xc25a29(0x29f)](),this['bitmap'][_0xc25a29(0x631)](_0x3d9ff1,0x0,0x0,_0x112976,_0x22b03e,'right');},Sprite_Gauge['prototype']['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x45f0a9(0x7bc)][_0x45f0a9(0x5cd)]=function(){const _0x2a4b06=_0x45f0a9;return VisuMZ[_0x2a4b06(0x601)]['Settings']['QoL'][_0x2a4b06(0x4f7)];},Sprite_Gauge[_0x45f0a9(0x7bc)][_0x45f0a9(0x389)]=function(){const _0x5119d2=_0x45f0a9;return ColorManager[_0x5119d2(0x358)]();},Sprite_StateIcon[_0x45f0a9(0x8a7)]=VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)]['UI']['StateIconsNonFrame']??!![],VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x798)]=Sprite_StateIcon[_0x45f0a9(0x7bc)]['loadBitmap'],Sprite_StateIcon['prototype']['loadBitmap']=function(){const _0x4badb1=_0x45f0a9;Sprite_StateIcon[_0x4badb1(0x8a7)]?this[_0x4badb1(0x729)]():VisuMZ[_0x4badb1(0x601)][_0x4badb1(0x798)]['call'](this);},Sprite_StateIcon['prototype'][_0x45f0a9(0x729)]=function(){const _0x29fb03=_0x45f0a9;this[_0x29fb03(0x6e7)]=new Bitmap(ImageManager[_0x29fb03(0x6e8)],ImageManager['iconHeight']),this[_0x29fb03(0x4fe)]=ImageManager[_0x29fb03(0x42d)](_0x29fb03(0x692));},VisuMZ[_0x45f0a9(0x601)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x45f0a9(0x7bc)]['updateFrame'],Sprite_StateIcon[_0x45f0a9(0x7bc)]['updateFrame']=function(){const _0x31fb47=_0x45f0a9;Sprite_StateIcon['NON_FRAME']?this[_0x31fb47(0x2e1)]():VisuMZ['CoreEngine'][_0x31fb47(0x645)][_0x31fb47(0x573)](this);},Sprite_StateIcon[_0x45f0a9(0x7bc)][_0x45f0a9(0x2e1)]=function(){const _0x53d434=_0x45f0a9;if(this[_0x53d434(0x176)]===this[_0x53d434(0x5d1)])return;this[_0x53d434(0x176)]=this['_iconIndex'];const _0x1d8541=ImageManager[_0x53d434(0x6e8)],_0x4df6bc=ImageManager['iconHeight'],_0x87455d=this[_0x53d434(0x5d1)]%0x10*_0x1d8541,_0x598ee5=Math['floor'](this[_0x53d434(0x5d1)]/0x10)*_0x4df6bc,_0x2229be=this['_srcBitmap'],_0x433664=this[_0x53d434(0x6e7)];_0x433664[_0x53d434(0x1d9)](),_0x433664[_0x53d434(0x86c)](_0x2229be,_0x87455d,_0x598ee5,_0x1d8541,_0x4df6bc,0x0,0x0,_0x433664['width'],_0x433664[_0x53d434(0x2a5)]);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x1fe)]=Sprite_Picture['prototype'][_0x45f0a9(0x2d8)],Sprite_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x2d8)]=function(){const _0x33a4bf=_0x45f0a9;this['_pictureName']&&this[_0x33a4bf(0x478)][_0x33a4bf(0x2ee)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x33a4bf(0x66a)](Number(RegExp['$1'])):VisuMZ[_0x33a4bf(0x601)][_0x33a4bf(0x1fe)][_0x33a4bf(0x573)](this);},Sprite_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x66a)]=function(_0x59eaa5){const _0x1f6bd6=_0x45f0a9,_0x54679c=ImageManager[_0x1f6bd6(0x6e8)],_0x12cff4=ImageManager[_0x1f6bd6(0x746)],_0x22ba3c=this[_0x1f6bd6(0x478)][_0x1f6bd6(0x2ee)](/SMOOTH/i);this[_0x1f6bd6(0x6e7)]=new Bitmap(_0x54679c,_0x12cff4);const _0x384272=ImageManager[_0x1f6bd6(0x42d)]('IconSet'),_0x4fef1b=_0x59eaa5%0x10*_0x54679c,_0x831f19=Math[_0x1f6bd6(0x5ae)](_0x59eaa5/0x10)*_0x12cff4;this[_0x1f6bd6(0x6e7)][_0x1f6bd6(0x26a)]=_0x22ba3c,this[_0x1f6bd6(0x6e7)][_0x1f6bd6(0x86c)](_0x384272,_0x4fef1b,_0x831f19,_0x54679c,_0x12cff4,0x0,0x0,_0x54679c,_0x12cff4);};function _0x547f(){const _0x27da62=['keyCode','_forcedTroopView','Bitmap_resize','_movementDuration','deselect','buttonAssistOffset4','font-smooth','tpGaugeColor1','ShortcutScripts','Tilemap_addShadow','STENCIL_TEST','onBattleStart','Subtitle','Linear','_image','Name','Sprite_Animation_setViewport','MRG','DisplayLockX','NUMPAD9','drawBackground','measureTextWidth','isTriggered','LevelUpFullMp','Game_Picture_calcEasing','boxHeight','_tileExtendTerrainTags','Game_Picture_scaleY','hideButtonFromView','buttonAssistOffset2','_stored_tpCostColor','helpAreaTopSideButtonLayout','Game_Map_scrollUp','isNextScene','tpCostColor','Item-%1-%2','paramRate','setMainFontSize','RightMenus','AutoScrollLockY','VOLUME_UP','drawActorNickname','SParamVocab7','volume','Sprite_Gauge_gaugeRate','WIN_OEM_ATTN','_animationQueue','NUMPAD5','playTestF6','_refreshBack','_originalViewport','tab','StatusRect','initCoreEngineScreenShake','helpAreaBottom','eva','scrollDown','writeFile','GoldIcon','onKeyDown','Game_Picture_angle','onEscapeSuccess','scaleY','Armor-%1-%2','deathColor','zoomScale','ColorPowerUp','defineProperty','〘Show\x20Text〙\x0a','TRG','paramFlat','isArrowPressed','IDs','overallHeight','playBuzzer','isKeyItem','GoldBgType','_context','_upArrowSprite','_actor','render','〘Common\x20Event\x20%1:\x20%2〙\x20End','fillStyle','sin','hpColor','_mapY','ESC','DefaultMode','_mapX','_makeFontNameText','Game_Unit_onBattleEnd','initVisuMZCoreEngine','Game_Map_scrollLeft','VisuMZ_2_BattleSystemBTB','gaugeLineHeight','Power','_coreEasingType','CNT','checkPlayerLocation','reservePlayTestNewGameCommonEvent','Game_Actor_isPreserveTp','SideView','changeClass','isOpenAndActive','learnings','Map%1','_onKeyDown','cancel','isEnemy','requiredWtypeId1','_pictureContainer','Game_Interpreter_command105','systemColor','CustomParamIcons','_phase','Skill-%1-%2','HASH','loading','_CoreEngineSettings','Game_Picture_updateMove','_refreshArrows','IconSParam6','0.00','xparamPlusJS','showDevTools','isRightInputMode','isSpecialCode','Game_BattlerBase_refresh','CommandWidth','drawSegment','BarOffset','consumable','MenuBg','ARRAYFUNC','updateTransform','maxScrollbar','uiAreaWidth','createPointAnimationTargets','sparam','_stored_gaugeBackColor','buttonAssistWindowRect','Scene_Boot_loadSystemImages','buttonAreaHeight','Sprite_Actor_setActorHome','Max','setAnchor','_troopId','blt','BACK_QUOTE','switchModes','autoRemovalTiming','Location','refreshSpritesetForExtendedTiles','isMVAnimation','charCode','_buttonAssistWindow','TimeProgress','encounterStep','SwitchRandomizeOne','\x5c}❪TAB❫\x5c{','Flat','getBattleSystem','ImgLoad','filter','mainAreaHeightSideButtonLayout','FunctionName','_hideButtons','mpCostColor','pages','Origin','HelpBgType','skillTypes','resetTextColor','outlineColor','_commonEventLayers','Scene_Name_onInputOk','asin','drawing','_paramPlus','trim','isInstanceOfSceneMap','isPlaytest','updateAnchor','keys','image-rendering','_logWindow','_shakeSpeed','bgsVolume','SwitchActorText','text%1','EREOF','HYPHEN_MINUS','saveViewport','loadTitle1','Scene_MenuBase_createPageButtons','usableSkills','Padding','Window_NameInput_cursorPagedown','isLoopVertical','tileset','updateCurrentEvent','ALWAYS','prepareNextScene','Icon','SnapshotOpacity','ColorTPGauge2','NON_FRAME','RIGHT','categoryWindowRect','ColorCTGauge1','getInputMultiButtonStrings','SideButtons','SplitEscape','_colorCache','\x0a\x0a\x0a\x0a\x0a','xdg-open','Flat2','drawActorSimpleStatus','requestMotion','XParamVocab1','anglePlus','createTilemap','updateLastTarget','CTB','createCommandWindow','getGamepads','data/','Game_Map_setDisplayPos','updateOrigin','ColorMPGauge1','setBattleSystem','ColSpacing','SystemLoadImages','drawActorExpGauge','Window_NameInput_cursorPageup','8PjIwYW','itemBackColor1','TextManager_param','abs','setMoveEasingType','standardIconHeight','_patternHeight','updateDocumentTitle','ColorHPGauge2','tilesetFlags','_inputWindow','MAXHP','BTestWeapons','_pictureCoordinatesWindow','destroyScrollBarBitmaps','Input_updateGamepadState','_optionsWindow','PreserveNumbers','commandWindowRect','Scene_Load','ColorManager_loadWindowskin','centerY','UpdatePictureCoordinates','save','translucentOpacity','playCancel','VOLUME_DOWN','targetEvaRate','SellRect','parallaxes','AntiZoomPictures','_mode','xparamRate1','application/json','INELASTIC','createTitleButtons','scrollRight','onNameOk','CustomParamType','Input_shouldPreventDefault','_commandList','maxLevel','_dummyWindow','pagedown','_displayY','QoL','integer','processKeyboardHandling','ImprovedAccuracySystem','VisuMZ_2_BattleSystemSTB','WIN_ICO_HELP','Scene_Battle_createSpriteset_detach','Basic','drawGameVersion','setLastGamepadUsed','Game_Picture_initRotation','_windowLayer','isSceneMap','_muteSound','Game_Party_consumeItem','Bitmap_drawText','DrawItemBackgroundJS','left','KeyItemProtect','isEventTest','Game_BattlerBase_initMembers','checkCacheKey','ColorMPCost','EnableMasking','Game_Interpreter_command355','isItemStyle','itemSuccessRate','vertical','HANJA','value','Duration','_storedStack','ActorMPColor','toFixed','Scene_Map_update','cursorPageup','yScrollLinkedOffset','INSINE','Scene_TitleTransition','ItemHeight','centerX','_number','framesMax','sparamRateJS','_skillTypeWindow','updateOpacity','_refreshPauseSign','skillTypeWindowRect','optionsWindowRect','Sprite_Button_initialize','buttonAssistOffset5','code','_index','innerWidth','1.4.4','xparam','reserveCommonEvent','MaxDuration','ControllerMatches','Map%1.json','allowShiftScrolling','WIN_OEM_COPY','battlebacks2','playMiss','isPlaying','WIN_OEM_AUTO','EnableNameInput','_drawTextBody','Window_SkillList_includes','blockWidth','index','quit','OPEN_BRACKET','_data','_targets','picture','ParseStateNotetags','_stored_mpGaugeColor1','isPreserveTp','ColorMaxLvGauge2','Scene_Map_createSpriteset_detach','F22','F12','Scene_Status_create','PHA','F24','_registerKeyInput','ShiftT_Toggle','bind','_goldWindow','createScrollBarSprites','mapId','checkScrollBarBitmap','VisuMZ_2_BattleSystemCTB','makeActionList','bitmapHeight','END','_pollGamepads','isLoopHorizontal','STB','loadTileset','expGaugeColor2','_lastY','_lastOrigin','URL','_realScale','parameters','isPressed','setTileFrame','BattleSystem','win32','CheckSplitEscape','loadMapData','keyRepeatWait','itemHeight','EndingID','FTB','_lastIconIndex','_digitGroupingEx','_smooth','BlurFilter','ExportAllMapText','Total','DurationPerChat','process_VisuMZ_CoreEngine_ControllerButtons','drawTextEx','IconSParam3','INCIRC','horzJS','_stored_normalColor','consumeItem','top','processMoveCommand','TextStr','Gold','getPointAnimationLayer','command357','stencilOp','XParamVocab9','stop','_coreEasing','layoutSettings','NUMPAD0','AnimationMirrorOffset','up2','lastAnimationSprite','CommandList','PTB','_maxDigits','PictureID','setup','sparamFlat2','ParseWeaponNotetags','applyEasingAnglePlus','Scene_MenuBase_mainAreaTop','XParamVocab5','BarThickness','paramRate2','drawCharacter','ctrlKey','executeLoad','characters','OUTSINE','_stored_hpGaugeColor2','Window_Base_drawCharacter','_anchor','param','isWindowMaskingEnabled','INBOUNCE','position','_shakeDuration','EditRect','drawNewParam','DTB','<%1\x20%2:[\x20]','Window_Selectable_cursorUp','CommandBgType','addOnceParallelInterpreter','INOUTELASTIC','map','Window_Base_destroyContents','ShiftR_Toggle','Window_NameInput_cursorLeft','pagedownShowButton','measureTextWidthNoRounding','MEV','updatePosition','EVA','background','TPB\x20ACTIVE','onload','buyWindowRect','XParamVocab7','IconSParam5','LevelUpFullHp','createFauxAnimationQueue','Window_Base_initialize','StatusParamsBgType','buttonAssistWindowSideRect','maxScrollX','SceneManager_onKeyDown','Scene_Equip_create','currentExp','updateScrollBarVisibility','baseId','BTestArmors','_fauxAnimationQueue','setValue','Game_Map_scrollDown','processCursorMove','constructor','mpGaugeColor2','drawTextTopAligned','updateScrollBars','filterArea','Game_Unit_onBattleStart','clear','processKeyboardDelete','maxHorz','atypeId','target','GoldChange','ShowDevTools','HelpRect','setCoreEngineUpdateWindowBg','dimColor2','isGamepadTriggered','SParamVocab3','FontShadows','_displayedPassageError','_shouldPreventDefault','DimColor2','members','gradientFillRect','repeat','savefileInfo','_stored_ctGaugeColor1','VisuMZ_3_EventChainReact','%1〘Choice\x20%2〙\x20%3%1','initRotation','buttonAssistText3','process_VisuMZ_CoreEngine_Functions','buttonAssistKey5','textWidth','VisuMZ_2_BattleSystemOTB','updatePositionCoreEngineShakeVert','pixelated','getColor','xScrollLinkedOffset','mainAreaTop','Scene_Boot_startNormalGame','actorWindowRect','Troop%1','Sprite_Picture_loadBitmap','OpenURL','Actor','createSubSprite','CtrlQuickLoad','alpha','F13','_tile','getLevel','origin','split','Y:\x20%1','_encounterCount','parseForcedGameTroopSettingsCoreEngine','requestFauxAnimation','_screenX','_textQueue','exp','DigitGroupingExText','Window_Selectable_processCursorMove','Graphics_defaultStretchMode','Rate','updatePictureSettings','updateData','_pointAnimationQueue','_backgroundFilter','Plus','resetBattleSystem','transform','SParamVocab4','Scene_GameEnd_createBackground','_playTestFastMode','_allTextHeight','destroyContents','Rate2','checkSmartEventCollision','createCustomBackgroundImages','setAttack','cursorUp','CommandRect','OUTBACK','escape','targetOpacity','_name','_targetScaleX','sellWindowRect','isOptionValid','fillAll','DOWN','useFontWidthFix','INOUTQUART','start','Unnamed','outbounce','pageup','vert','getButtonAssistLocation','paramRate1','_bgmBuffer','WIN_OEM_PA1','gameTitle','Scene_Boot_updateDocumentTitle','isCollidedWithEvents','profileWindowRect','_addSpotTile','redraw','DetachBattlePictureContainer','framesPerChar','drawGameSubtitle','getControllerInputButtonString','_list','setAnglePlusData','updateSmoothScroll','NUM','setupCoreEngine','charAt','loadPicture','padZero','startMove','_tileExtendSprites','Window_Selectable_itemRect','scaleX','Bitmap_measureTextWidth','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','IconParam0','8210685dPwZld','_onError','setCoreEngineScreenShakeStyle','enter','_gamepadWait','createPointAnimation','ALTGR','reserveNewGameCommonEvent','1689956aQVdkw','ParseTilesetNotetags','BottomButtons','OUTCIRC','isGamepadButtonPressed','SCALE_MODES','gainSilentTp','_pointAnimationSprites','SParamVocab1','(\x5cd+)([%％])>','LUK','ApplyEasing','ControllerButtons','RegExp','buttonAssistOffset1','smooth','catchNormalError','BattleManager_update','toUpperCase','Window_NameInput_processTouch','NEAREST','loadGameImagesCoreEngine','Scene_Battle_createCancelButton','requestPointAnimation','KeyTAB','REC','attackSkillId','Window_NameInput_cursorRight','MapOnceParallel','HOME','WIN_OEM_JUMP','Game_Action_setAttack','Bitmap_drawCircle','onClick','CLOSE_BRACKET','text','Scene_Map_createMenuButton','setupCoreEasing','ShowButtons','helpWindowRect','OPEN_CURLY_BRACKET','REPLACE','FINAL','areTileShadowsHidden','PGUP','%1/','getKeyboardInputButtonString','setHandler','isSceneBattle','retrieveFauxAnimation','Color','tileWidth','_pauseSignSprite','backOpacity','LESS_THAN','_slotWindow','([\x5c+\x5c-]\x5cd+)>','GroupDigits','ARRAYEVAL','setWindowPadding','down2','createWindowLayer','mainAreaHeight','isActor','DELETE','FDR','Window_StatusBase_drawActorSimpleStatus','_spriteset','setupValueFont','exportAllMapStrings','makeTargetSprites','boxWidth','test','isSideView','height','EVAL','Sprite_Gauge_currentValue','Plus2','F17','_opacity','substring','defaultInputMode','length','WIN_OEM_FINISH','ExportAllTroopText','cursorDown','_statusParamsWindow','removeAnimation','JUNJA','_lastCommandSymbol','backgroundBitmap','QwertyLayout','PictureEraseRange','refreshDimmerBitmap','_tempActor','setMute','updateBgmParameters','destroy','sv_enemies','commandWindowRows','_texture','OUTELASTIC','BasicParameterFormula','makeInputButtonString','Input_pollGamepads','COMMA','addChild','mev','prepare','SParamVocab5','TILDE','Game_Battler_initTpbChargeTime','INQUAD','DEF','updateEffekseer','setupFont','playLoad','updateScene','evaluate','ENTER','updateDashToggle','framebuffer','current','_sellWindow','isBottomHelpMode','loadBitmap','duration','MDF','_stored_expGaugeColor2','_onceParallelInterpreters','buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20','send','drawIcon','adjustSprite','updateFrameCoreEngine','pow','_centerElement','battlerHue','src','isExpGaugeDrawn','setColorTone','updateKeyText','addWindow','originalJS','_onLoad','Scene_Menu_create','WindowLayer_render','match','Window_Base_update','move','Mirror','_animationSprites','sparamFlatJS','markCoreEngineModified','Game_System_initialize','_setupEventHandlers','_targetAnchor','Input_setupEventHandlers','_cacheScaleY','Wait','ActorBgType','SCROLLBAR','_addShadow','createKeyJS','initCoreEasing','MAXMP','MultiKeyFmt','refresh','_battlerName','doesNameContainBannedWords','etypeId','_commandWindow','Weapon-%1-%2','isTileExtended','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_viewportSize','updateMainMultiply','fontSize','Bitmap_initialize','#%1','Abbreviation','mainFontSize','updateAnglePlus','paintOpacity','PDR','update','_battleField','_subject','catchException','SystemLoadAudio','%2%1%3','removeAnimationFromContainer','_inputSpecialKeyCode','ctGaugeColor2','updateBgsParameters','onActorChange','resetFontSettings','animations','BTestAddedQuantity','baseTextRect','MAT','drawGameTitle','scrollUp','ExportStrFromAllMaps','platform','CEV','LINEAR','TargetAngle','CancelText','INOUTCIRC','guardSkillId','Scene_SingleLoadTransition','Finish','_startLoading','openingSpeed','UNDERSCORE','setEvent','battlebacks1','join','forceStencil','IconXParam1','ScreenShake','BgFilename2','colSpacing','wholeDuration','setBackgroundOpacity','_baseTexture','Window_TitleCommand_selectLast','maxItems','maxScrollY','Game_Action_itemHit','drawActorLevel','SELECT','ItemRect','ZERO','IconParam2','createTextState','OUTQUAD','isBusy','Scene_MenuBase_createCancelButton','exit','DataManager_setupNewGame','_hp','targetBackOpacity','isEventRunning','ParseAllNotetags','IconXParam5','TextCodeNicknames','startNormalGame','remove','JsReplaceUserVar','AGI','CodeJS','outlineColorGauge','responseText','horz','isCancelled','addQueue','evaded','GoldFontSize','statusWindowRect','getInputButtonString','buttonAssistKey1','drawBackgroundRect','isEnabled','_effectsContainer','pictureId','BuyBgType','AutoScrollLockX','xparamPlus','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','setFrame','%1〘End\x20Choice\x20Selection〙%1','NUMPAD1','isMagical','Chance','Game_Event_isCollidedWithEvents','helpAreaHeight','IconXParam3','WIN_OEM_PA2','Scene_Map_createSpritesetFix','StatusEquipRect','setHome','smallParamFontSize','tpColor','createEnemies','_cache','RequireFocus','changeTextColor','_stored_ctGaugeColor2','makeCommandList','ParseItemNotetags','createChildSprite','BattleManager_invokeCounterAttack','VisuMZ_2_BattleSystemFTB','setAction','isAnimationPlaying','focus','isAutoColorAffected','processPointAnimationRequests','showPointAnimations','_helpWindow','valueOutlineColor','ColorExpGauge2','OUTCUBIC','damageColor','_defaultStretchMode','clearOnceParallelInterpreters','AudioChangeBgmVolume','Sprite_Battler_startMove','ParseActorNotetags','drawActorClass','paramMax','targetObjects','KeyboardInput','windowRect','this.paramBase(3)','DrawIcons','keyMapper','WIN_OEM_CUSEL','setSideButtonLayout','Bitmap_drawTextOutline','itemHitImprovedAccuracy','buttonAssistText%1','maxBattleMembers','_screenY','Input_onKeyDown','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','drawActorIcons','refreshWithTextCodeSupport','ARRAYSTR','_sideButtonLayout','EXCLAMATION','initialBattleSystem','ExportCurMapText','BgFilename1','apply','_tilemap','tpbAcceleration','isFauxAnimationPlaying','ButtonFadeSpeed','arePageButtonsEnabled','updatePositionCoreEngineShakeRand','\x5c}❪SHIFT❫\x5c{','processTimingData','Scene_Base_create','AllTroops','ctGaugeColor1','processKeyboardDigitChange','TCR','Game_Interpreter_updateWaitMode','updateBackOpacity','GoldRect','SceneManager_exit','Graphics_centerElement','_animation','DebugConsoleLastControllerID','DisplayedParams','windowOpacity','makeDeepCopy','slotWindowRect','Enable','_startDecrypting','Game_Map_changeTileset','maxVert','CONVERT','advanced','measureText','wait','Game_Action_numRepeats','maxLvGaugeColor2','runCombinedScrollingTextAsCode','ctrl','name','pop','_cacheScaleX','min','sparamPlus','exportAllTroopStrings','_forcedBattleGridSystem','INSERT','isOpening','ExtractStrFromTroop','buttonAssistKey2','Window_StatusBase_drawActorLevel','createCancelButton','processEscape','Window_NameInput_initialize','_timerSprite','_opening','setLastPluginCommandInterpreter','buttonAssistOffset%1','allTiles','updateMove','LATIN1','_destroyInternalTextures','SellBgType','BKSP','isBottomButtonMode','_actorWindow','home','ColorPowerDown','targets','ColorHPGauge1','getCoreEngineScreenShakeStyle','clearCachedKeys','_pageupButton','setBackgroundType','PageChange','drawIconBySize','result','setSideView','INOUTBACK','mpGaugeColor1','repositionCancelButtonSideButtonLayout','updateOnceParallelInterpreters','GameEnd','needsUpdate','DimColor1','alwaysDash','drawCurrentParam','currentLevelExp','CustomParamAbb','isPhysical','animationBaseDelay','sparamFlatBonus','drawCurrencyValue','process_VisuMZ_CoreEngine_CustomParameters','applyEasing','STENCIL_BUFFER_BIT','batch','sqrt','isDying','printError','toLocaleString','Window_refreshBack','sceneTerminationClearEffects','ATTN','Scene_Map_updateMainMultiply','_currentBgm','helpAreaTop','numRepeats','Game_Character_processMoveCommand','adjustX','xparamRate2','Sprite_AnimationMV_updatePosition','_drawTextOutline','viewport','numberWindowRect','scrollbar','targetX','BTB','description','PixelateImageRendering','Game_Picture_initBasic','_targetOffsetX','CategoryRect','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','maxLvGaugeColor1','itemHit','BoxMargin','InputRect','AudioChangeBgsPan','ButtonHeight','Window_Base_drawIcon','GET','loadSystem','itemWindowRect','Window_MapName_refresh','mirror','IconParam5','createFauxAnimation','paramName','uiAreaHeight','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','updatePlayTestF7','targetContentsOpacity','xparamRateJS','setDisplayPos','removeFauxAnimation','SwitchToggleRange','missed','SParamVocab8','OTB','ParseArmorNotetags','buttonAssistText2','this.paramBase(','menu','_inputString','playBgm','repositionEnemiesByResolution','createDimmerSprite','SParamVocab9','createSpriteset','_customModified','textBaseline','isRepeated','_backSprite','NumberRect','OUTEXPO','getCustomBackgroundSettings','_targetOpacity','createCustomParameter','BattleManager_processEscape','Scene_Name_create','animationNextDelay','getLastUsedGamepadType','openness','SystemSetWindowPadding','Game_Map_setup','_itemWindow','paramBaseAboveLevel99','SParameterFormula','ARRAYJSON','paramFlatBonus','events','QUOTE','Bitmap_gradientFillRect','gold','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','nah','onerror','levelUp','IconIndex','meVolume','process_VisuMZ_CoreEngine_jsQuickFunctions','isSmartEventCollisionOn','Window_NameInput_processHandling','updateShadow','_statusWindow','State-%1-%2','_coreEngineShakeStyle','Window_NameInput_refresh','visible','textHeight','inputWindowRect','EXSEL','en-US','drawFace','NameInputMessage','catchUnknownError','_pictureName','fromCharCode','Window_Scrollable_update','paramY','checkCoreEngineDisplayCenter','SceneManager_isGameActive','DETACH_PICTURE_CONTAINER','Scene_Base_terminate','INCUBIC','sparamPlus1','%1\x0a','note','isItem','_scrollBarHorz','dimColor1','drawItem','_margin','DOUBLE_QUOTE','tilesets','OptionsMenu','EQUAL','isAnimationForEach','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','restore','Scene_Map_initialize','shift','Scene_Map_updateMain','hpGaugeColor1','scrollX','initBasic','DECIMAL','_changingClass','isTouchedInsideFrame','subtitle','_stored_hpGaugeColor1','MDR','performMiss','DummyBgType','INQUART','removeAllPointAnimations','_scene','EncounterRateMinimum','playTestF7','Rate1','wtypeId','Spriteset_Battle_createEnemies','IconXParam8','altKey','catchLoadError','mute','Flat1','initCoreEngine','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','processCursorHomeEndTrigger','allIcons','RPGMAKER_VERSION','displayY','angle','Sprite_Picture_updateOrigin','FontSize','AdjustAngle','_pagedownButton','mainCommandWidth','PRINTSCREEN','_targetOffsetY','Spriteset_Base_updatePosition','DefaultStyle','endAnimation','width','onInputBannedWords','selectLast','ItemPadding','IconXParam0','processTouchModernControls','Window_Base_createContents','Window_Gold_refresh','updatePictureAntiZoom','command122','_windowskin','isOpen','clearRect','enemy','Scene_Shop_create','IconParam1','connected','setViewport','removeAllFauxAnimations','_numberWindow','EquipMenu','statusEquipWindowRect','SETTINGS','Bitmap_fillRect','_stored_crisisColor','_lastScrollBarValues','darwin','sv_actors','ExtractStrFromList','_digitGrouping','powerDownColor','Scene_MenuBase_createBackground','VariableEvalReference','_scaleX','globalAlpha','_clickHandler','log','levelUpRecovery','PositionJS','_playtestF7Looping','1110147uUewOL','ParseEnemyNotetags','_scrollBarVert','〘Scrolling\x20Text〙\x0a','_mainSprite','DetachMapPictureContainer','cursorPagedown','storeMapData','moveRelativeToResolutionChange','paramchangeTextColor','WASD','slice','exec','643902ZdwklS','NUM_LOCK','original','OkText','ExtractStrFromMap','updateDuration','DigitGroupingGaugeSprites','get','Window_ShopSell_isEnabled','TPB\x20WAIT','Spriteset_Base_destroy','currencyUnit','isMapScrollLinked','_srcBitmap','_saveFileID','processSoundTimings','VisuMZ_2_BattleSystemPTB','Game_Interpreter_command122','onKeyDownKeysF6F7','Scene_Base_terminateAnimationClearBugFix','onBattleEnd','SkillMenu','framesMin','seek','stretch','_backSprite2','updatePictureCoordinates','CLOSE_PAREN','ColorCTGauge2','(\x5cd+)>','updateFauxAnimations','menuShowButton','cursorRight','ACCEPT','PositionY','_height','pictures','OPEN_PAREN','_stored_powerUpColor','OUTQUINT','pressed','_statusEquipWindow','Enemy-%1-%2','HIT','itypeId','_moveEasingType','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','SCROLL_LOCK','createBackground','_baseSprite','LoadMenu','pointY','format','TextPopupShow','NewGameCommonEvent','WIN_OEM_FJ_ROYA','CLEAR','_bgsBuffer','ParseSkillNotetags','targetScaleY','TRAIT_PARAM','OutlineColorGauge','Plus1','Scene_Battle_createSpriteset','updateTpbChargeTime','_menuButton','setupTileExtendTerrainTags','getLastPluginCommandInterpreter','buttonAssistKey4','_drawTextShadow','SkillTypeRect','ColorSystem','DisplayLockY','EnableJS','addAnimationSpriteToContainer','active','list','_backSprite1','canAttack','overallWidth','alignBottom','Game_Interpreter_PluginCommand','processHandling','animationShouldMirror','ETB','Conditional\x20Branch\x20Script\x20Error','parse','this.paramBase(2)','nextLevelExp','Enemy','onTpbCharged','getLastGamepadUsed','randomInt','COLON','string','title','\x20this.','Game_Actor_levelUp','command355','ButtonAssist','ColorNormal','bgm','flush','centerCameraCheckData','getColorDataFromPluginParameters','XParamVocab0','F15','MinDuration','%1:\x20Exit\x20','Window_NameInput_cursorDown','Scene_Skill_create','equips','buttonAssistKey3','changeTileset','DummyRect','setEasingType','ALT','processKeyboardEnd','setupNewGame','MenuLayout','adjustPictureAntiZoom','setActorHome','isMenuButtonAssistEnabled','dummyWindowRect','setActionState','padding','RevertPreserveNumbers','stypeId','createPointAnimationQueue','playCursorSound','call','WIN_OEM_FJ_MASSHOU','Game_Map_scrollRight','command105','changeAnglePlusData','movePageButtonSideButtonLayout','backspace','_anglePlus','_startPlaying','process_VisuMZ_CoreEngine_Settings','SParamVocab2','onMoveEnd','Opacity','startAutoNewGame','BlurStrength','DigitGroupingStandardText','xparamFlatBonus','DamageColor','tilesetNames','SlotBgType','ActorHPColor','Game_Picture_move','scrollLeft','Game_Picture_x','itemPadding','command111','traitObjects','ONE','skipBranch','drawGauge','StatusMenu','actor','Input_clear','OutlineColor','([\x5c+\x5c-]\x5cd+)([%％])>','_duration','isGameActive','GRD','loadTitle2','Window_Selectable_cursorDown','version','lineHeight','PGDN','horizontal','expGaugeColor1','faceHeight','offsetX','replace','bitmapWidth','sparamFlat1','params','updatePadding','updateMain','setupScrollBarBitmap','MRF','_isPlaytest','ShowJS','_movementWholeDuration','PIPE','floor','xparamFlatJS','getTileExtendTerrainTags','clamp','TextFmt','META','cursorLeft','battleSystem','_stored_tpGaugeColor2','CIRCUMFLEX','onlyfilename','clearZoom','Settings','Manual','_updateGamepadState','createMenuButton','fillText','playBgs','NameMenu','refreshScrollBarBitmap','ParamMax','show','Window_Base_createTextState','_tileSprite','hit','StatusEquipBgType','onButtonImageLoad','loadSystemImages','INOUTQUAD','showIncompleteTilesetError','ATK','useDigitGrouping','%1〘Choice\x20Cancel〙%1','destroyCoreEngineMarkedBitmaps','CANCEL','_iconIndex','goto','AnimationPoint','this.paramBase(1)','this.paramBase(4)','MODECHANGE','pan','buttonAssistWindowButtonRect','_hideTileShadows','Window_Base_drawFace','ItemBackColor1','max','KeySHIFT','goldWindowRect','_backgroundSprite','createPointAnimationSprite','WIN_OEM_CLEAR','scale','windowPadding','processDigitChange','pointX','loadTileBitmap','Scene_Map_shouldAutosave','drawValue','_stored_pendingColor','moveCancelButtonSideButtonLayout','playOk','loadWindowskin','MCR','_scrollDuration','(\x5cd+\x5c.?\x5cd+)>','openURL','isSideButtonLayout','sparamPlus2','XParamVocab2','PRINT','EXECUTE','WIN_OEM_FJ_JISHO','push','rgba(0,\x200,\x200,\x201.0)','destroyed','KEEP','itemEva','keyboard','_updateFilterArea','MapNameTextCode','removeTileExtendSprites','_bypassCanCounterCheck','CoreEngine','_downArrowSprite','bodyColor','_editWindow','makeFontBigger','setEnemyAction','Window_Base_drawText','displayX','isPointAnimationPlaying','font','xparamRate','offColor','areButtonsHidden','process_VisuMZ_CoreEngine_Notetags','anchorCoreEasing','successRate','pictureButtons','CAPSLOCK','targetScaleX','buttonAssistSwitch','Smooth','_storedMapText','DATABASE','status','buttonAssistOffset3','VOLUME_MUTE','concat','Scene_Item_create','Scene_Map_createSpriteset','ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a','ARRAYNUM','initButtonHidden','Game_Screen_initialize','_blank','updateOpen','clearForcedGameTroopSettingsCoreEngine','overrideMimeType','CustomParamNames','PictureRotate','PLUS','contents','ActorTPColor','_offsetX','isUseModernControls','anchor','tileHeight','INQUINT','_rate','drawText','scrollbarHeight','ListBgType','SmartEventCollisionPriority','CrisisRate','Actor-%1-%2','NUMPAD2','Game_Action_itemEva','Exported_Script_%1.txt','paramRateJS','removePointAnimation','_stored_tpGaugeColor1','isNormalPriority','contentsBack','_stored_expGaugeColor1','round','GREATER_THAN','324453QsDOvc','Input_update','subject','Sprite_StateIcon_updateFrame','LvExpGauge','maxGold','xparamFlat2','select','_isButtonHidden','ScreenResolution','NONCONVERT','faces','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','playCursor','initMembersCoreEngine','Bitmap_blt','makeDocumentTitle','ColorCrisis','animationId','erasePicture','waiting','enemies','expParams','makeCoreEngineCommandList','innerHeight','stringKeyMap','isCursorMovable','BlendMode','calcEasing','includes','type','_categoryWindow','processFauxAnimationRequests','BattleManager_checkSubstitute','GetParamIcon','updateRotation','》Comment《\x0a%1\x0a','createTileExtendSprites','isNwjs','resize','loadIconBitmap','CustomParam','initTpbChargeTime','isNumpadPressed','DashToggleR','TitleCommandList','_mp','processKeyboardHome','Spriteset_Base_initialize','BannedWords','NewGameBoot','gainItem','createFauxAnimationSprite','enabled','Scene_Options_create','ItemStyle','updateCoreEasing','jsQuickFunc','ConvertToBase','currentValue','_bitmap','AudioChangeBgsPitch','recoverAll','option','_active','NumberBgType','drawParamText','AudioChangeBgsVolume','ForceNoPlayTest','updatePositionCoreEngineShakeOriginal','Untitled','centerSprite','endAction','maxCols','areButtonsOutsideMainUI','dashToggle','VisuMZ_2_BattleSystemETB','INOUTEXPO','SlotRect','updatePointAnimations','IconSet','\x20Origin:\x20%1','opacity','ListRect','MINUS','Bitmap_clearRect','processTouch','isClosed','coreEngineRepositionEnemies','406266CbUXIz','reduce','ENTER_SPECIAL','eventsXyNt','createTextPopupWindow','IconXParam2','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','ExtJS','ColorMPGauge2','Show\x20Scrolling\x20Text\x20Script\x20Error','ExportStrFromAllTroops','Scene_Battle_update','$dataMap','OpenSpeed','updateWaitMode','EscapeAlways','HRG','_centerCameraCheck','setupButtonImage','GoldMax','fillRect','ConvertNumberToString','_timeDuration','LoadError','Spriteset_Map_createTilemap','Scene_Base_createWindowLayer','refreshActor','_scaleY','LEFT','terminate','_targetScaleY','paramX','titles1','Symbol','_targetY','currentClass','getBackgroundOpacity','Window_NumberInput_processDigitChange','retreat','alphabetic','IconSParam7','filters','CategoryBgType','IconSParam2','XParamVocab8','ItemMenu','inBattle','Param','paramValueByName','initRotationCoreEngine','Graphics_printError','PictureEasingType','fadeSpeed','_stypeId','_clientArea','tpGaugeColor2','open','Graphics','buttonAssistKey%1','_currentBgs','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ADD','OUTQUART','WIN_ICO_CLEAR','_isWindow','number','IconXParam7','down','expRate','default','Title','calcCoreEasing','Key%1','Pixelated','Scene_MenuBase_helpAreaTop','FUNC','bitmap','iconWidth','createButtonAssistWindow','MAX_SAFE_INTEGER','Game_Event_start','BuyRect','Sprite_Button_updateOpacity','_inBattle','isMaskingEnabled','_forcedBattleSys','Sprite_destroy','Window_NameInput_cursorUp','_lastX','WIN_OEM_FJ_LOYA','Game_Actor_changeClass','evade','key%1','PAUSE','_shiftY','determineSideButtonLayoutValid','useDigitGroupingEx','paramWidth','ModernControls','_text','updateBattleVariables','maxPictures','EQUALS','OutlineColorDmg','Window_Selectable_drawBackgroundRect','mainAreaBottom','_target','standardIconWidth','createAnimationSprite','Game_Action_updateLastTarget','toLowerCase','F21','_width','_lastGamepad','charging','retrievePointAnimation','SEPARATOR','RepositionEnemies130','WIN_OEM_RESET','VisuMZ_1_BattleCore','outlineColorDmg','startAnimation','Game_Picture_updateRotation','operand','FadeSpeed','DocumentTitleFmt','drawCircle','updateScrollBarPosition','scaleSprite','EXR','_tpbChargeTime','setupRate','indexOf','_listWindow','checkPassage','GoldOverlap','system','NoTileShadows','clone','updatePositionCoreEngine','playTestShiftT','playEscape','loadBitmapCoreEngine','Mute','_fauxAnimationSprites','randomJS','_profileWindow','_buyWindow','ARRAYSTRUCT','img/%1/','_balloonQueue','removeChild','registerCommand','F19','Game_Troop_setup','offOpacity','makeFontSmaller','_cancelButton','_origin','createDigits','F23','initDigitGrouping','Sprite_Animation_processSoundTimings','skillId','initialize','textAlign','WIN_OEM_FJ_TOUROKU','encounterStepsMinimum','smoothSelect','paramMaxJS','RepositionEnemies','iconHeight','onInputOk','PictureFilename','ColorGaugeBack','Scene_Boot_onDatabaseLoaded','paramPlus','Sprite_AnimationMV_processTimingData','Window','bgs','level','createPageButtons','endBattlerActions','displayName','893555muFgCy','ConvertParams','ColorTPCost','Tilemap_addSpotTile','cancelShowButton','isGamepadConnected','mhp','contentsOpacity','SaveMenu','PLAY','〘Common\x20Event\x20%1:\x20%2〙\x20Start','setTopRow','Scene_MenuBase_mainAreaHeight','Game_Interpreter_command111','ItemBackColor2','FontSmoothing','ParamArrow','Window_Selectable_processTouch','easingType','buttonAssistText1','mainAreaTopSideButtonLayout','crisisColor','context','center','Game_Picture_scaleX','ExportString','gaugeBackColor','playtestQuickLoad','and\x20add\x20it\x20onto\x20this\x20one.','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','isFullDocumentTitle','create','_dimmerSprite','close','playOnceParallelInterpreter','_displayX','seVolume','children','random','ExportCurTroopText','ParamName','StartID','KANA','_pictureCoordinatesMode','button','child_process','checkSubstitute','_stored_deathColor','end','addCommand','setCommonEvent','SceneManager_initialize','buttonAssistOk','StatusBgType','StatusParamsRect','skills','SLEEP','CreateBattleSystemID','Window_EquipItem_isEnabled','CRI','isActiveTpb','buttons','Scene_Map_updateScene','textSizeEx','ShopMenu','LineHeight','WIN_ICO_00','paramBase','setClickHandler','Sprite_StateIcon_loadBitmap','shake','keypress','terms','canEquip','OpenConsole','targetY','thickness','drawAllParams','Type','renderNoMask','isScrollBarVisible','ColorExpGauge1','KeyUnlisted','vertJS','pos','setTargetAnchor','setActorHomeRepositioned','ShowScrollBar','TGR','Spriteset_Base_isAnimationPlaying','Layer','buttonAssistText4','right','ScaleY','blendFunc','onXhrError','ParseClassNotetags','processDrawIcon','_shakePower','operation','IconParam6','isGamepadAxisMoved','ceil','NUMPAD3','_targetX','prototype','mpColor','xparamPlus1','F20','powerUpColor','SwitchRandomizeRange','WIN_OEM_PA3','OptionsBgType','gaugeRate','createContents','playTestShiftR','VisuMZ_4_UniqueTileEffects','invokeCounterAttack','getControllerInputButtonMatch','subjectHitRate','optSideView','_hovered','updatePositionCoreEngineShakeHorz','initialLevel','_currentMap','Keyboard','Window_NumberInput_start','activate','_tpbState','applyCoreEasing','removeOnceParallelInterpreter','【%1】\x0a','ItemBgType','processAlwaysEscape'];_0x547f=function(){return _0x27da62;};return _0x547f();}function Sprite_TitlePictureButton(){const _0xb208c9=_0x45f0a9;this[_0xb208c9(0x73f)](...arguments);}Sprite_TitlePictureButton[_0x45f0a9(0x7bc)]=Object[_0x45f0a9(0x772)](Sprite_Clickable[_0x45f0a9(0x7bc)]),Sprite_TitlePictureButton['prototype'][_0x45f0a9(0x1d3)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x45f0a9(0x7bc)]['initialize']=function(_0x1d49a4){const _0x232a94=_0x45f0a9;Sprite_Clickable[_0x232a94(0x7bc)][_0x232a94(0x73f)]['call'](this),this[_0x232a94(0x14a)]=_0x1d49a4,this[_0x232a94(0x4df)]=null,this['setup']();},Sprite_TitlePictureButton[_0x45f0a9(0x7bc)]['setup']=function(){const _0x4f9c58=_0x45f0a9;this['x']=Graphics[_0x4f9c58(0x4bc)],this['y']=Graphics[_0x4f9c58(0x2a5)],this[_0x4f9c58(0x470)]=![],this[_0x4f9c58(0x6ad)]();},Sprite_TitlePictureButton[_0x45f0a9(0x7bc)][_0x45f0a9(0x6ad)]=function(){const _0x59d446=_0x45f0a9;this[_0x59d446(0x6e7)]=ImageManager[_0x59d446(0x24a)](this[_0x59d446(0x14a)][_0x59d446(0x748)]),this['bitmap']['addLoadListener'](this[_0x59d446(0x5c8)][_0x59d446(0x159)](this));},Sprite_TitlePictureButton['prototype'][_0x45f0a9(0x5c8)]=function(){const _0x403670=_0x45f0a9;this[_0x403670(0x14a)]['OnLoadJS']['call'](this),this['_data'][_0x403670(0x4e2)][_0x403670(0x573)](this),this[_0x403670(0x797)](this['_data']['CallHandlerJS'][_0x403670(0x159)](this));},Sprite_TitlePictureButton[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)]=function(){const _0x58841f=_0x45f0a9;Sprite_Clickable[_0x58841f(0x7bc)][_0x58841f(0x314)][_0x58841f(0x573)](this),this[_0x58841f(0x12e)](),this[_0x58841f(0x698)]();},Sprite_TitlePictureButton[_0x45f0a9(0x7bc)][_0x45f0a9(0x6cf)]=function(){const _0x3e635a=_0x45f0a9;return VisuMZ[_0x3e635a(0x601)][_0x3e635a(0x5ba)]['MenuLayout'][_0x3e635a(0x6e1)][_0x3e635a(0x3af)];},Sprite_TitlePictureButton[_0x45f0a9(0x7bc)][_0x45f0a9(0x12e)]=function(){const _0xc9af83=_0x45f0a9;this['_pressed']||this[_0xc9af83(0x7cc)]?this['opacity']=0xff:(this['opacity']+=this[_0xc9af83(0x470)]?this[_0xc9af83(0x6cf)]():-0x1*this[_0xc9af83(0x6cf)](),this[_0xc9af83(0x694)]=Math[_0xc9af83(0x3d3)](0xc0,this[_0xc9af83(0x694)]));},Sprite_TitlePictureButton[_0x45f0a9(0x7bc)][_0x45f0a9(0x797)]=function(_0x2f615f){const _0x5b65f2=_0x45f0a9;this[_0x5b65f2(0x4df)]=_0x2f615f;},Sprite_TitlePictureButton[_0x45f0a9(0x7bc)][_0x45f0a9(0x27c)]=function(){const _0x3e2021=_0x45f0a9;this[_0x3e2021(0x4df)]&&this[_0x3e2021(0x4df)]();};function Sprite_ExtendedTile(){const _0x5ac476=_0x45f0a9;this[_0x5ac476(0x73f)](...arguments);}Sprite_ExtendedTile['prototype']=Object[_0x45f0a9(0x772)](Sprite[_0x45f0a9(0x7bc)]),Sprite_ExtendedTile[_0x45f0a9(0x7bc)][_0x45f0a9(0x1d3)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)]=function(_0x290861,_0x1bc397,_0x12c157,_0x2c5d07){const _0x1c6ead=_0x45f0a9;this[_0x1c6ead(0x6f9)]=Game_CharacterBase['DEFAULT_SHIFT_Y']||-0x6,this[_0x1c6ead(0x831)]=_0x290861,this[_0x1c6ead(0x82e)]=_0x1bc397,this[_0x1c6ead(0x205)]=_0x12c157,this[_0x1c6ead(0x8ca)]=_0x2c5d07,Sprite[_0x1c6ead(0x7bc)][_0x1c6ead(0x73f)][_0x1c6ead(0x573)](this),this[_0x1c6ead(0x201)](),this[_0x1c6ead(0x5e6)](),this[_0x1c6ead(0x16d)](),this[_0x1c6ead(0x314)]();},Sprite_ExtendedTile[_0x45f0a9(0x7bc)][_0x45f0a9(0x201)]=function(){const _0x328b7d=_0x45f0a9;this[_0x328b7d(0x5c5)]=new Sprite(),this[_0x328b7d(0x5c5)][_0x328b7d(0x62d)]['x']=0.5,this[_0x328b7d(0x5c5)][_0x328b7d(0x62d)]['y']=0x1,this[_0x328b7d(0x5c5)]['y']=-this[_0x328b7d(0x6f9)]+0x1,this[_0x328b7d(0x2c5)](this['_tileSprite']);},Sprite_ExtendedTile[_0x45f0a9(0x7bc)][_0x45f0a9(0x5e6)]=function(){const _0x2a885e=_0x45f0a9,_0x50e77c=$gameMap[_0x2a885e(0x8a0)](),_0x59cdd7=0x5+Math[_0x2a885e(0x5ae)](this['_tile']/0x100);this[_0x2a885e(0x5c5)][_0x2a885e(0x6e7)]=ImageManager[_0x2a885e(0x165)](_0x50e77c[_0x2a885e(0x585)][_0x59cdd7]);},Sprite_ExtendedTile['prototype'][_0x45f0a9(0x16d)]=function(){const _0x5bb514=_0x45f0a9,_0x196c2=this[_0x5bb514(0x205)],_0x1fb26d=$gameMap['tileWidth'](),_0x609e3a=$gameMap[_0x5bb514(0x62e)](),_0x3bdf55=(Math[_0x5bb514(0x5ae)](_0x196c2/0x80)%0x2*0x8+_0x196c2%0x8)*_0x1fb26d,_0xda7f3d=Math['floor'](_0x196c2%0x100/0x8)%0x10*_0x609e3a,_0x17670b=this[_0x5bb514(0x8ca)]*_0x609e3a;this[_0x5bb514(0x5c5)][_0x5bb514(0x36a)](_0x3bdf55,_0xda7f3d-_0x17670b,_0x1fb26d,_0x609e3a+_0x17670b);},Sprite_ExtendedTile[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)]=function(){const _0x3794a0=_0x45f0a9;Sprite['prototype'][_0x3794a0(0x314)][_0x3794a0(0x573)](this),this[_0x3794a0(0x1bb)]();},Sprite_ExtendedTile[_0x45f0a9(0x7bc)][_0x45f0a9(0x1bb)]=function(){const _0x4232db=_0x45f0a9,_0x29f8d5=$gameMap['tileWidth'](),_0x4808e9=$gameMap['tileHeight'](),_0x3e0d63=this[_0x4232db(0x831)],_0x23875a=this['_mapY'];this['x']=Math[_0x4232db(0x5ae)](($gameMap[_0x4232db(0x416)](_0x3e0d63)+0.5)*_0x29f8d5),this['y']=Math[_0x4232db(0x5ae)](($gameMap['adjustY'](_0x23875a)+0x1)*_0x4808e9)+this[_0x4232db(0x6f9)]-0x1;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x672)]=Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)],Spriteset_Base['prototype'][_0x45f0a9(0x73f)]=function(){const _0x20d188=_0x45f0a9;VisuMZ['CoreEngine']['Spriteset_Base_initialize'][_0x20d188(0x573)](this),this[_0x20d188(0x650)]();},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x650)]=function(){const _0x12e21c=_0x45f0a9;this['_fauxAnimationSprites']=[],this[_0x12e21c(0x262)]=[],this['_cacheScaleX']=this[_0x12e21c(0x5e2)]['x'],this[_0x12e21c(0x2f9)]=this[_0x12e21c(0x5e2)]['y'];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4fb)]=Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x2bc)],Spriteset_Base[_0x45f0a9(0x7bc)]['destroy']=function(_0x110e72){const _0x2fa739=_0x45f0a9;this[_0x2fa739(0x4ce)](),this[_0x2fa739(0x49f)](),VisuMZ[_0x2fa739(0x601)]['Spriteset_Base_destroy'][_0x2fa739(0x573)](this,_0x110e72);},VisuMZ['CoreEngine']['Spriteset_Base_update']=Spriteset_Base[_0x45f0a9(0x7bc)]['update'],Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)]=function(){const _0x4e33c6=_0x45f0a9;VisuMZ[_0x4e33c6(0x601)]['Spriteset_Base_update'][_0x4e33c6(0x573)](this),this[_0x4e33c6(0x214)](),this[_0x4e33c6(0x4c4)](),this['updateFauxAnimations'](),this[_0x4e33c6(0x691)]();},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x214)]=function(){},Spriteset_Base[_0x45f0a9(0x7bc)]['updatePictureAntiZoom']=function(){const _0x203405=_0x45f0a9;if(!VisuMZ[_0x203405(0x601)][_0x203405(0x5ba)][_0x203405(0x8f1)][_0x203405(0x8e2)])return;if(this[_0x203405(0x3d2)]===this[_0x203405(0x5e2)]['x']&&this['_cacheScaleY']===this[_0x203405(0x5e2)]['y'])return;this[_0x203405(0x569)](),this[_0x203405(0x3d2)]=this[_0x203405(0x5e2)]['x'],this['_cacheScaleY']=this[_0x203405(0x5e2)]['y'];},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x569)]=function(){const _0x52191e=_0x45f0a9;if(SceneManager[_0x52191e(0x8fd)]()&&Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;else{if(SceneManager[_0x52191e(0x28b)]()&&Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;}this[_0x52191e(0x5e2)]['x']!==0x0&&(this['_pictureContainer'][_0x52191e(0x5e2)]['x']=0x1/this[_0x52191e(0x5e2)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x52191e(0x5e2)]['x'])),this[_0x52191e(0x5e2)]['y']!==0x0&&(this[_0x52191e(0x847)][_0x52191e(0x5e2)]['y']=0x1/this[_0x52191e(0x5e2)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x52191e(0x5e2)]['y']));},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4b9)]=Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x1bb)],Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x1bb)]=function(){const _0x2db72a=_0x45f0a9;VisuMZ[_0x2db72a(0x601)]['Spriteset_Base_updatePosition'][_0x2db72a(0x573)](this),this[_0x2db72a(0x726)]();},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x726)]=function(){const _0x2a0879=_0x45f0a9;if(!$gameScreen)return;if($gameScreen[_0x2a0879(0x1ab)]<=0x0)return;this['x']-=Math[_0x2a0879(0x640)]($gameScreen[_0x2a0879(0x799)]());const _0x34a2c6=$gameScreen[_0x2a0879(0x3ef)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x2a0879(0x4f3):this[_0x2a0879(0x687)]();break;case _0x2a0879(0x59e):this['updatePositionCoreEngineShakeHorz']();break;case _0x2a0879(0x11c):this[_0x2a0879(0x1f6)]();break;default:this[_0x2a0879(0x3b1)]();break;}},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x687)]=function(){const _0x4bda35=_0x45f0a9,_0x2929be=VisuMZ[_0x4bda35(0x601)]['Settings'][_0x4bda35(0x338)];if(_0x2929be&&_0x2929be[_0x4bda35(0x2ea)])return _0x2929be[_0x4bda35(0x2ea)][_0x4bda35(0x573)](this);this['x']+=Math['round']($gameScreen[_0x4bda35(0x799)]());},Spriteset_Base['prototype']['updatePositionCoreEngineShakeRand']=function(){const _0xa008ab=_0x45f0a9,_0x139f69=VisuMZ[_0xa008ab(0x601)]['Settings']['ScreenShake'];if(_0x139f69&&_0x139f69[_0xa008ab(0x72c)])return _0x139f69[_0xa008ab(0x72c)]['call'](this);const _0x443a13=$gameScreen[_0xa008ab(0x7b5)]*0.75,_0x7cbfdd=$gameScreen[_0xa008ab(0x893)]*0.6,_0x42dbdc=$gameScreen[_0xa008ab(0x1ab)];this['x']+=Math[_0xa008ab(0x640)](Math[_0xa008ab(0x54d)](_0x443a13)-Math[_0xa008ab(0x54d)](_0x7cbfdd))*(Math[_0xa008ab(0x3d3)](_0x42dbdc,0x1e)*0.5),this['y']+=Math[_0xa008ab(0x640)](Math[_0xa008ab(0x54d)](_0x443a13)-Math[_0xa008ab(0x54d)](_0x7cbfdd))*(Math[_0xa008ab(0x3d3)](_0x42dbdc,0x1e)*0.5);},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x7cd)]=function(){const _0x22c1de=_0x45f0a9,_0x21ae4a=VisuMZ[_0x22c1de(0x601)][_0x22c1de(0x5ba)][_0x22c1de(0x338)];if(_0x21ae4a&&_0x21ae4a[_0x22c1de(0x181)])return _0x21ae4a[_0x22c1de(0x181)][_0x22c1de(0x573)](this);const _0xc9394e=$gameScreen[_0x22c1de(0x7b5)]*0.75,_0x8d24a8=$gameScreen[_0x22c1de(0x893)]*0.6,_0x53e95c=$gameScreen['_shakeDuration'];this['x']+=Math[_0x22c1de(0x640)](Math[_0x22c1de(0x54d)](_0xc9394e)-Math[_0x22c1de(0x54d)](_0x8d24a8))*(Math[_0x22c1de(0x3d3)](_0x53e95c,0x1e)*0.5);},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x1f6)]=function(){const _0x3df33e=_0x45f0a9,_0x587e3e=VisuMZ[_0x3df33e(0x601)][_0x3df33e(0x5ba)][_0x3df33e(0x338)];if(_0x587e3e&&_0x587e3e[_0x3df33e(0x7a6)])return _0x587e3e[_0x3df33e(0x7a6)][_0x3df33e(0x573)](this);const _0x5143cf=$gameScreen['_shakePower']*0.75,_0x4b24c6=$gameScreen[_0x3df33e(0x893)]*0.6,_0x115b19=$gameScreen['_shakeDuration'];this['y']+=Math[_0x3df33e(0x640)](Math[_0x3df33e(0x54d)](_0x5143cf)-Math[_0x3df33e(0x54d)](_0x4b24c6))*(Math[_0x3df33e(0x3d3)](_0x115b19,0x1e)*0.5);},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x50f)]=function(){const _0x42fe73=_0x45f0a9;for(const _0x3f192d of this['_fauxAnimationSprites']){!_0x3f192d[_0x42fe73(0x141)]()&&this[_0x42fe73(0x43a)](_0x3f192d);}this[_0x42fe73(0x662)]();},Spriteset_Base[_0x45f0a9(0x7bc)]['processFauxAnimationRequests']=function(){const _0xffc222=_0x45f0a9;for(;;){const _0x193248=$gameTemp[_0xffc222(0x28c)]();if(_0x193248)this[_0xffc222(0x432)](_0x193248);else break;}},Spriteset_Base['prototype']['createFauxAnimation']=function(_0x3a22c6){const _0x1b2dea=_0x45f0a9,_0x138ae0=$dataAnimations[_0x3a22c6[_0x1b2dea(0x654)]],_0x1179d7=_0x3a22c6[_0x1b2dea(0x3ed)],_0x1b00d1=_0x3a22c6['mirror'],_0x340871=_0x3a22c6[_0x1b2dea(0x4a9)];let _0x171ef4=this[_0x1b2dea(0x403)]();const _0x3a8b00=this[_0x1b2dea(0x454)]();if(this[_0x1b2dea(0x48d)](_0x138ae0))for(const _0x3c9c56 of _0x1179d7){this[_0x1b2dea(0x676)]([_0x3c9c56],_0x138ae0,_0x1b00d1,_0x171ef4,_0x340871),_0x171ef4+=_0x3a8b00;}else this[_0x1b2dea(0x676)](_0x1179d7,_0x138ae0,_0x1b00d1,_0x171ef4,_0x340871);},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x707)]=function(_0x22c82f,_0x38b6e4,_0x23ab37,_0x1776a6){const _0x58f786=_0x45f0a9,_0x109245=this[_0x58f786(0x872)](_0x38b6e4),_0x20aa15=new(_0x109245?Sprite_AnimationMV:Sprite_Animation)(),_0x1968af=this[_0x58f786(0x2a1)](_0x22c82f),_0x277dae=this['animationBaseDelay'](),_0x3e8081=_0x1776a6>_0x277dae?this[_0x58f786(0x192)]():null;this[_0x58f786(0x544)](_0x22c82f[0x0])&&(_0x23ab37=!_0x23ab37),_0x20aa15[_0x58f786(0x394)]=_0x22c82f,_0x20aa15[_0x58f786(0x197)](_0x1968af,_0x38b6e4,_0x23ab37,_0x1776a6,_0x3e8081),this[_0x58f786(0x53b)](_0x20aa15),this['_animationSprites']['push'](_0x20aa15);},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x676)]=function(_0x2d1981,_0x3d9fa6,_0x45b656,_0x54a420,_0x35f97e){const _0x4ba966=_0x45f0a9,_0x183eed=this['isMVAnimation'](_0x3d9fa6),_0x1358c0=new(_0x183eed?Sprite_AnimationMV:Sprite_Animation)(),_0xbe6bc3=this[_0x4ba966(0x2a1)](_0x2d1981);this[_0x4ba966(0x544)](_0x2d1981[0x0])&&(_0x45b656=!_0x45b656);_0x1358c0[_0x4ba966(0x394)]=_0x2d1981,_0x1358c0[_0x4ba966(0x197)](_0xbe6bc3,_0x3d9fa6,_0x45b656,_0x54a420),_0x1358c0[_0x4ba966(0x2ba)](_0x35f97e),this[_0x4ba966(0x53b)](_0x1358c0);if(this[_0x4ba966(0x2f2)])this[_0x4ba966(0x2f2)]['remove'](_0x1358c0);this[_0x4ba966(0x72b)]['push'](_0x1358c0);},Spriteset_Base['prototype'][_0x45f0a9(0x53b)]=function(_0x10a9aa){const _0x57c46a=_0x45f0a9;this[_0x57c46a(0x364)]['addChild'](_0x10a9aa);},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x2b2)]=function(_0x4b9d17){const _0x31854f=_0x45f0a9;this['_animationSprites'][_0x31854f(0x354)](_0x4b9d17),this['removeAnimationFromContainer'](_0x4b9d17);for(const _0x45c8dc of _0x4b9d17[_0x31854f(0x394)]){_0x45c8dc[_0x31854f(0x4bb)]&&_0x45c8dc[_0x31854f(0x4bb)]();}_0x4b9d17[_0x31854f(0x2bc)]();},Spriteset_Base[_0x45f0a9(0x7bc)]['removeFauxAnimation']=function(_0x259407){const _0x447f30=_0x45f0a9;this[_0x447f30(0x72b)][_0x447f30(0x354)](_0x259407),this[_0x447f30(0x31a)](_0x259407);for(const _0xa12a59 of _0x259407[_0x447f30(0x394)]){_0xa12a59[_0x447f30(0x4bb)]&&_0xa12a59[_0x447f30(0x4bb)]();}_0x259407[_0x447f30(0x2bc)]();},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x31a)]=function(_0x1de01e){const _0x1e8d71=_0x45f0a9;this[_0x1e8d71(0x364)][_0x1e8d71(0x732)](_0x1de01e);},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x4ce)]=function(){const _0x44b56c=_0x45f0a9;for(const _0x5a79be of this[_0x44b56c(0x72b)]){this[_0x44b56c(0x43a)](_0x5a79be);}},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x3ae)]=function(){const _0x4623d5=_0x45f0a9;return this[_0x4623d5(0x72b)]['length']>0x0;},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x691)]=function(){const _0x28b914=_0x45f0a9;for(const _0x5b7740 of this[_0x28b914(0x262)]){!_0x5b7740[_0x28b914(0x141)]()&&this[_0x28b914(0x63b)](_0x5b7740);}this[_0x28b914(0x386)]();},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x386)]=function(){const _0x35aa03=_0x45f0a9;for(;;){const _0x175435=$gameTemp['retrievePointAnimation']();if(_0x175435)this[_0x35aa03(0x258)](_0x175435);else break;}},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x258)]=function(_0x1a0124){const _0x370636=_0x45f0a9,_0x377a12=$dataAnimations[_0x1a0124['animationId']],_0x1bf885=this[_0x370636(0x862)](_0x1a0124),_0x3fc5de=_0x1a0124[_0x370636(0x430)],_0x546aaa=_0x1a0124[_0x370636(0x4a9)];let _0x1ccb8f=this[_0x370636(0x403)]();const _0x5aca02=this[_0x370636(0x454)]();if(this[_0x370636(0x48d)](_0x377a12))for(const _0x310887 of _0x1bf885){this[_0x370636(0x5e0)]([_0x310887],_0x377a12,_0x3fc5de,_0x1ccb8f,_0x546aaa),_0x1ccb8f+=_0x5aca02;}else this[_0x370636(0x5e0)](_0x1bf885,_0x377a12,_0x3fc5de,_0x1ccb8f,_0x546aaa);},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x862)]=function(_0x6f1e9e){const _0x352cbc=_0x45f0a9,_0x1221df=new Sprite_Clickable(),_0x4e8877=this[_0x352cbc(0x188)]();_0x1221df['x']=_0x6f1e9e['x']-_0x4e8877['x'],_0x1221df['y']=_0x6f1e9e['y']-_0x4e8877['y'],_0x1221df['z']=0x64;const _0x100c86=this[_0x352cbc(0x188)]();return _0x100c86['addChild'](_0x1221df),[_0x1221df];},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x188)]=function(){return this;},Spriteset_Map[_0x45f0a9(0x7bc)]['getPointAnimationLayer']=function(){const _0x2e7cce=_0x45f0a9;return this[_0x2e7cce(0x3ac)]||this;},Spriteset_Battle[_0x45f0a9(0x7bc)]['getPointAnimationLayer']=function(){const _0xb8677b=_0x45f0a9;return this[_0xb8677b(0x315)]||this;},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x5e0)]=function(_0x2e69a7,_0x480226,_0x3c5e9b,_0x29d26b,_0x260723){const _0x546bd2=_0x45f0a9,_0x33506f=this[_0x546bd2(0x872)](_0x480226),_0x266250=new(_0x33506f?Sprite_AnimationMV:Sprite_Animation)();_0x266250[_0x546bd2(0x394)]=_0x2e69a7,_0x266250[_0x546bd2(0x197)](_0x2e69a7,_0x480226,_0x3c5e9b,_0x29d26b),_0x266250[_0x546bd2(0x2ba)](_0x260723),this[_0x546bd2(0x53b)](_0x266250),this[_0x546bd2(0x262)]['push'](_0x266250);},Spriteset_Base['prototype'][_0x45f0a9(0x63b)]=function(_0x2d8f90){const _0x48d8f6=_0x45f0a9;this[_0x48d8f6(0x262)][_0x48d8f6(0x354)](_0x2d8f90),this[_0x48d8f6(0x364)]['removeChild'](_0x2d8f90);for(const _0x2963a3 of _0x2d8f90['targetObjects']){_0x2963a3[_0x48d8f6(0x4bb)]&&_0x2963a3['endAnimation']();const _0x47bacd=this['getPointAnimationLayer']();if(_0x47bacd)_0x47bacd[_0x48d8f6(0x732)](_0x2963a3);}_0x2d8f90['destroy']();},Spriteset_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x49f)]=function(){const _0x1b80c7=_0x45f0a9;for(const _0x4d2dc2 of this[_0x1b80c7(0x262)]){this[_0x1b80c7(0x63b)](_0x4d2dc2);}},Spriteset_Base['prototype'][_0x45f0a9(0x609)]=function(){const _0x13e56e=_0x45f0a9;return this[_0x13e56e(0x262)]['length']>0x0;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x7ac)]=Spriteset_Base['prototype'][_0x45f0a9(0x383)],Spriteset_Base['prototype'][_0x45f0a9(0x383)]=function(){const _0x3a7a03=_0x45f0a9;return VisuMZ[_0x3a7a03(0x601)][_0x3a7a03(0x7ac)]['call'](this)||this[_0x3a7a03(0x609)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x45f0a9(0x601)]['Settings']['QoL'][_0x45f0a9(0x4e9)]||![],VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x151)]=Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x448)],Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x448)]=function(){const _0x3497fc=_0x45f0a9;VisuMZ[_0x3497fc(0x601)]['Scene_Map_createSpriteset_detach'][_0x3497fc(0x573)](this);if(!Spriteset_Map[_0x3497fc(0x47e)])return;const _0x526ca3=this[_0x3497fc(0x29e)];if(!_0x526ca3)return;this['_pictureContainer']=_0x526ca3[_0x3497fc(0x847)];if(!this['_pictureContainer'])return;this[_0x3497fc(0x2c5)](this[_0x3497fc(0x847)]);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x6b3)]=Spriteset_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x8b6)],Spriteset_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x8b6)]=function(){const _0x2dcf93=_0x45f0a9;VisuMZ[_0x2dcf93(0x601)][_0x2dcf93(0x6b3)][_0x2dcf93(0x573)](this),this[_0x2dcf93(0x667)]();},Spriteset_Map[_0x45f0a9(0x7bc)]['createTileExtendSprites']=function(){const _0x2fb765=_0x45f0a9,_0x55585d=$gameMap[_0x2fb765(0x8a0)]();if(!_0x55585d)return;const _0x3a2cea=$gameMap[_0x2fb765(0x5b0)]();if(Object[_0x2fb765(0x890)](_0x3a2cea)[_0x2fb765(0x2ad)]<=0x0)return;const _0x247d43=$gameMap['tilesetFlags']();this['_tileExtendSprites']=this[_0x2fb765(0x24d)]||[];for(let _0x5986ff=0x0;_0x5986ff<$gameMap[_0x2fb765(0x2a5)]();_0x5986ff++){for(let _0x4d90a6=0x0;_0x4d90a6<$gameMap[_0x2fb765(0x4bc)]();_0x4d90a6++){for(const _0x42babe of $gameMap['layeredTiles'](_0x4d90a6,_0x5986ff)){const _0xf8282b=_0x247d43[_0x42babe]>>0xc,_0x29bc1e=_0x3a2cea[_0xf8282b]||0x0;if(_0x29bc1e<=0x0)continue;this['createExtendedTileSprite'](_0x4d90a6,_0x5986ff,_0x42babe,_0x29bc1e);}}}},Spriteset_Map[_0x45f0a9(0x7bc)]['removeTileExtendSprites']=function(){const _0x3f64b5=_0x45f0a9;this['_tileExtendSprites']=this['_tileExtendSprites']||[];for(const _0xc33908 of this['_tileExtendSprites']){this[_0x3f64b5(0x3ac)][_0x3f64b5(0x732)](_0xc33908);}this[_0x3f64b5(0x24d)]=[];},Spriteset_Map[_0x45f0a9(0x7bc)]['createExtendedTileSprite']=function(_0x398120,_0x1ea9a8,_0x429264,_0x679e14){const _0x4e4b4b=_0x45f0a9,_0x31fa0d=new Sprite_ExtendedTile(_0x398120,_0x1ea9a8,_0x429264,_0x679e14),_0x376dd1=$gameMap[_0x4e4b4b(0x8cd)]();_0x376dd1[_0x429264]&0x10?_0x31fa0d['z']=0x4:_0x31fa0d['z']=0x3,this['_tilemap']['addChild'](_0x31fa0d),this[_0x4e4b4b(0x24d)]['push'](_0x31fa0d);},VisuMZ[_0x45f0a9(0x601)]['Tilemap_addSpotTile']=Tilemap['prototype'][_0x45f0a9(0x23e)],Tilemap[_0x45f0a9(0x7bc)][_0x45f0a9(0x23e)]=function(_0x54922a,_0x4fc34f,_0x11e3c2){const _0x3153ef=_0x45f0a9;if($gameMap[_0x3153ef(0x308)](_0x54922a))return;VisuMZ[_0x3153ef(0x601)][_0x3153ef(0x756)]['call'](this,_0x54922a,_0x4fc34f,_0x11e3c2);},Spriteset_Battle[_0x45f0a9(0x47e)]=VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x8f1)][_0x45f0a9(0x240)]||![],VisuMZ[_0x45f0a9(0x601)]['Scene_Battle_createSpriteset_detach']=Scene_Battle[_0x45f0a9(0x7bc)][_0x45f0a9(0x448)],Scene_Battle[_0x45f0a9(0x7bc)]['createSpriteset']=function(){const _0x72a6ac=_0x45f0a9;VisuMZ[_0x72a6ac(0x601)][_0x72a6ac(0x8f7)][_0x72a6ac(0x573)](this);if(!Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;const _0x14be1b=this[_0x72a6ac(0x29e)];if(!_0x14be1b)return;this[_0x72a6ac(0x847)]=_0x14be1b['_pictureContainer'];if(!this[_0x72a6ac(0x847)])return;this[_0x72a6ac(0x2c5)](this[_0x72a6ac(0x847)]);},Spriteset_Battle[_0x45f0a9(0x7bc)]['createBackground']=function(){const _0x443a1f=_0x45f0a9;this[_0x443a1f(0x217)]=new PIXI[(_0x443a1f(0x6c4))][(_0x443a1f(0x179))](clamp=!![]),this[_0x443a1f(0x5df)]=new Sprite(),this[_0x443a1f(0x5df)][_0x443a1f(0x6e7)]=SceneManager['backgroundBitmap'](),this['_backgroundSprite']['filters']=[this['_backgroundFilter']],this[_0x443a1f(0x522)]['addChild'](this[_0x443a1f(0x5df)]);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4a5)]=Spriteset_Battle[_0x45f0a9(0x7bc)]['createEnemies'],Spriteset_Battle[_0x45f0a9(0x7bc)][_0x45f0a9(0x378)]=function(){const _0x6eb84b=_0x45f0a9;this[_0x6eb84b(0x69a)]()&&this[_0x6eb84b(0x445)](),VisuMZ['CoreEngine']['Spriteset_Battle_createEnemies'][_0x6eb84b(0x573)](this);},Spriteset_Battle['prototype'][_0x45f0a9(0x69a)]=function(){const _0x3843d0=_0x45f0a9,_0x23944a=VisuMZ[_0x3843d0(0x601)][_0x3843d0(0x5ba)][_0x3843d0(0x64b)];if(!_0x23944a)return![];if(Utils[_0x3843d0(0x4af)]>='1.3.0'&&!_0x23944a[_0x3843d0(0x710)])return![];if(Utils['RPGMAKER_VERSION']>='1.10.0'&&!_0x23944a[_0x3843d0(0x710)])return![];return _0x23944a[_0x3843d0(0x745)];},Spriteset_Battle[_0x45f0a9(0x7bc)][_0x45f0a9(0x445)]=function(){const _0x48206a=_0x45f0a9;for(member of $gameTroop[_0x48206a(0x1e9)]()){member[_0x48206a(0x4ec)]();}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x1c5)]=Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)],Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)]=function(_0x59686a){const _0x2b1904=_0x45f0a9;_0x59686a['x']=Math[_0x2b1904(0x640)](_0x59686a['x']),_0x59686a['y']=Math[_0x2b1904(0x640)](_0x59686a['y']),_0x59686a[_0x2b1904(0x4bc)]=Math[_0x2b1904(0x640)](_0x59686a['width']),_0x59686a[_0x2b1904(0x2a5)]=Math[_0x2b1904(0x640)](_0x59686a[_0x2b1904(0x2a5)]),this[_0x2b1904(0x73c)](),VisuMZ[_0x2b1904(0x601)][_0x2b1904(0x1c5)][_0x2b1904(0x573)](this,_0x59686a),this[_0x2b1904(0x2ff)]();},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x73c)]=function(){const _0x2a0ed5=_0x45f0a9;this['_digitGrouping']=VisuMZ['CoreEngine'][_0x2a0ed5(0x5ba)][_0x2a0ed5(0x8f1)][_0x2a0ed5(0x582)],this['_digitGroupingEx']=VisuMZ[_0x2a0ed5(0x601)][_0x2a0ed5(0x5ba)][_0x2a0ed5(0x8f1)][_0x2a0ed5(0x210)];},Window_Base['prototype']['lineHeight']=function(){const _0x40e47d=_0x45f0a9;return VisuMZ[_0x40e47d(0x601)][_0x40e47d(0x5ba)][_0x40e47d(0x74d)][_0x40e47d(0x794)];},Window_Base[_0x45f0a9(0x7bc)]['itemPadding']=function(){const _0x10aa18=_0x45f0a9;return VisuMZ[_0x10aa18(0x601)][_0x10aa18(0x5ba)][_0x10aa18(0x74d)][_0x10aa18(0x4bf)];},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x3ba)]=function(){const _0xcc8ec1=_0x45f0a9;$gameSystem['windowOpacity']?this[_0xcc8ec1(0x290)]=$gameSystem[_0xcc8ec1(0x3c1)]():this[_0xcc8ec1(0x290)]=VisuMZ[_0xcc8ec1(0x601)]['Settings'][_0xcc8ec1(0x74d)]['BackOpacity'];},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x8dc)]=function(){const _0x303d50=_0x45f0a9;return VisuMZ['CoreEngine'][_0x303d50(0x5ba)][_0x303d50(0x74d)]['TranslucentOpacity'];},Window_Base['prototype'][_0x45f0a9(0x331)]=function(){const _0x50944d=_0x45f0a9;return VisuMZ['CoreEngine'][_0x50944d(0x5ba)][_0x50944d(0x74d)][_0x50944d(0x6a8)];},VisuMZ['CoreEngine'][_0x45f0a9(0x2ef)]=Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)],Window_Base[_0x45f0a9(0x7bc)]['update']=function(){const _0x25865b=_0x45f0a9;VisuMZ[_0x25865b(0x601)][_0x25865b(0x2ef)]['call'](this),this[_0x25865b(0x67a)]();},Window_Base['prototype'][_0x45f0a9(0x623)]=function(){const _0xe39e8=_0x45f0a9;this[_0xe39e8(0x3e0)]&&(this[_0xe39e8(0x456)]+=this[_0xe39e8(0x331)](),this[_0xe39e8(0x4c7)]()&&(this[_0xe39e8(0x3e0)]=![]));},Window_Base[_0x45f0a9(0x7bc)]['updateClose']=function(){const _0x380e44=_0x45f0a9;this['_closing']&&(this[_0x380e44(0x456)]-=this['openingSpeed'](),this[_0x380e44(0x699)]()&&(this['_closing']=![]));},VisuMZ[_0x45f0a9(0x601)]['Window_Base_drawText']=Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x631)],Window_Base['prototype'][_0x45f0a9(0x631)]=function(_0x3fd3df,_0x387e8e,_0x12f328,_0x56448d,_0x47f8be){const _0x41e353=_0x45f0a9;if(this[_0x41e353(0x5cd)]())_0x3fd3df=VisuMZ[_0x41e353(0x294)](_0x3fd3df);VisuMZ['CoreEngine'][_0x41e353(0x607)][_0x41e353(0x573)](this,_0x3fd3df,_0x387e8e,_0x12f328,_0x56448d,_0x47f8be);},Window_Base['prototype'][_0x45f0a9(0x5cd)]=function(){return this['_digitGrouping'];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5c4)]=Window_Base[_0x45f0a9(0x7bc)]['createTextState'],Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x347)]=function(_0x239b03,_0x5e31e8,_0x23255d,_0x436be2){const _0x12dd2f=_0x45f0a9;var _0x3be1c9=VisuMZ['CoreEngine']['Window_Base_createTextState'][_0x12dd2f(0x573)](this,_0x239b03,_0x5e31e8,_0x23255d,_0x436be2);if(this['useDigitGroupingEx']())_0x3be1c9[_0x12dd2f(0x27e)]=String(VisuMZ['GroupDigits'](_0x3be1c9[_0x12dd2f(0x27e)]))||'';return _0x3be1c9;},Window_Base['prototype'][_0x45f0a9(0x6fb)]=function(){const _0x20aa22=_0x45f0a9;return this[_0x20aa22(0x177)];},Window_Base['prototype']['enableDigitGrouping']=function(_0x3a26cb){const _0x472ba4=_0x45f0a9;this[_0x472ba4(0x4d9)]=_0x3a26cb;},Window_Base[_0x45f0a9(0x7bc)]['enableDigitGroupingEx']=function(_0x48c632){const _0x3ccc2f=_0x45f0a9;this[_0x3ccc2f(0x177)]=_0x48c632;},VisuMZ['CoreEngine']['Window_Base_drawIcon']=Window_Base[_0x45f0a9(0x7bc)]['drawIcon'],Window_Base[_0x45f0a9(0x7bc)]['drawIcon']=function(_0x40b4b3,_0x16298d,_0x64c211){const _0x34722b=_0x45f0a9;_0x16298d=Math['round'](_0x16298d),_0x64c211=Math[_0x34722b(0x640)](_0x64c211),VisuMZ[_0x34722b(0x601)][_0x34722b(0x42b)][_0x34722b(0x573)](this,_0x40b4b3,_0x16298d,_0x64c211);},VisuMZ[_0x45f0a9(0x601)]['Window_Base_drawFace']=Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x475)],Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x475)]=function(_0x1e5f19,_0x3f758c,_0x628b9e,_0x261e98,_0x5bf8e2,_0x2e41ef){const _0xe1039=_0x45f0a9;_0x5bf8e2=_0x5bf8e2||ImageManager['faceWidth'],_0x2e41ef=_0x2e41ef||ImageManager[_0xe1039(0x5a0)],_0x628b9e=Math[_0xe1039(0x640)](_0x628b9e),_0x261e98=Math[_0xe1039(0x640)](_0x261e98),_0x5bf8e2=Math[_0xe1039(0x640)](_0x5bf8e2),_0x2e41ef=Math[_0xe1039(0x640)](_0x2e41ef),VisuMZ[_0xe1039(0x601)][_0xe1039(0x5da)][_0xe1039(0x573)](this,_0x1e5f19,_0x3f758c,_0x628b9e,_0x261e98,_0x5bf8e2,_0x2e41ef);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x1a5)]=Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x19f)],Window_Base['prototype']['drawCharacter']=function(_0x1812ed,_0x5ac9ed,_0x45da26,_0x22985d){const _0x26295d=_0x45f0a9;_0x45da26=Math[_0x26295d(0x640)](_0x45da26),_0x22985d=Math['round'](_0x22985d),VisuMZ[_0x26295d(0x601)][_0x26295d(0x1a5)]['call'](this,_0x1812ed,_0x5ac9ed,_0x45da26,_0x22985d);},VisuMZ['CoreEngine']['Window_Selectable_itemRect']=Window_Selectable[_0x45f0a9(0x7bc)]['itemRect'],Window_Selectable[_0x45f0a9(0x7bc)]['itemRect']=function(_0x2048d0){const _0x53aa81=_0x45f0a9;let _0x7871ae=VisuMZ['CoreEngine'][_0x53aa81(0x24e)][_0x53aa81(0x573)](this,_0x2048d0);return _0x7871ae['x']=Math['round'](_0x7871ae['x']),_0x7871ae['y']=Math[_0x53aa81(0x640)](_0x7871ae['y']),_0x7871ae[_0x53aa81(0x4bc)]=Math[_0x53aa81(0x640)](_0x7871ae[_0x53aa81(0x4bc)]),_0x7871ae[_0x53aa81(0x2a5)]=Math[_0x53aa81(0x640)](_0x7871ae[_0x53aa81(0x2a5)]),_0x7871ae;},VisuMZ['CoreEngine'][_0x45f0a9(0x29d)]=Window_StatusBase[_0x45f0a9(0x7bc)]['drawActorSimpleStatus'],Window_StatusBase['prototype'][_0x45f0a9(0x8b2)]=function(_0x1ba41e,_0x2ca18a,_0x3f04f9){const _0x1a9f5a=_0x45f0a9;_0x2ca18a=Math[_0x1a9f5a(0x640)](_0x2ca18a),_0x3f04f9=Math[_0x1a9f5a(0x640)](_0x3f04f9),VisuMZ[_0x1a9f5a(0x601)]['Window_StatusBase_drawActorSimpleStatus'][_0x1a9f5a(0x573)](this,_0x1ba41e,_0x2ca18a,_0x3f04f9);},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x2ff)]=function(){const _0x253917=_0x45f0a9;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x253917(0x329),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x253917(0x5e2)]['x'],'targetScaleY':this[_0x253917(0x5e2)]['y'],'targetOpacity':this[_0x253917(0x694)],'targetBackOpacity':this[_0x253917(0x290)],'targetContentsOpacity':this[_0x253917(0x75a)]};},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x67a)]=function(){const _0x2cd1d8=_0x45f0a9;if(!this[_0x2cd1d8(0x18d)])return;if(this[_0x2cd1d8(0x18d)][_0x2cd1d8(0x2d9)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x2cd1d8(0x18d)][_0x2cd1d8(0x41d)]),this['y']=this[_0x2cd1d8(0x7d4)](this['y'],this['_coreEasing'][_0x2cd1d8(0x79e)]),this[_0x2cd1d8(0x5e2)]['x']=this[_0x2cd1d8(0x7d4)](this[_0x2cd1d8(0x5e2)]['x'],this[_0x2cd1d8(0x18d)][_0x2cd1d8(0x613)]),this[_0x2cd1d8(0x5e2)]['y']=this[_0x2cd1d8(0x7d4)](this[_0x2cd1d8(0x5e2)]['y'],this['_coreEasing']['targetScaleY']),this[_0x2cd1d8(0x694)]=this['applyCoreEasing'](this[_0x2cd1d8(0x694)],this[_0x2cd1d8(0x18d)]['targetOpacity']),this['backOpacity']=this[_0x2cd1d8(0x7d4)](this['backOpacity'],this[_0x2cd1d8(0x18d)][_0x2cd1d8(0x34e)]),this[_0x2cd1d8(0x75a)]=this[_0x2cd1d8(0x7d4)](this[_0x2cd1d8(0x75a)],this[_0x2cd1d8(0x18d)][_0x2cd1d8(0x437)]),this[_0x2cd1d8(0x18d)][_0x2cd1d8(0x2d9)]--;},Window_Base['prototype']['applyCoreEasing']=function(_0x2ee54b,_0x3232a9){const _0x166255=_0x45f0a9;if(!this['_coreEasing'])return _0x3232a9;const _0x171e3c=this[_0x166255(0x18d)][_0x166255(0x2d9)],_0x114857=this['_coreEasing'][_0x166255(0x33b)],_0x4b1518=this[_0x166255(0x6e2)]((_0x114857-_0x171e3c)/_0x114857),_0x3db27f=this[_0x166255(0x6e2)]((_0x114857-_0x171e3c+0x1)/_0x114857),_0x1e8cc3=(_0x2ee54b-_0x3232a9*_0x4b1518)/(0x1-_0x4b1518);return _0x1e8cc3+(_0x3232a9-_0x1e8cc3)*_0x3db27f;},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x6e2)]=function(_0xa34e5a){const _0x1877ad=_0x45f0a9;if(!this['_coreEasing'])return _0xa34e5a;return VisuMZ[_0x1877ad(0x266)](_0xa34e5a,this[_0x1877ad(0x18d)][_0x1877ad(0x660)]||_0x1877ad(0x329));},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x60f)]=function(_0xf0f2c8,_0xcc082f){const _0x183dd1=_0x45f0a9;if(!this[_0x183dd1(0x18d)])return;this['x']=this[_0x183dd1(0x18d)][_0x183dd1(0x41d)],this['y']=this[_0x183dd1(0x18d)][_0x183dd1(0x79e)],this[_0x183dd1(0x5e2)]['x']=this[_0x183dd1(0x18d)]['targetScaleX'],this['scale']['y']=this['_coreEasing'][_0x183dd1(0x52c)],this['opacity']=this[_0x183dd1(0x18d)][_0x183dd1(0x228)],this[_0x183dd1(0x290)]=this['_coreEasing'][_0x183dd1(0x34e)],this[_0x183dd1(0x75a)]=this[_0x183dd1(0x18d)][_0x183dd1(0x437)],this[_0x183dd1(0x280)](_0xf0f2c8,_0xcc082f,this['x'],this['y'],this[_0x183dd1(0x5e2)]['x'],this['scale']['y'],this[_0x183dd1(0x694)],this[_0x183dd1(0x290)],this['contentsOpacity']);},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x280)]=function(_0x4cf1fe,_0x40eb4e,_0x45e6eb,_0xd43b00,_0xdc3841,_0x31f55a,_0x13b252,_0x3a4646,_0x449b1f){const _0x505fd8=_0x45f0a9;this[_0x505fd8(0x18d)]={'duration':_0x4cf1fe,'wholeDuration':_0x4cf1fe,'type':_0x40eb4e,'targetX':_0x45e6eb,'targetY':_0xd43b00,'targetScaleX':_0xdc3841,'targetScaleY':_0x31f55a,'targetOpacity':_0x13b252,'targetBackOpacity':_0x3a4646,'targetContentsOpacity':_0x449b1f};},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x405)]=function(_0x43173a,_0x3c4853,_0x464371,_0x15a0b9,_0x26fd3e){const _0x1de364=_0x45f0a9;this[_0x1de364(0x31f)](),this[_0x1de364(0x629)][_0x1de364(0x30c)]=VisuMZ[_0x1de364(0x601)]['Settings'][_0x1de364(0x187)][_0x1de364(0x35e)];const _0x54e638=VisuMZ[_0x1de364(0x601)][_0x1de364(0x5ba)]['Gold'][_0x1de364(0x813)];if(_0x54e638>0x0&&_0x3c4853===TextManager[_0x1de364(0x4fc)]){const _0x33e115=_0x15a0b9+(this[_0x1de364(0x59c)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x54e638,_0x464371+(_0x26fd3e-ImageManager['iconWidth']),_0x33e115),_0x26fd3e-=ImageManager[_0x1de364(0x6e8)]+0x4;}else this[_0x1de364(0x37b)](ColorManager[_0x1de364(0x849)]()),this[_0x1de364(0x631)](_0x3c4853,_0x464371,_0x15a0b9,_0x26fd3e,_0x1de364(0x7af)),_0x26fd3e-=this[_0x1de364(0x1f4)](_0x3c4853)+0x6;this[_0x1de364(0x885)]();const _0x53d948=this['textWidth'](this[_0x1de364(0x4d9)]?VisuMZ['GroupDigits'](_0x43173a):_0x43173a);_0x53d948>_0x26fd3e?this[_0x1de364(0x631)](VisuMZ[_0x1de364(0x601)][_0x1de364(0x5ba)][_0x1de364(0x187)]['GoldOverlap'],_0x464371,_0x15a0b9,_0x26fd3e,'right'):this[_0x1de364(0x631)](_0x43173a,_0x464371,_0x15a0b9,_0x26fd3e,_0x1de364(0x7af)),this['resetFontSettings']();},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x3f4)]=function(_0x292fa5,_0x344066,_0xb1367e,_0x488b4a,_0x3e9a7e){const _0x289b33=_0x45f0a9,_0x4edd91=ImageManager['loadSystem'](_0x289b33(0x692)),_0x3fabe8=ImageManager[_0x289b33(0x6e8)],_0x5377f5=ImageManager[_0x289b33(0x746)],_0x5f43a6=_0x292fa5%0x10*_0x3fabe8,_0x5cc136=Math[_0x289b33(0x5ae)](_0x292fa5/0x10)*_0x5377f5,_0x4ed461=_0x488b4a,_0x2e97c9=_0x488b4a;this[_0x289b33(0x629)][_0x289b33(0x826)]['imageSmoothingEnabled']=_0x3e9a7e,this['contents'][_0x289b33(0x86c)](_0x4edd91,_0x5f43a6,_0x5cc136,_0x3fabe8,_0x5377f5,_0x344066,_0xb1367e,_0x4ed461,_0x2e97c9),this[_0x289b33(0x629)][_0x289b33(0x826)]['imageSmoothingEnabled']=!![];},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x590)]=function(_0x3550ea,_0x278b7f,_0x4d59c7,_0x276596,_0x30f942,_0x3d3a33){const _0x3ca6bf=_0x45f0a9,_0x4f5746=Math[_0x3ca6bf(0x5ae)]((_0x4d59c7-0x2)*_0x276596),_0x18becc=Sprite_Gauge[_0x3ca6bf(0x7bc)]['gaugeHeight'][_0x3ca6bf(0x573)](this),_0x27de01=_0x278b7f+this['lineHeight']()-_0x18becc-0x2;this['contents'][_0x3ca6bf(0x6af)](_0x3550ea,_0x27de01,_0x4d59c7,_0x18becc,ColorManager[_0x3ca6bf(0x76d)]()),this[_0x3ca6bf(0x629)][_0x3ca6bf(0x1ea)](_0x3550ea+0x1,_0x27de01+0x1,_0x4f5746,_0x18becc-0x2,_0x30f942,_0x3d3a33);},Window_Scrollable[_0x45f0a9(0x2fc)]={'enabled':VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x74d)][_0x45f0a9(0x7aa)]??!![],'thickness':VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)]['Window'][_0x45f0a9(0x19d)]??0x2,'offset':VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x74d)][_0x45f0a9(0x85b)]??0x2,'bodyColor':VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x74d)]['BarBodyColor']??0x0,'offColor':VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)]['Window']['OffBarColor']??0x7,'offOpacity':VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x74d)]['OffBarOpacity']??0x80},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x7a3)]=function(){const _0x273f59=_0x45f0a9;return Window_Scrollable[_0x273f59(0x2fc)][_0x273f59(0x677)]&&Window_Scrollable['SCROLLBAR'][_0x273f59(0x79f)]>0x0;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4c2)]=Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x7c5)],Window_Base[_0x45f0a9(0x7bc)]['createContents']=function(){const _0x1807b1=_0x45f0a9;VisuMZ[_0x1807b1(0x601)][_0x1807b1(0x4c2)][_0x1807b1(0x573)](this),this[_0x1807b1(0x15b)](),this[_0x1807b1(0x5a8)](!![]),this[_0x1807b1(0x5a8)](![]);},Window_Base[_0x45f0a9(0x7bc)]['createScrollBarSprites']=function(){const _0x2b4a78=_0x45f0a9;if(!this[_0x2b4a78(0x7a3)]())return;if(this[_0x2b4a78(0x485)]||this[_0x2b4a78(0x4e6)])return;this['_lastScrollBarValues']={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0x2b4a78(0x4e6)]=new Sprite(),this[_0x2b4a78(0x2c5)](this[_0x2b4a78(0x485)]),this[_0x2b4a78(0x2c5)](this[_0x2b4a78(0x4e6)]);},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x5a8)]=function(_0x2a0b69){const _0x9306a8=_0x45f0a9,_0x3658dd=_0x2a0b69?this[_0x9306a8(0x485)]:this['_scrollBarVert'];if(!_0x3658dd)return;const _0x2b6d85=Window_Scrollable[_0x9306a8(0x2fc)],_0x19516f=_0x2b6d85[_0x9306a8(0x79f)],_0x4be705=_0x2a0b69?this[_0x9306a8(0x136)]-_0x19516f*0x2:_0x19516f,_0x28c4d8=_0x2a0b69?_0x19516f:this[_0x9306a8(0x65a)]-_0x19516f*0x2;_0x3658dd[_0x9306a8(0x6e7)]=new Bitmap(_0x4be705,_0x28c4d8),_0x3658dd['setFrame'](0x0,0x0,_0x4be705,_0x28c4d8),this[_0x9306a8(0x71a)](_0x2a0b69);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x1b5)]=Window_Base['prototype'][_0x45f0a9(0x21f)],Window_Base['prototype'][_0x45f0a9(0x21f)]=function(){const _0x450e5c=_0x45f0a9;VisuMZ['CoreEngine'][_0x450e5c(0x1b5)]['call'](this),this[_0x450e5c(0x8d2)]();},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x8d2)]=function(){const _0x5b2ab9=_0x45f0a9,_0x10355b=[this[_0x5b2ab9(0x485)],this[_0x5b2ab9(0x4e6)]];for(const _0x1bdb2a of _0x10355b){if(_0x1bdb2a&&_0x1bdb2a[_0x5b2ab9(0x6e7)])_0x1bdb2a['bitmap']['destroy']();}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x47a)]=Window_Scrollable[_0x45f0a9(0x7bc)]['update'],Window_Scrollable[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)]=function(){const _0x3b30c8=_0x45f0a9;VisuMZ[_0x3b30c8(0x601)]['Window_Scrollable_update'][_0x3b30c8(0x573)](this),this[_0x3b30c8(0x1d6)]();},Window_Scrollable[_0x45f0a9(0x7bc)]['updateScrollBars']=function(){const _0x59ba98=_0x45f0a9;this[_0x59ba98(0x1cc)](),this[_0x59ba98(0x15d)](!![]),this[_0x59ba98(0x15d)](![]),this['updateScrollBarPosition'](!![]),this[_0x59ba98(0x71a)](![]);},Window_Scrollable[_0x45f0a9(0x7bc)][_0x45f0a9(0x1cc)]=function(){const _0x21c9e1=_0x45f0a9,_0x57c0be=[this['_scrollBarHorz'],this[_0x21c9e1(0x4e6)]];for(const _0x5b1c1f of _0x57c0be){_0x5b1c1f&&(_0x5b1c1f[_0x21c9e1(0x470)]=this[_0x21c9e1(0x7a3)]()&&this[_0x21c9e1(0x4c7)]());}},Window_Scrollable[_0x45f0a9(0x7bc)][_0x45f0a9(0x15d)]=function(_0x2a815e){const _0x2f17b1=_0x45f0a9;if(!this[_0x2f17b1(0x4d5)])return;const _0x4fdd70=this[_0x2f17b1(0x41c)](_0x2a815e),_0x1a9a52=this[_0x2f17b1(0x860)](_0x2a815e),_0xac46bb=_0x2a815e?_0x2f17b1(0x35a):_0x2f17b1(0x235),_0x31bbfe=_0x2a815e?_0x2f17b1(0x1db):_0x2f17b1(0x3c7);(this[_0x2f17b1(0x4d5)][_0xac46bb]!==_0x4fdd70||this['_lastScrollBarValues'][_0x31bbfe]!==_0x1a9a52)&&(this[_0x2f17b1(0x4d5)][_0xac46bb]=_0x4fdd70,this[_0x2f17b1(0x4d5)][_0x31bbfe]=_0x1a9a52,this[_0x2f17b1(0x5c1)](_0x2a815e,_0x4fdd70,_0x1a9a52));},Window_Scrollable[_0x45f0a9(0x7bc)][_0x45f0a9(0x41c)]=function(_0x5b0396){const _0x4645ff=_0x45f0a9;if(this[_0x4645ff(0x21e)]!==undefined)return _0x5b0396?this[_0x4645ff(0x494)]():this[_0x4645ff(0x207)]['y'];return _0x5b0396?this[_0x4645ff(0x494)]():this['scrollY']();},Window_Scrollable['prototype'][_0x45f0a9(0x860)]=function(_0x2d75e8){const _0x400dd7=_0x45f0a9;if(this[_0x400dd7(0x21e)]!==undefined)return _0x2d75e8?this[_0x400dd7(0x1c8)]():Math[_0x400dd7(0x5dc)](0x0,this[_0x400dd7(0x21e)]-this[_0x400dd7(0x65a)]);return _0x2d75e8?this[_0x400dd7(0x1c8)]():this[_0x400dd7(0x340)]();},Window_Scrollable[_0x45f0a9(0x7bc)][_0x45f0a9(0x632)]=function(){const _0x2bdcf1=_0x45f0a9;if(this[_0x2bdcf1(0x21e)]!==undefined)return Math['max'](0x0,this[_0x2bdcf1(0x21e)]);return this[_0x2bdcf1(0x822)]();},Window_Scrollable['prototype']['refreshScrollBarBitmap']=function(_0x588004,_0x18ddf4,_0x4c3480){const _0x32cbbd=_0x45f0a9,_0x4c7e56=_0x588004?this['_scrollBarHorz']:this[_0x32cbbd(0x4e6)];if(!_0x4c7e56)return;if(!_0x4c7e56[_0x32cbbd(0x6e7)])return;const _0x2b7411=_0x4c7e56[_0x32cbbd(0x6e7)];_0x2b7411['clear']();if(_0x4c3480<=0x0)return;const _0x29855b=_0x588004?this[_0x32cbbd(0x136)]/this[_0x32cbbd(0x540)]():this['innerHeight']/this[_0x32cbbd(0x632)](),_0x43ad5f=_0x588004?Math[_0x32cbbd(0x640)](_0x18ddf4*_0x29855b):0x0,_0x528779=_0x588004?0x0:Math[_0x32cbbd(0x640)](_0x18ddf4*_0x29855b),_0xfae344=_0x588004?Math[_0x32cbbd(0x640)](_0x2b7411[_0x32cbbd(0x4bc)]*_0x29855b):_0x2b7411[_0x32cbbd(0x4bc)],_0x3bcb13=_0x588004?_0x2b7411[_0x32cbbd(0x2a5)]:Math['round'](_0x2b7411[_0x32cbbd(0x2a5)]*_0x29855b),_0x198149=Window_Scrollable['SCROLLBAR'],_0x567036=ColorManager['getColor'](_0x198149[_0x32cbbd(0x60c)]),_0x23c9bf=ColorManager[_0x32cbbd(0x1f8)](_0x198149[_0x32cbbd(0x603)]),_0x398ea8=_0x198149[_0x32cbbd(0x736)];_0x2b7411[_0x32cbbd(0x312)]=_0x398ea8,_0x2b7411[_0x32cbbd(0x22d)](_0x567036),_0x2b7411[_0x32cbbd(0x312)]=0xff,_0x2b7411[_0x32cbbd(0x6af)](_0x43ad5f,_0x528779,_0xfae344,_0x3bcb13,_0x23c9bf);},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x71a)]=function(_0xbbcae5){const _0x2f8b99=_0x45f0a9,_0x1b5bd0=_0xbbcae5?this[_0x2f8b99(0x485)]:this[_0x2f8b99(0x4e6)];if(!_0x1b5bd0)return;const _0x123ad3=Window_Scrollable[_0x2f8b99(0x2fc)],_0x432865=_0x123ad3['thickness'],_0x16c4e4=_0x123ad3['offset'];if(!_0x1b5bd0['transform'])return;_0x1b5bd0['x']=this[_0x2f8b99(0x56e)]+(_0xbbcae5?_0x432865:this[_0x2f8b99(0x136)]+_0x16c4e4),_0x1b5bd0['y']=this[_0x2f8b99(0x56e)]+(_0xbbcae5?this[_0x2f8b99(0x65a)]+_0x16c4e4:_0x432865);},Window_Selectable[_0x45f0a9(0x7bc)][_0x45f0a9(0x2b0)]=function(_0x2017cc){const _0x1b6a9a=_0x45f0a9;let _0x45edea=this['index']();const _0x54f49a=this['maxItems'](),_0x17f4bb=this[_0x1b6a9a(0x68b)]();if(this['isUseModernControls']()&&(_0x45edea<_0x54f49a||_0x2017cc&&_0x17f4bb===0x1)){_0x45edea+=_0x17f4bb;if(_0x45edea>=_0x54f49a)_0x45edea=_0x54f49a-0x1;this[_0x1b6a9a(0x743)](_0x45edea);}else!this[_0x1b6a9a(0x62c)]()&&((_0x45edea<_0x54f49a-_0x17f4bb||_0x2017cc&&_0x17f4bb===0x1)&&this[_0x1b6a9a(0x743)]((_0x45edea+_0x17f4bb)%_0x54f49a));},VisuMZ['CoreEngine'][_0x45f0a9(0x59a)]=Window_Selectable[_0x45f0a9(0x7bc)][_0x45f0a9(0x2b0)],Window_Selectable[_0x45f0a9(0x7bc)]['cursorDown']=function(_0x3ab989){const _0x12b94d=_0x45f0a9;this['isUseModernControls']()&&_0x3ab989&&this[_0x12b94d(0x68b)]()===0x1&&this['index']()===this['maxItems']()-0x1?this[_0x12b94d(0x743)](0x0):VisuMZ[_0x12b94d(0x601)][_0x12b94d(0x59a)][_0x12b94d(0x573)](this,_0x3ab989);},Window_Selectable['prototype']['cursorUp']=function(_0x37c152){const _0x53167f=_0x45f0a9;let _0x5a157=Math[_0x53167f(0x5dc)](0x0,this[_0x53167f(0x147)]());const _0x497335=this[_0x53167f(0x33f)](),_0x19ed32=this[_0x53167f(0x68b)]();if(this[_0x53167f(0x62c)]()&&_0x5a157>0x0||_0x37c152&&_0x19ed32===0x1){_0x5a157-=_0x19ed32;if(_0x5a157<=0x0)_0x5a157=0x0;this['smoothSelect'](_0x5a157);}else!this[_0x53167f(0x62c)]()&&((_0x5a157>=_0x19ed32||_0x37c152&&_0x19ed32===0x1)&&this[_0x53167f(0x743)]((_0x5a157-_0x19ed32+_0x497335)%_0x497335));},VisuMZ['CoreEngine']['Window_Selectable_cursorUp']=Window_Selectable['prototype']['cursorUp'],Window_Selectable[_0x45f0a9(0x7bc)][_0x45f0a9(0x224)]=function(_0x41dece){const _0x1d49ca=_0x45f0a9;this[_0x1d49ca(0x62c)]()&&_0x41dece&&this['maxCols']()===0x1&&this[_0x1d49ca(0x147)]()===0x0?this[_0x1d49ca(0x743)](this[_0x1d49ca(0x33f)]()-0x1):VisuMZ[_0x1d49ca(0x601)][_0x1d49ca(0x1b0)][_0x1d49ca(0x573)](this,_0x41dece);},Window_Selectable[_0x45f0a9(0x7bc)][_0x45f0a9(0x62c)]=function(){const _0xdfade3=_0x45f0a9;return VisuMZ['CoreEngine'][_0xdfade3(0x5ba)]['QoL'][_0xdfade3(0x6fd)];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x211)]=Window_Selectable[_0x45f0a9(0x7bc)]['processCursorMove'],Window_Selectable[_0x45f0a9(0x7bc)][_0x45f0a9(0x1d2)]=function(){const _0x43c002=_0x45f0a9;this['isUseModernControls']()?(this['processCursorMoveModernControls'](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x43c002(0x601)][_0x43c002(0x211)][_0x43c002(0x573)](this);},Window_Selectable['prototype'][_0x45f0a9(0x13d)]=function(){return!![];},Window_Selectable['prototype']['processCursorMoveModernControls']=function(){const _0x5dedf4=_0x45f0a9;if(this[_0x5dedf4(0x65c)]()){const _0x51c982=this[_0x5dedf4(0x147)]();Input[_0x5dedf4(0x44b)]('down')&&(Input['isPressed'](_0x5dedf4(0x491))&&this[_0x5dedf4(0x13d)]()?this[_0x5dedf4(0x4ea)]():this[_0x5dedf4(0x2b0)](Input[_0x5dedf4(0x7ef)](_0x5dedf4(0x6de)))),Input[_0x5dedf4(0x44b)]('up')&&(Input['isPressed']('shift')&&this[_0x5dedf4(0x13d)]()?this[_0x5dedf4(0x124)]():this[_0x5dedf4(0x224)](Input[_0x5dedf4(0x7ef)]('up'))),Input[_0x5dedf4(0x44b)]('right')&&this[_0x5dedf4(0x511)](Input[_0x5dedf4(0x7ef)](_0x5dedf4(0x7af))),Input[_0x5dedf4(0x44b)](_0x5dedf4(0x902))&&this[_0x5dedf4(0x5b4)](Input[_0x5dedf4(0x7ef)](_0x5dedf4(0x902))),!this['isHandled'](_0x5dedf4(0x8ef))&&Input[_0x5dedf4(0x44b)](_0x5dedf4(0x8ef))&&this[_0x5dedf4(0x4ea)](),!this['isHandled'](_0x5dedf4(0x234))&&Input[_0x5dedf4(0x44b)](_0x5dedf4(0x234))&&this[_0x5dedf4(0x124)](),this[_0x5dedf4(0x147)]()!==_0x51c982&&this[_0x5dedf4(0x572)]();}},Window_Selectable[_0x45f0a9(0x7bc)][_0x45f0a9(0x4ad)]=function(){const _0x38eeab=_0x45f0a9;if(this['isCursorMovable']()){const _0x4c2b70=this[_0x38eeab(0x147)]();Input[_0x38eeab(0x7ef)]('home')&&this['smoothSelect'](Math['min'](this[_0x38eeab(0x147)](),0x0)),Input[_0x38eeab(0x7ef)](_0x38eeab(0x783))&&this['smoothSelect'](Math[_0x38eeab(0x5dc)](this[_0x38eeab(0x147)](),this[_0x38eeab(0x33f)]()-0x1)),this['index']()!==_0x4c2b70&&this['playCursorSound']();}},VisuMZ['CoreEngine'][_0x45f0a9(0x764)]=Window_Selectable[_0x45f0a9(0x7bc)][_0x45f0a9(0x698)],Window_Selectable[_0x45f0a9(0x7bc)][_0x45f0a9(0x698)]=function(){const _0xc27abd=_0x45f0a9;this[_0xc27abd(0x62c)]()?this[_0xc27abd(0x4c1)]():VisuMZ['CoreEngine'][_0xc27abd(0x764)]['call'](this);},Window_Selectable[_0x45f0a9(0x7bc)]['processTouchModernControls']=function(){const _0x28abd2=_0x45f0a9;VisuMZ[_0x28abd2(0x601)][_0x28abd2(0x764)]['call'](this);},Window_Selectable[_0x45f0a9(0x7bc)][_0x45f0a9(0x33a)]=function(){const _0x2c0714=_0x45f0a9;return VisuMZ[_0x2c0714(0x601)][_0x2c0714(0x5ba)]['Window'][_0x2c0714(0x8c0)];},Window_Selectable['prototype']['rowSpacing']=function(){const _0x522b83=_0x45f0a9;return VisuMZ[_0x522b83(0x601)]['Settings'][_0x522b83(0x74d)]['RowSpacing'];},Window_Selectable['prototype'][_0x45f0a9(0x173)]=function(){const _0x2cd999=_0x45f0a9;return Window_Scrollable[_0x2cd999(0x7bc)][_0x2cd999(0x173)][_0x2cd999(0x573)](this)+VisuMZ[_0x2cd999(0x601)][_0x2cd999(0x5ba)][_0x2cd999(0x74d)][_0x2cd999(0x128)];;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x703)]=Window_Selectable[_0x45f0a9(0x7bc)][_0x45f0a9(0x362)],Window_Selectable[_0x45f0a9(0x7bc)]['drawBackgroundRect']=function(_0x1bafd6){const _0x969fc3=_0x45f0a9,_0x27d591=VisuMZ[_0x969fc3(0x601)][_0x969fc3(0x5ba)][_0x969fc3(0x74d)];if(_0x27d591['ShowItemBackground']===![])return;_0x27d591[_0x969fc3(0x901)]?_0x27d591[_0x969fc3(0x901)][_0x969fc3(0x573)](this,_0x1bafd6):VisuMZ[_0x969fc3(0x601)][_0x969fc3(0x703)][_0x969fc3(0x573)](this,_0x1bafd6);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4c3)]=Window_Gold['prototype'][_0x45f0a9(0x302)],Window_Gold['prototype'][_0x45f0a9(0x302)]=function(){const _0x14f081=_0x45f0a9;this[_0x14f081(0x11a)]()?this['drawGoldItemStyle']():VisuMZ['CoreEngine'][_0x14f081(0x4c3)]['call'](this);},Window_Gold[_0x45f0a9(0x7bc)][_0x45f0a9(0x11a)]=function(){const _0x49d308=_0x45f0a9;if(TextManager[_0x49d308(0x4fc)]!==this[_0x49d308(0x4fc)]())return![];return VisuMZ[_0x49d308(0x601)][_0x49d308(0x5ba)][_0x49d308(0x187)][_0x49d308(0x679)];},Window_Gold['prototype']['drawGoldItemStyle']=function(){const _0x25206f=_0x45f0a9;this['resetFontSettings'](),this[_0x25206f(0x629)][_0x25206f(0x1d9)](),this[_0x25206f(0x629)][_0x25206f(0x30c)]=VisuMZ['CoreEngine'][_0x25206f(0x5ba)][_0x25206f(0x187)]['GoldFontSize'];const _0x25210e=VisuMZ['CoreEngine'][_0x25206f(0x5ba)][_0x25206f(0x187)][_0x25206f(0x813)],_0x2297a5=this['itemLineRect'](0x0);if(_0x25210e>0x0){const _0x58829e=ImageManager[_0x25206f(0x706)]||0x20,_0x546859=_0x58829e-ImageManager[_0x25206f(0x6e8)],_0xd84541=_0x2297a5['y']+(this['lineHeight']()-ImageManager[_0x25206f(0x746)])/0x2;this[_0x25206f(0x2df)](_0x25210e,_0x2297a5['x']+Math[_0x25206f(0x7b9)](_0x546859/0x2),_0xd84541);const _0x3bce3b=_0x58829e+0x4;_0x2297a5['x']+=_0x3bce3b,_0x2297a5[_0x25206f(0x4bc)]-=_0x3bce3b;}this['changeTextColor'](ColorManager[_0x25206f(0x849)]()),this[_0x25206f(0x631)](this['currencyUnit'](),_0x2297a5['x'],_0x2297a5['y'],_0x2297a5['width'],_0x25206f(0x902));const _0x12f865=this[_0x25206f(0x1f4)](this['currencyUnit']())+0x6;;_0x2297a5['x']+=_0x12f865,_0x2297a5['width']-=_0x12f865,this['resetTextColor']();const _0x383b6e=this[_0x25206f(0x11e)](),_0x155a39=this['textWidth'](this[_0x25206f(0x4d9)]?VisuMZ[_0x25206f(0x294)](this[_0x25206f(0x11e)]()):this['value']());_0x155a39>_0x2297a5[_0x25206f(0x4bc)]?this[_0x25206f(0x631)](VisuMZ[_0x25206f(0x601)][_0x25206f(0x5ba)][_0x25206f(0x187)][_0x25206f(0x722)],_0x2297a5['x'],_0x2297a5['y'],_0x2297a5[_0x25206f(0x4bc)],_0x25206f(0x7af)):this['drawText'](this[_0x25206f(0x11e)](),_0x2297a5['x'],_0x2297a5['y'],_0x2297a5[_0x25206f(0x4bc)],_0x25206f(0x7af)),this[_0x25206f(0x31f)]();},Window_StatusBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x684)]=function(_0x2c07c1,_0x522835,_0x216924,_0x1ae90d,_0x42db62){const _0x209dde=_0x45f0a9;_0x1ae90d=String(_0x1ae90d||'')['toUpperCase']();if(VisuMZ['CoreEngine'][_0x209dde(0x5ba)][_0x209dde(0x6ca)][_0x209dde(0x398)]){const _0x1904db=VisuMZ[_0x209dde(0x664)](_0x1ae90d);if(_0x42db62)this[_0x209dde(0x3f4)](_0x1904db,_0x2c07c1,_0x522835,this['gaugeLineHeight']()),_0x216924-=this[_0x209dde(0x837)]()+0x2,_0x2c07c1+=this[_0x209dde(0x837)]()+0x2;else{const _0x48a0b4=ImageManager[_0x209dde(0x706)]||0x20,_0x4a6be9=ImageManager[_0x209dde(0x8c9)]||0x20,_0x1260aa=_0x48a0b4-ImageManager[_0x209dde(0x6e8)],_0xe604cd=_0x4a6be9-ImageManager[_0x209dde(0x746)];let _0x878851=0x2,_0x18b723=0x2;this['lineHeight']()!==0x24&&(_0x18b723=Math[_0x209dde(0x5ae)]((this[_0x209dde(0x59c)]()-_0x4a6be9)/0x2));const _0x66c776=_0x2c07c1+Math[_0x209dde(0x5ae)](_0x1260aa/0x2)+_0x878851,_0x59d86=_0x522835+Math[_0x209dde(0x5ae)](_0xe604cd/0x2)+_0x18b723;this[_0x209dde(0x2df)](_0x1904db,_0x66c776,_0x59d86),_0x216924-=_0x48a0b4+0x4,_0x2c07c1+=_0x48a0b4+0x4;}}const _0x314793=TextManager['param'](_0x1ae90d);this['resetFontSettings'](),this['changeTextColor'](ColorManager['systemColor']()),_0x42db62?(this[_0x209dde(0x629)][_0x209dde(0x30c)]=this[_0x209dde(0x376)](),this[_0x209dde(0x629)][_0x209dde(0x631)](_0x314793,_0x2c07c1,_0x522835,_0x216924,this[_0x209dde(0x837)](),'left')):this[_0x209dde(0x631)](_0x314793,_0x2c07c1,_0x522835,_0x216924),this['resetFontSettings']();},Window_StatusBase['prototype'][_0x45f0a9(0x376)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x392)]=function(_0x11f897,_0xca8e8,_0x4ff4a8,_0x4236de){const _0x25502c=_0x45f0a9;_0x4236de=_0x4236de||0xa8,this[_0x25502c(0x885)]();if(VisuMZ[_0x25502c(0x601)][_0x25502c(0x5ba)]['UI']['TextCodeClassNames'])this[_0x25502c(0x17e)](_0x11f897[_0x25502c(0x6be)]()[_0x25502c(0x3d0)],_0xca8e8,_0x4ff4a8,_0x4236de);else{const _0x24c5fe=_0x11f897['currentClass']()['name']['replace'](/\\I\[(\d+)\]/gi,'');this[_0x25502c(0x631)](_0x24c5fe,_0xca8e8,_0x4ff4a8,_0x4236de);}},Window_StatusBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x802)]=function(_0xab8aa8,_0x4e62bc,_0x4f5c59,_0x2bd686){const _0x295e90=_0x45f0a9;_0x2bd686=_0x2bd686||0x10e,this['resetTextColor']();if(VisuMZ['CoreEngine'][_0x295e90(0x5ba)]['UI'][_0x295e90(0x352)])this['drawTextEx'](_0xab8aa8['nickname'](),_0x4e62bc,_0x4f5c59,_0x2bd686);else{const _0x452b7d=_0xab8aa8['nickname']()['replace'](/\\I\[(\d+)\]/gi,'');this['drawText'](_0xab8aa8['nickname'](),_0x4e62bc,_0x4f5c59,_0x2bd686);}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x3db)]=Window_StatusBase['prototype'][_0x45f0a9(0x342)],Window_StatusBase[_0x45f0a9(0x7bc)]['drawActorLevel']=function(_0x3f1d8e,_0x13e512,_0x2c209f){const _0x26c825=_0x45f0a9;if(VisuMZ['CoreEngine']['Settings']['Param']['ShowActorLevel']===![])return;if(this[_0x26c825(0x2e6)]())this['drawActorExpGauge'](_0x3f1d8e,_0x13e512,_0x2c209f);VisuMZ[_0x26c825(0x601)][_0x26c825(0x3db)][_0x26c825(0x573)](this,_0x3f1d8e,_0x13e512,_0x2c209f);},Window_StatusBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x2e6)]=function(){const _0x12c04e=_0x45f0a9;return VisuMZ['CoreEngine'][_0x12c04e(0x5ba)]['UI'][_0x12c04e(0x646)];},Window_StatusBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x8c2)]=function(_0x2c88c6,_0x50895b,_0x3842fc){const _0x404ba7=_0x45f0a9;if(!_0x2c88c6)return;if(!_0x2c88c6['isActor']())return;const _0x2ec7d5=0x80,_0x4e0589=_0x2c88c6[_0x404ba7(0x6df)]();let _0x5251d9=ColorManager[_0x404ba7(0x59f)](),_0xeb1a93=ColorManager['expGaugeColor2']();_0x4e0589>=0x1&&(_0x5251d9=ColorManager[_0x404ba7(0x425)](),_0xeb1a93=ColorManager[_0x404ba7(0x3cd)]()),this[_0x404ba7(0x590)](_0x50895b,_0x3842fc,_0x2ec7d5,_0x4e0589,_0x5251d9,_0xeb1a93);},Window_EquipStatus[_0x45f0a9(0x7bc)][_0x45f0a9(0x7a0)]=function(){const _0x4d909b=_0x45f0a9;let _0x460822=0x0;for(const _0x24fc18 of VisuMZ[_0x4d909b(0x601)][_0x4d909b(0x5ba)][_0x4d909b(0x6ca)][_0x4d909b(0x3c0)]){const _0x3f181a=this['itemPadding'](),_0x25e6fd=this[_0x4d909b(0x47b)](_0x460822);this[_0x4d909b(0x487)](_0x3f181a,_0x25e6fd,_0x24fc18),_0x460822++;}},Window_EquipStatus['prototype']['drawParamName']=function(_0x4bc9f7,_0xb57ce2,_0x382104){const _0x4464fe=_0x45f0a9,_0x525061=this[_0x4464fe(0x6ba)]()-this[_0x4464fe(0x58b)]()*0x2;this[_0x4464fe(0x684)](_0x4bc9f7,_0xb57ce2,_0x525061,_0x382104,![]);},Window_EquipStatus[_0x45f0a9(0x7bc)][_0x45f0a9(0x3ff)]=function(_0x31f107,_0x18186b,_0x167342){const _0x3084ca=_0x45f0a9,_0xd0a327=this['paramWidth']();this[_0x3084ca(0x885)](),this['drawText'](this[_0x3084ca(0x828)][_0x3084ca(0x6cb)](_0x167342,!![]),_0x31f107,_0x18186b,_0xd0a327,_0x3084ca(0x7af));},Window_EquipStatus['prototype']['drawRightArrow']=function(_0x224a81,_0x554263){const _0x460647=_0x45f0a9,_0x3b733d=this['rightArrowWidth']();this[_0x460647(0x37b)](ColorManager[_0x460647(0x849)]());const _0x18961d=VisuMZ['CoreEngine'][_0x460647(0x5ba)]['UI'][_0x460647(0x763)];this[_0x460647(0x631)](_0x18961d,_0x224a81,_0x554263,_0x3b733d,_0x460647(0x76a));},Window_EquipStatus[_0x45f0a9(0x7bc)][_0x45f0a9(0x1ad)]=function(_0x224d05,_0x4a8542,_0x6a2666){const _0x2d8ded=_0x45f0a9,_0x29f8bd=this[_0x2d8ded(0x6fc)](),_0xdb7aeb=this[_0x2d8ded(0x2b9)][_0x2d8ded(0x6cb)](_0x6a2666),_0x3cb3d1=_0xdb7aeb-this[_0x2d8ded(0x828)]['paramValueByName'](_0x6a2666);this[_0x2d8ded(0x37b)](ColorManager[_0x2d8ded(0x4ed)](_0x3cb3d1)),this[_0x2d8ded(0x631)](this['_tempActor'][_0x2d8ded(0x6cb)](_0x6a2666,!![]),_0x224d05,_0x4a8542,_0x29f8bd,_0x2d8ded(0x7af));},VisuMZ['CoreEngine'][_0x45f0a9(0x78d)]=Window_EquipItem['prototype'][_0x45f0a9(0x363)],Window_EquipItem[_0x45f0a9(0x7bc)][_0x45f0a9(0x363)]=function(_0x864d69){const _0x3f2706=_0x45f0a9;return _0x864d69&&this[_0x3f2706(0x828)]?this['_actor'][_0x3f2706(0x79c)](_0x864d69):VisuMZ['CoreEngine']['Window_EquipItem_isEnabled'][_0x3f2706(0x573)](this,_0x864d69);},Window_StatusParams[_0x45f0a9(0x7bc)][_0x45f0a9(0x33f)]=function(){const _0x5c15c8=_0x45f0a9;return VisuMZ[_0x5c15c8(0x601)]['Settings']['Param']['DisplayedParams'][_0x5c15c8(0x2ad)];},Window_StatusParams[_0x45f0a9(0x7bc)]['drawItem']=function(_0x5f2529){const _0x1f7cb8=_0x45f0a9,_0x3fcd5c=this['itemLineRect'](_0x5f2529),_0x455a57=VisuMZ['CoreEngine'][_0x1f7cb8(0x5ba)]['Param']['DisplayedParams'][_0x5f2529],_0x5b3231=TextManager[_0x1f7cb8(0x1a7)](_0x455a57),_0x3e0f24=this[_0x1f7cb8(0x828)][_0x1f7cb8(0x6cb)](_0x455a57,!![]);this[_0x1f7cb8(0x684)](_0x3fcd5c['x'],_0x3fcd5c['y'],0xa0,_0x455a57,![]),this[_0x1f7cb8(0x885)](),this[_0x1f7cb8(0x631)](_0x3e0f24,_0x3fcd5c['x']+0xa0,_0x3fcd5c['y'],0x3c,'right');};if(VisuMZ[_0x45f0a9(0x601)]['Settings'][_0x45f0a9(0x395)][_0x45f0a9(0x143)]){VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)]['KeyboardInput'][_0x45f0a9(0x2b6)]&&(Window_NameInput[_0x45f0a9(0x3e5)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x3de)]=Window_NameInput[_0x45f0a9(0x7bc)]['initialize'],Window_NameInput['prototype'][_0x45f0a9(0x73f)]=function(_0x378a65){const _0x4ea664=_0x45f0a9;this[_0x4ea664(0x8e3)]=this[_0x4ea664(0x2ac)](),VisuMZ[_0x4ea664(0x601)][_0x4ea664(0x3de)]['call'](this,_0x378a65),this['_mode']===_0x4ea664(0x6e0)?this[_0x4ea664(0x649)](0x0):(Input[_0x4ea664(0x1d9)](),this[_0x4ea664(0x7dd)]());},Window_NameInput['prototype'][_0x45f0a9(0x2ac)]=function(){const _0x52fa98=_0x45f0a9;if(Input[_0x52fa98(0x758)]())return _0x52fa98(0x6e0);return VisuMZ[_0x52fa98(0x601)][_0x52fa98(0x5ba)]['KeyboardInput'][_0x52fa98(0x830)]||_0x52fa98(0x5fc);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x46a)]=Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x543)],Window_NameInput['prototype'][_0x45f0a9(0x543)]=function(){const _0xf1a107=_0x45f0a9;if(!this[_0xf1a107(0x4c7)]())return;if(!this[_0xf1a107(0x53c)])return;if(this[_0xf1a107(0x8e3)]===_0xf1a107(0x5fc)&&Input[_0xf1a107(0x1e3)]())this[_0xf1a107(0x86e)](_0xf1a107(0x6e0));else{if(Input[_0xf1a107(0x857)](_0xf1a107(0x579)))Input[_0xf1a107(0x1d9)](),this['processBack']();else{if(Input[_0xf1a107(0x7ef)](_0xf1a107(0x80c)))Input[_0xf1a107(0x1d9)](),this[_0xf1a107(0x8e3)]===_0xf1a107(0x5fc)?this['switchModes'](_0xf1a107(0x6e0)):this[_0xf1a107(0x86e)](_0xf1a107(0x5fc));else{if(this[_0xf1a107(0x8e3)]===_0xf1a107(0x5fc))this[_0xf1a107(0x8f3)]();else Input[_0xf1a107(0x857)](_0xf1a107(0x227))?(Input[_0xf1a107(0x1d9)](),this[_0xf1a107(0x86e)](_0xf1a107(0x5fc))):VisuMZ[_0xf1a107(0x601)]['Window_NameInput_processHandling'][_0xf1a107(0x573)](this);}}}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x26e)]=Window_NameInput[_0x45f0a9(0x7bc)]['processTouch'],Window_NameInput['prototype']['processTouch']=function(){const _0x47ec58=_0x45f0a9;if(!this[_0x47ec58(0x840)]())return;if(this[_0x47ec58(0x8e3)]===_0x47ec58(0x5fc)){if(TouchInput[_0x47ec58(0x7ef)]()&&this[_0x47ec58(0x498)]())this[_0x47ec58(0x86e)](_0x47ec58(0x6e0));else TouchInput[_0x47ec58(0x35b)]()&&this[_0x47ec58(0x86e)](_0x47ec58(0x6e0));}else VisuMZ[_0x47ec58(0x601)][_0x47ec58(0x26e)][_0x47ec58(0x573)](this);},Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x8f3)]=function(){const _0x1dd7ae=_0x45f0a9;if(Input[_0x1dd7ae(0x857)](_0x1dd7ae(0x256)))Input[_0x1dd7ae(0x1d9)](),this[_0x1dd7ae(0x8e9)]();else{if(Input['_inputString']!==undefined){let _0x1a0ee1=Input[_0x1dd7ae(0x443)],_0xd5d04b=_0x1a0ee1[_0x1dd7ae(0x2ad)];for(let _0x1ddec0=0x0;_0x1ddec0<_0xd5d04b;++_0x1ddec0){this[_0x1dd7ae(0x604)]['add'](_0x1a0ee1[_0x1ddec0])?SoundManager[_0x1dd7ae(0x5eb)]():SoundManager[_0x1dd7ae(0x823)]();}Input[_0x1dd7ae(0x1d9)]();}}},Window_NameInput[_0x45f0a9(0x7bc)]['switchModes']=function(_0x5ad4c6){const _0x32db2e=_0x45f0a9;let _0x2f70e4=this['_mode'];this[_0x32db2e(0x8e3)]=_0x5ad4c6,_0x2f70e4!==this[_0x32db2e(0x8e3)]&&(this[_0x32db2e(0x302)](),SoundManager[_0x32db2e(0x5eb)](),this['_mode']==='default'?this[_0x32db2e(0x649)](0x0):this[_0x32db2e(0x649)](-0x1));},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x55e)]=Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x2b0)],Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x2b0)]=function(_0x4a2515){const _0x365f38=_0x45f0a9;if(this[_0x365f38(0x8e3)]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x365f38(0x66d)]())return;VisuMZ[_0x365f38(0x601)]['Window_NameInput_cursorDown'][_0x365f38(0x573)](this,_0x4a2515),this['switchModes'](_0x365f38(0x6e0));},VisuMZ[_0x45f0a9(0x601)]['Window_NameInput_cursorUp']=Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x224)],Window_NameInput['prototype'][_0x45f0a9(0x224)]=function(_0x207fee){const _0xe236f4=_0x45f0a9;if(this[_0xe236f4(0x8e3)]===_0xe236f4(0x5fc)&&!Input[_0xe236f4(0x820)]())return;if(Input[_0xe236f4(0x66d)]())return;VisuMZ[_0xe236f4(0x601)][_0xe236f4(0x6f2)][_0xe236f4(0x573)](this,_0x207fee),this[_0xe236f4(0x86e)]('default');},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x276)]=Window_NameInput['prototype'][_0x45f0a9(0x511)],Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x511)]=function(_0x37852d){const _0x5d789d=_0x45f0a9;if(this[_0x5d789d(0x8e3)]===_0x5d789d(0x5fc)&&!Input[_0x5d789d(0x820)]())return;if(Input[_0x5d789d(0x66d)]())return;VisuMZ[_0x5d789d(0x601)][_0x5d789d(0x276)][_0x5d789d(0x573)](this,_0x37852d),this[_0x5d789d(0x86e)](_0x5d789d(0x6e0));},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x1b7)]=Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x5b4)],Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x5b4)]=function(_0x3dbbae){const _0x4848e3=_0x45f0a9;if(this[_0x4848e3(0x8e3)]==='keyboard'&&!Input[_0x4848e3(0x820)]())return;if(Input[_0x4848e3(0x66d)]())return;VisuMZ['CoreEngine'][_0x4848e3(0x1b7)][_0x4848e3(0x573)](this,_0x3dbbae),this[_0x4848e3(0x86e)](_0x4848e3(0x6e0));},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x89e)]=Window_NameInput['prototype'][_0x45f0a9(0x4ea)],Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x4ea)]=function(){const _0x30e67d=_0x45f0a9;if(this[_0x30e67d(0x8e3)]==='keyboard')return;if(Input[_0x30e67d(0x66d)]())return;VisuMZ[_0x30e67d(0x601)][_0x30e67d(0x89e)][_0x30e67d(0x573)](this),this['switchModes'](_0x30e67d(0x6e0));},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x8c3)]=Window_NameInput['prototype']['cursorPageup'],Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x124)]=function(){const _0x2ec9ab=_0x45f0a9;if(this['_mode']===_0x2ec9ab(0x5fc))return;if(Input[_0x2ec9ab(0x66d)]())return;VisuMZ[_0x2ec9ab(0x601)][_0x2ec9ab(0x8c3)][_0x2ec9ab(0x573)](this),this[_0x2ec9ab(0x86e)]('default');},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x46f)]=Window_NameInput['prototype'][_0x45f0a9(0x302)],Window_NameInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x302)]=function(){const _0xef7b6b=_0x45f0a9;if(this[_0xef7b6b(0x8e3)]===_0xef7b6b(0x5fc)){this[_0xef7b6b(0x629)][_0xef7b6b(0x1d9)](),this[_0xef7b6b(0x63e)][_0xef7b6b(0x1d9)](),this[_0xef7b6b(0x885)]();let _0x16a74c=VisuMZ['CoreEngine'][_0xef7b6b(0x5ba)]['KeyboardInput'][_0xef7b6b(0x476)][_0xef7b6b(0x208)]('\x0a'),_0x41daa7=_0x16a74c[_0xef7b6b(0x2ad)],_0x531678=(this['innerHeight']-_0x41daa7*this[_0xef7b6b(0x59c)]())/0x2;for(let _0x28cbd7=0x0;_0x28cbd7<_0x41daa7;++_0x28cbd7){let _0x384e7b=_0x16a74c[_0x28cbd7],_0x2aefbe=this[_0xef7b6b(0x792)](_0x384e7b)[_0xef7b6b(0x4bc)],_0x1687d2=Math[_0xef7b6b(0x5ae)]((this[_0xef7b6b(0x629)][_0xef7b6b(0x4bc)]-_0x2aefbe)/0x2);this['drawTextEx'](_0x384e7b,_0x1687d2,_0x531678),_0x531678+=this[_0xef7b6b(0x59c)]();}}else VisuMZ[_0xef7b6b(0x601)][_0xef7b6b(0x46f)]['call'](this);};};VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4f9)]=Window_ShopSell[_0x45f0a9(0x7bc)][_0x45f0a9(0x363)],Window_ShopSell[_0x45f0a9(0x7bc)]['isEnabled']=function(_0x424e9b){const _0xa8e691=_0x45f0a9;return VisuMZ[_0xa8e691(0x601)]['Settings']['QoL']['KeyItemProtect']&&DataManager['isKeyItem'](_0x424e9b)?![]:VisuMZ[_0xa8e691(0x601)][_0xa8e691(0x4f9)][_0xa8e691(0x573)](this,_0x424e9b);},Window_NumberInput['prototype'][_0x45f0a9(0x62c)]=function(){return![];};VisuMZ[_0x45f0a9(0x601)]['Settings'][_0x45f0a9(0x395)]['EnableNumberInput']&&(VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x7d1)]=Window_NumberInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x231)],Window_NumberInput[_0x45f0a9(0x7bc)]['start']=function(){const _0x28aa68=_0x45f0a9;VisuMZ[_0x28aa68(0x601)][_0x28aa68(0x7d1)][_0x28aa68(0x573)](this),this[_0x28aa68(0x649)](this[_0x28aa68(0x195)]-0x1),Input[_0x28aa68(0x1d9)]();},VisuMZ[_0x45f0a9(0x601)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x5e4)],Window_NumberInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x5e4)]=function(){const _0x34f6e4=_0x45f0a9;if(!this['isOpenAndActive']())return;if(Input[_0x34f6e4(0x66d)]())this['processKeyboardDigitChange']();else{if(Input[_0x34f6e4(0x857)]('backspace'))this['processKeyboardBackspace']();else{if(Input[_0x34f6e4(0x31b)]===0x2e)this[_0x34f6e4(0x1da)]();else{if(Input[_0x34f6e4(0x31b)]===0x24)this[_0x34f6e4(0x671)]();else Input[_0x34f6e4(0x31b)]===0x23?this['processKeyboardEnd']():VisuMZ[_0x34f6e4(0x601)][_0x34f6e4(0x6c0)][_0x34f6e4(0x573)](this);}}}},Window_NumberInput['prototype'][_0x45f0a9(0x1d2)]=function(){const _0x3f74a8=_0x45f0a9;if(!this['isCursorMovable']())return;Input[_0x3f74a8(0x66d)]()?this[_0x3f74a8(0x3b7)]():Window_Selectable[_0x3f74a8(0x7bc)][_0x3f74a8(0x1d2)][_0x3f74a8(0x573)](this);},Window_NumberInput['prototype'][_0x45f0a9(0x4ad)]=function(){},Window_NumberInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x3b7)]=function(){const _0x2a9d0f=_0x45f0a9;if(String(this['_number'])[_0x2a9d0f(0x2ad)]>=this[_0x2a9d0f(0x195)])return;const _0x14f352=Number(String(this[_0x2a9d0f(0x12a)])+Input[_0x2a9d0f(0x443)]);if(isNaN(_0x14f352))return;this['_number']=_0x14f352;const _0xe72c3='9'['repeat'](this[_0x2a9d0f(0x195)]);this[_0x2a9d0f(0x12a)]=this[_0x2a9d0f(0x12a)][_0x2a9d0f(0x5b1)](0x0,_0xe72c3),Input[_0x2a9d0f(0x1d9)](),this[_0x2a9d0f(0x302)](),SoundManager[_0x2a9d0f(0x64f)](),this[_0x2a9d0f(0x649)](this[_0x2a9d0f(0x195)]-0x1);},Window_NumberInput[_0x45f0a9(0x7bc)]['processKeyboardBackspace']=function(){const _0x51a99b=_0x45f0a9;this['_number']=Number(String(this[_0x51a99b(0x12a)])['slice'](0x0,-0x1)),this[_0x51a99b(0x12a)]=Math[_0x51a99b(0x5dc)](0x0,this[_0x51a99b(0x12a)]),Input[_0x51a99b(0x1d9)](),this[_0x51a99b(0x302)](),SoundManager[_0x51a99b(0x64f)](),this['select'](this[_0x51a99b(0x195)]-0x1);},Window_NumberInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x1da)]=function(){const _0x5ded73=_0x45f0a9;this['_number']=Number(String(this[_0x5ded73(0x12a)])[_0x5ded73(0x2ab)](0x1)),this[_0x5ded73(0x12a)]=Math[_0x5ded73(0x5dc)](0x0,this['_number']),Input[_0x5ded73(0x1d9)](),this[_0x5ded73(0x302)](),SoundManager[_0x5ded73(0x64f)](),this['select'](this[_0x5ded73(0x195)]-0x1);},Window_NumberInput[_0x45f0a9(0x7bc)]['processKeyboardHome']=function(){const _0xffa04c=_0x45f0a9;if(this[_0xffa04c(0x147)]()===0x0)return;Input[_0xffa04c(0x1d9)](),this[_0xffa04c(0x302)](),SoundManager['playCursor'](),this[_0xffa04c(0x649)](0x0);},Window_NumberInput[_0x45f0a9(0x7bc)][_0x45f0a9(0x566)]=function(){const _0x254d53=_0x45f0a9;if(this[_0x254d53(0x147)]()===this[_0x254d53(0x195)]-0x1)return;Input['clear'](),this[_0x254d53(0x302)](),SoundManager[_0x254d53(0x64f)](),this[_0x254d53(0x649)](this[_0x254d53(0x195)]-0x1);});;VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x42f)]=Window_MapName[_0x45f0a9(0x7bc)][_0x45f0a9(0x302)],Window_MapName[_0x45f0a9(0x7bc)][_0x45f0a9(0x302)]=function(){const _0x10085a=_0x45f0a9;VisuMZ['CoreEngine'][_0x10085a(0x5ba)]['QoL'][_0x10085a(0x5fe)]?this[_0x10085a(0x3a4)]():VisuMZ[_0x10085a(0x601)][_0x10085a(0x42f)]['call'](this);},Window_MapName[_0x45f0a9(0x7bc)][_0x45f0a9(0x3a4)]=function(){const _0x22ce0f=_0x45f0a9;this['contents']['clear']();if($gameMap[_0x22ce0f(0x752)]()){const _0x58be6c=this['innerWidth'];this[_0x22ce0f(0x7ed)](0x0,0x0,_0x58be6c,this[_0x22ce0f(0x59c)]());const _0x364f95=this[_0x22ce0f(0x792)]($gameMap[_0x22ce0f(0x752)]())[_0x22ce0f(0x4bc)];this[_0x22ce0f(0x17e)]($gameMap[_0x22ce0f(0x752)](),Math['floor']((_0x58be6c-_0x364f95)/0x2),0x0);}},Window_TitleCommand[_0x45f0a9(0x8ec)]=VisuMZ[_0x45f0a9(0x601)]['Settings'][_0x45f0a9(0x66f)],Window_TitleCommand['prototype'][_0x45f0a9(0x37d)]=function(){const _0x365055=_0x45f0a9;this[_0x365055(0x659)]();},Window_TitleCommand['prototype']['makeCoreEngineCommandList']=function(){const _0x33d0fb=_0x45f0a9;for(const _0x1870c3 of Window_TitleCommand[_0x33d0fb(0x8ec)]){if(_0x1870c3[_0x33d0fb(0x5ab)][_0x33d0fb(0x573)](this)){const _0x2183dc=_0x1870c3[_0x33d0fb(0x6bc)];let _0x4ad4c9=_0x1870c3['TextStr'];if(['',_0x33d0fb(0x688)][_0x33d0fb(0x65f)](_0x4ad4c9))_0x4ad4c9=_0x1870c3['TextJS'][_0x33d0fb(0x573)](this);const _0x109619=_0x1870c3[_0x33d0fb(0x53a)][_0x33d0fb(0x573)](this),_0x439bf2=_0x1870c3[_0x33d0fb(0x6a2)][_0x33d0fb(0x573)](this);this['addCommand'](_0x4ad4c9,_0x2183dc,_0x109619,_0x439bf2),this['setHandler'](_0x2183dc,_0x1870c3['CallHandlerJS'][_0x33d0fb(0x159)](this,_0x439bf2));}}},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x33e)]=Window_TitleCommand[_0x45f0a9(0x7bc)][_0x45f0a9(0x4be)],Window_TitleCommand[_0x45f0a9(0x7bc)][_0x45f0a9(0x4be)]=function(){const _0x265648=_0x45f0a9;VisuMZ[_0x265648(0x601)][_0x265648(0x33e)][_0x265648(0x573)](this);if(!Window_TitleCommand[_0x265648(0x2b4)])return;const _0x2cb4d8=this['findSymbol'](Window_TitleCommand[_0x265648(0x2b4)]),_0x141d62=Math[_0x265648(0x5ae)](this['maxVisibleItems']()/0x2)-0x1;this[_0x265648(0x743)](_0x2cb4d8),this[_0x265648(0x5ee)]>0x1&&(this[_0x265648(0x5ee)]=0x1,this[_0x265648(0x246)]()),this[_0x265648(0x75e)](_0x2cb4d8-_0x141d62);},Window_GameEnd[_0x45f0a9(0x8ec)]=VisuMZ[_0x45f0a9(0x601)]['Settings'][_0x45f0a9(0x568)][_0x45f0a9(0x3fb)][_0x45f0a9(0x193)],Window_GameEnd['prototype'][_0x45f0a9(0x37d)]=function(){const _0x178133=_0x45f0a9;this[_0x178133(0x659)]();},Window_GameEnd[_0x45f0a9(0x7bc)][_0x45f0a9(0x659)]=function(){const _0x2eb43c=_0x45f0a9;for(const _0xce6aa of Window_GameEnd['_commandList']){if(_0xce6aa[_0x2eb43c(0x5ab)]['call'](this)){const _0x4e632f=_0xce6aa[_0x2eb43c(0x6bc)];let _0x2ab274=_0xce6aa[_0x2eb43c(0x186)];if(['',_0x2eb43c(0x688)][_0x2eb43c(0x65f)](_0x2ab274))_0x2ab274=_0xce6aa['TextJS'][_0x2eb43c(0x573)](this);const _0x2a36de=_0xce6aa[_0x2eb43c(0x53a)][_0x2eb43c(0x573)](this),_0x1ece0a=_0xce6aa[_0x2eb43c(0x6a2)][_0x2eb43c(0x573)](this);this[_0x2eb43c(0x784)](_0x2ab274,_0x4e632f,_0x2a36de,_0x1ece0a),this[_0x2eb43c(0x28a)](_0x4e632f,_0xce6aa['CallHandlerJS'][_0x2eb43c(0x159)](this,_0x1ece0a));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist['prototype']=Object[_0x45f0a9(0x772)](Window_Base['prototype']),Window_ButtonAssist[_0x45f0a9(0x7bc)]['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)]=function(_0x246d36){const _0x1db895=_0x45f0a9;this[_0x1db895(0x14a)]={},Window_Base['prototype'][_0x1db895(0x73f)][_0x1db895(0x573)](this,_0x246d36),this['setBackgroundType'](VisuMZ[_0x1db895(0x601)][_0x1db895(0x5ba)]['ButtonAssist']['BgType']||0x0),this['refresh']();},Window_ButtonAssist[_0x45f0a9(0x7bc)][_0x45f0a9(0x59c)]=function(){const _0x5c8fd9=_0x45f0a9;return this[_0x5c8fd9(0x65a)]||Window_Base[_0x5c8fd9(0x7bc)][_0x5c8fd9(0x59c)][_0x5c8fd9(0x573)](this);},Window_ButtonAssist['prototype'][_0x45f0a9(0x605)]=function(){const _0x369e79=_0x45f0a9;this[_0x369e79(0x629)]['fontSize']<=0x60&&(this[_0x369e79(0x629)][_0x369e79(0x30c)]+=0x6);},Window_ButtonAssist[_0x45f0a9(0x7bc)][_0x45f0a9(0x737)]=function(){const _0x5aafd9=_0x45f0a9;this[_0x5aafd9(0x629)][_0x5aafd9(0x30c)]>=0x18&&(this[_0x5aafd9(0x629)][_0x5aafd9(0x30c)]-=0x6);},Window_ButtonAssist[_0x45f0a9(0x7bc)]['update']=function(){const _0x21bde2=_0x45f0a9;Window_Base['prototype'][_0x21bde2(0x314)]['call'](this),this['updateKeyText']();},Window_ButtonAssist[_0x45f0a9(0x7bc)][_0x45f0a9(0x5a6)]=function(){const _0x262241=_0x45f0a9;this[_0x262241(0x56e)]=SceneManager['_scene'][_0x262241(0x236)]()!==_0x262241(0x77f)?0x0:0x8;},Window_ButtonAssist[_0x45f0a9(0x7bc)][_0x45f0a9(0x2e8)]=function(){const _0x162fc0=_0x45f0a9,_0x4fab44=SceneManager[_0x162fc0(0x4a0)];for(let _0x12193e=0x1;_0x12193e<=0x5;_0x12193e++){if(this[_0x162fc0(0x14a)][_0x162fc0(0x6f7)['format'](_0x12193e)]!==_0x4fab44[_0x162fc0(0x6d5)['format'](_0x12193e)]())return this[_0x162fc0(0x302)]();if(this[_0x162fc0(0x14a)][_0x162fc0(0x896)[_0x162fc0(0x525)](_0x12193e)]!==_0x4fab44[_0x162fc0(0x39e)[_0x162fc0(0x525)](_0x12193e)]())return this[_0x162fc0(0x302)]();}},Window_ButtonAssist[_0x45f0a9(0x7bc)][_0x45f0a9(0x302)]=function(){const _0x28d43c=_0x45f0a9;this['contents']['clear']();for(let _0x901e7b=0x1;_0x901e7b<=0x5;_0x901e7b++){this[_0x28d43c(0x85a)](_0x901e7b);}},Window_ButtonAssist[_0x45f0a9(0x7bc)][_0x45f0a9(0x85a)]=function(_0x4daa0e){const _0x2b0602=_0x45f0a9,_0x4cbc3d=this[_0x2b0602(0x136)]/0x5,_0x494bf4=SceneManager[_0x2b0602(0x4a0)],_0x39914c=_0x494bf4[_0x2b0602(0x6d5)[_0x2b0602(0x525)](_0x4daa0e)](),_0x4c1b7b=_0x494bf4['buttonAssistText%1'[_0x2b0602(0x525)](_0x4daa0e)]();this[_0x2b0602(0x14a)][_0x2b0602(0x6f7)['format'](_0x4daa0e)]=_0x39914c,this['_data'][_0x2b0602(0x896)[_0x2b0602(0x525)](_0x4daa0e)]=_0x4c1b7b;if(_0x39914c==='')return;if(_0x4c1b7b==='')return;const _0x22ab5c=_0x494bf4[_0x2b0602(0x3e2)[_0x2b0602(0x525)](_0x4daa0e)](),_0x1c9697=this[_0x2b0602(0x58b)](),_0x382279=_0x4cbc3d*(_0x4daa0e-0x1)+_0x1c9697+_0x22ab5c,_0x1639b6=VisuMZ[_0x2b0602(0x601)][_0x2b0602(0x5ba)][_0x2b0602(0x554)][_0x2b0602(0x5b2)];this[_0x2b0602(0x17e)](_0x1639b6[_0x2b0602(0x525)](_0x39914c,_0x4c1b7b),_0x382279,0x0,_0x4cbc3d-_0x1c9697*0x2);},VisuMZ[_0x45f0a9(0x601)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x45f0a9(0x7bc)][_0x45f0a9(0x6a9)],Game_Interpreter['prototype'][_0x45f0a9(0x6a9)]=function(){const _0x45d367=_0x45f0a9;if($gameTemp[_0x45d367(0x77e)]!==undefined)return VisuMZ[_0x45d367(0x601)][_0x45d367(0x8da)]();return VisuMZ[_0x45d367(0x601)][_0x45d367(0x3b9)][_0x45d367(0x573)](this);},VisuMZ[_0x45f0a9(0x601)]['UpdatePictureCoordinates']=function(){const _0x7c0982=_0x45f0a9,_0x1591b8=$gameTemp[_0x7c0982(0x77e)]||0x0;(_0x1591b8<0x0||_0x1591b8>0x64||TouchInput[_0x7c0982(0x35b)]()||Input[_0x7c0982(0x7ef)](_0x7c0982(0x844)))&&($gameTemp[_0x7c0982(0x77e)]=undefined,Input[_0x7c0982(0x1d9)](),TouchInput[_0x7c0982(0x1d9)]());const _0xad9818=$gameScreen[_0x7c0982(0x14c)](_0x1591b8);return _0xad9818&&(_0xad9818['_x']=TouchInput['_x'],_0xad9818['_y']=TouchInput['_y']),VisuMZ[_0x7c0982(0x601)][_0x7c0982(0x50b)](),$gameTemp[_0x7c0982(0x77e)]!==undefined;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x50b)]=function(){const _0x35ccfc=_0x45f0a9,_0x46a08a=SceneManager[_0x35ccfc(0x4a0)];if(!_0x46a08a)return;!_0x46a08a['_pictureCoordinatesWindow']&&(SoundManager[_0x35ccfc(0x2cf)](),_0x46a08a[_0x35ccfc(0x8d1)]=new Window_PictureCoordinates(),_0x46a08a['addChild'](_0x46a08a[_0x35ccfc(0x8d1)])),$gameTemp[_0x35ccfc(0x77e)]===undefined&&(SoundManager[_0x35ccfc(0x8dd)](),_0x46a08a[_0x35ccfc(0x732)](_0x46a08a[_0x35ccfc(0x8d1)]),_0x46a08a[_0x35ccfc(0x8d1)]=undefined);};function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates[_0x45f0a9(0x7bc)]=Object[_0x45f0a9(0x772)](Window_Base[_0x45f0a9(0x7bc)]),Window_PictureCoordinates[_0x45f0a9(0x7bc)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)]=function(){const _0x1604c0=_0x45f0a9;this[_0x1604c0(0x168)]=_0x1604c0(0x463),this[_0x1604c0(0x6f3)]=_0x1604c0(0x463),this['_lastY']=_0x1604c0(0x463);const _0x3883ec=this[_0x1604c0(0x396)]();Window_Base[_0x1604c0(0x7bc)][_0x1604c0(0x73f)][_0x1604c0(0x573)](this,_0x3883ec),this[_0x1604c0(0x3f2)](0x2);},Window_PictureCoordinates[_0x45f0a9(0x7bc)][_0x45f0a9(0x396)]=function(){const _0x5f59a1=_0x45f0a9;let _0x2f8db3=0x0,_0x20b0fb=Graphics[_0x5f59a1(0x2a5)]-this[_0x5f59a1(0x59c)](),_0x1dd4a9=Graphics['width'],_0x3ef908=this[_0x5f59a1(0x59c)]();return new Rectangle(_0x2f8db3,_0x20b0fb,_0x1dd4a9,_0x3ef908);},Window_PictureCoordinates['prototype'][_0x45f0a9(0x5a6)]=function(){const _0x5ea288=_0x45f0a9;this[_0x5ea288(0x56e)]=0x0;},Window_PictureCoordinates[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)]=function(){const _0x31039d=_0x45f0a9;Window_Base['prototype']['update'][_0x31039d(0x573)](this),this[_0x31039d(0x215)]();},Window_PictureCoordinates[_0x45f0a9(0x7bc)][_0x45f0a9(0x215)]=function(){const _0x5df329=_0x45f0a9;if(!this['needsUpdate']())return;this[_0x5df329(0x302)]();},Window_PictureCoordinates[_0x45f0a9(0x7bc)][_0x45f0a9(0x3fc)]=function(){const _0x73e438=_0x45f0a9,_0x324df2=$gameTemp[_0x73e438(0x77e)],_0x5591ad=$gameScreen[_0x73e438(0x14c)](_0x324df2);return _0x5591ad?this[_0x73e438(0x168)]!==_0x5591ad[_0x73e438(0x739)]||this[_0x73e438(0x6f3)]!==_0x5591ad['_x']||this[_0x73e438(0x167)]!==_0x5591ad['_y']:![];},Window_PictureCoordinates[_0x45f0a9(0x7bc)]['refresh']=function(){const _0x3320b3=_0x45f0a9;this[_0x3320b3(0x629)][_0x3320b3(0x1d9)]();const _0x1aa687=$gameTemp[_0x3320b3(0x77e)],_0x377413=$gameScreen['picture'](_0x1aa687);if(!_0x377413)return;this[_0x3320b3(0x168)]=_0x377413[_0x3320b3(0x739)],this[_0x3320b3(0x6f3)]=_0x377413['_x'],this[_0x3320b3(0x167)]=_0x377413['_y'];const _0x368316=ColorManager[_0x3320b3(0x8c5)]();this[_0x3320b3(0x629)]['fillRect'](0x0,0x0,this[_0x3320b3(0x136)],this[_0x3320b3(0x65a)],_0x368316);const _0x4e89d7=_0x3320b3(0x693)[_0x3320b3(0x525)](_0x377413[_0x3320b3(0x739)]===0x0?'Upper\x20Left':'Center'),_0x523bbc='X:\x20%1'[_0x3320b3(0x525)](_0x377413['_x']),_0x12478f=_0x3320b3(0x209)[_0x3320b3(0x525)](_0x377413['_y']),_0x246ff2=_0x3320b3(0x55d)[_0x3320b3(0x525)](TextManager[_0x3320b3(0x360)](_0x3320b3(0x844)));let _0x462e55=Math[_0x3320b3(0x5ae)](this['innerWidth']/0x4);this[_0x3320b3(0x631)](_0x4e89d7,_0x462e55*0x0,0x0,_0x462e55),this[_0x3320b3(0x631)](_0x523bbc,_0x462e55*0x1,0x0,_0x462e55,'center'),this[_0x3320b3(0x631)](_0x12478f,_0x462e55*0x2,0x0,_0x462e55,_0x3320b3(0x76a));const _0x5eacb2=this[_0x3320b3(0x792)](_0x246ff2)[_0x3320b3(0x4bc)],_0x17465d=this[_0x3320b3(0x136)]-_0x5eacb2;this[_0x3320b3(0x17e)](_0x246ff2,_0x17465d,0x0,_0x5eacb2);};function _0x25ac(_0x35cc6f,_0x3c61c8){const _0x547f9a=_0x547f();return _0x25ac=function(_0x25ac23,_0x294a59){_0x25ac23=_0x25ac23-0x116;let _0x14dfa9=_0x547f9a[_0x25ac23];return _0x14dfa9;},_0x25ac(_0x35cc6f,_0x3c61c8);}function Window_TextPopup(){const _0x36a309=_0x45f0a9;this[_0x36a309(0x73f)](...arguments);}Window_TextPopup['prototype']=Object['create'](Window_Base['prototype']),Window_TextPopup['prototype']['constructor']=Window_TextPopup,Window_TextPopup['SETTINGS']={'framesPerChar':VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)][_0x45f0a9(0x74d)][_0x45f0a9(0x17c)]??1.5,'framesMin':VisuMZ['CoreEngine'][_0x45f0a9(0x5ba)][_0x45f0a9(0x74d)][_0x45f0a9(0x55c)]??0x5a,'framesMax':VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5ba)]['Window'][_0x45f0a9(0x13a)]??0x12c},Window_TextPopup[_0x45f0a9(0x7bc)][_0x45f0a9(0x73f)]=function(){const _0x54b5da=_0x45f0a9,_0x153bc1=new Rectangle(0x0,0x0,0x1,0x1);Window_Base['prototype']['initialize'][_0x54b5da(0x573)](this,_0x153bc1),this[_0x54b5da(0x456)]=0x0,this[_0x54b5da(0x6fe)]='',this[_0x54b5da(0x20e)]=[],this[_0x54b5da(0x6b1)]=0x0;},Window_TextPopup['prototype'][_0x45f0a9(0x385)]=function(){return!![];},Window_TextPopup[_0x45f0a9(0x7bc)][_0x45f0a9(0x35c)]=function(_0x3d1d05){const _0x4e9eab=_0x45f0a9;if(this[_0x4e9eab(0x20e)][this[_0x4e9eab(0x20e)][_0x4e9eab(0x2ad)]-0x1]===_0x3d1d05)return;this[_0x4e9eab(0x20e)][_0x4e9eab(0x5f7)](_0x3d1d05),SceneManager[_0x4e9eab(0x4a0)]['addChild'](this);},Window_TextPopup[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)]=function(){const _0x24f99d=_0x45f0a9;Window_Base[_0x24f99d(0x7bc)][_0x24f99d(0x314)][_0x24f99d(0x573)](this),this['updateText'](),this[_0x24f99d(0x4f6)]();},Window_TextPopup[_0x45f0a9(0x7bc)]['updateText']=function(){const _0x356a99=_0x45f0a9;if(this[_0x356a99(0x6fe)]!=='')return;if(this['_textQueue'][_0x356a99(0x2ad)]<=0x0)return;if(!this['isClosed']())return;this[_0x356a99(0x6fe)]=this[_0x356a99(0x20e)][_0x356a99(0x491)]();const _0x3243f8=Window_TextPopup[_0x356a99(0x4d2)],_0x29d85d=Math[_0x356a99(0x7b9)](this[_0x356a99(0x6fe)]['length']*_0x3243f8[_0x356a99(0x241)]);this['_timeDuration']=_0x29d85d[_0x356a99(0x5b1)](_0x3243f8[_0x356a99(0x507)],_0x3243f8[_0x356a99(0x12b)]);const _0x3fb63c=this[_0x356a99(0x792)](this[_0x356a99(0x6fe)]);let _0x226cf8=_0x3fb63c['width']+this[_0x356a99(0x58b)]()*0x2;_0x226cf8+=$gameSystem[_0x356a99(0x5e3)]()*0x2;let _0x239a69=Math[_0x356a99(0x5dc)](_0x3fb63c[_0x356a99(0x2a5)],this[_0x356a99(0x59c)]());_0x239a69+=$gameSystem[_0x356a99(0x5e3)]()*0x2;const _0x1a9bc3=Math[_0x356a99(0x640)]((Graphics[_0x356a99(0x4bc)]-_0x226cf8)/0x2),_0x152ccd=Math['round']((Graphics['height']-_0x239a69)/0x2),_0x1f6163=new Rectangle(_0x1a9bc3,_0x152ccd,_0x226cf8,_0x239a69);this[_0x356a99(0x2f0)](_0x1f6163['x'],_0x1f6163['y'],_0x1f6163[_0x356a99(0x4bc)],_0x1f6163[_0x356a99(0x2a5)]),this[_0x356a99(0x7c5)](),this[_0x356a99(0x302)](),this[_0x356a99(0x6d3)](),SceneManager[_0x356a99(0x4a0)]['addChild'](this);},Window_TextPopup['prototype'][_0x45f0a9(0x302)]=function(){const _0x4c1caa=_0x45f0a9,_0x372d46=this[_0x4c1caa(0x322)]();this['contents'][_0x4c1caa(0x1d9)](),this[_0x4c1caa(0x17e)](this[_0x4c1caa(0x6fe)],_0x372d46['x'],_0x372d46['y'],_0x372d46[_0x4c1caa(0x4bc)]);},Window_TextPopup[_0x45f0a9(0x7bc)][_0x45f0a9(0x4f6)]=function(){const _0x36b025=_0x45f0a9;if(this[_0x36b025(0x3d8)]()||this['isClosing']())return;if(this['_timeDuration']<=0x0)return;this[_0x36b025(0x6b1)]--,this['_timeDuration']<=0x0&&(this[_0x36b025(0x774)](),this[_0x36b025(0x6fe)]='');},VisuMZ['ShowDevTools']=function(_0x27db4e){const _0x368371=_0x45f0a9;if(Utils[_0x368371(0x22c)](_0x368371(0x2a3))){var _0x4c92de=require('nw.gui')[_0x368371(0x74d)][_0x368371(0x4f8)]();SceneManager[_0x368371(0x855)]();if(_0x27db4e)setTimeout(_0x4c92de[_0x368371(0x384)][_0x368371(0x159)](_0x4c92de),0x190);}},VisuMZ[_0x45f0a9(0x266)]=function(_0xe8ac2b,_0x13ae0c){const _0x3d3199=_0x45f0a9;_0x13ae0c=_0x13ae0c[_0x3d3199(0x26d)]();var _0x33922f=1.70158,_0x1cccf8=0.7;switch(_0x13ae0c){case'LINEAR':return _0xe8ac2b;case _0x3d3199(0x126):return-0x1*Math['cos'](_0xe8ac2b*(Math['PI']/0x2))+0x1;case _0x3d3199(0x1a3):return Math[_0x3d3199(0x82c)](_0xe8ac2b*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math['cos'](Math['PI']*_0xe8ac2b)-0x1);case _0x3d3199(0x2cb):return _0xe8ac2b*_0xe8ac2b;case _0x3d3199(0x348):return _0xe8ac2b*(0x2-_0xe8ac2b);case _0x3d3199(0x5ca):return _0xe8ac2b<0.5?0x2*_0xe8ac2b*_0xe8ac2b:-0x1+(0x4-0x2*_0xe8ac2b)*_0xe8ac2b;case _0x3d3199(0x480):return _0xe8ac2b*_0xe8ac2b*_0xe8ac2b;case _0x3d3199(0x38b):var _0x2e783b=_0xe8ac2b-0x1;return _0x2e783b*_0x2e783b*_0x2e783b+0x1;case'INOUTCUBIC':return _0xe8ac2b<0.5?0x4*_0xe8ac2b*_0xe8ac2b*_0xe8ac2b:(_0xe8ac2b-0x1)*(0x2*_0xe8ac2b-0x2)*(0x2*_0xe8ac2b-0x2)+0x1;case _0x3d3199(0x49e):return _0xe8ac2b*_0xe8ac2b*_0xe8ac2b*_0xe8ac2b;case _0x3d3199(0x6d9):var _0x2e783b=_0xe8ac2b-0x1;return 0x1-_0x2e783b*_0x2e783b*_0x2e783b*_0x2e783b;case _0x3d3199(0x230):var _0x2e783b=_0xe8ac2b-0x1;return _0xe8ac2b<0.5?0x8*_0xe8ac2b*_0xe8ac2b*_0xe8ac2b*_0xe8ac2b:0x1-0x8*_0x2e783b*_0x2e783b*_0x2e783b*_0x2e783b;case _0x3d3199(0x62f):return _0xe8ac2b*_0xe8ac2b*_0xe8ac2b*_0xe8ac2b*_0xe8ac2b;case _0x3d3199(0x518):var _0x2e783b=_0xe8ac2b-0x1;return 0x1+_0x2e783b*_0x2e783b*_0x2e783b*_0x2e783b*_0x2e783b;case'INOUTQUINT':var _0x2e783b=_0xe8ac2b-0x1;return _0xe8ac2b<0.5?0x10*_0xe8ac2b*_0xe8ac2b*_0xe8ac2b*_0xe8ac2b*_0xe8ac2b:0x1+0x10*_0x2e783b*_0x2e783b*_0x2e783b*_0x2e783b*_0x2e783b;case'INEXPO':if(_0xe8ac2b===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0xe8ac2b-0x1));case _0x3d3199(0x44e):if(_0xe8ac2b===0x1)return 0x1;return-Math[_0x3d3199(0x2e2)](0x2,-0xa*_0xe8ac2b)+0x1;case _0x3d3199(0x68f):if(_0xe8ac2b===0x0||_0xe8ac2b===0x1)return _0xe8ac2b;var _0x4c2bce=_0xe8ac2b*0x2,_0x47b76d=_0x4c2bce-0x1;if(_0x4c2bce<0x1)return 0.5*Math[_0x3d3199(0x2e2)](0x2,0xa*_0x47b76d);return 0.5*(-Math[_0x3d3199(0x2e2)](0x2,-0xa*_0x47b76d)+0x2);case _0x3d3199(0x180):var _0x4c2bce=_0xe8ac2b/0x1;return-0x1*(Math[_0x3d3199(0x40a)](0x1-_0x4c2bce*_0xe8ac2b)-0x1);case _0x3d3199(0x25e):var _0x2e783b=_0xe8ac2b-0x1;return Math[_0x3d3199(0x40a)](0x1-_0x2e783b*_0x2e783b);case _0x3d3199(0x32c):var _0x4c2bce=_0xe8ac2b*0x2,_0x47b76d=_0x4c2bce-0x2;if(_0x4c2bce<0x1)return-0.5*(Math[_0x3d3199(0x40a)](0x1-_0x4c2bce*_0x4c2bce)-0x1);return 0.5*(Math['sqrt'](0x1-_0x47b76d*_0x47b76d)+0x1);case'INBACK':return _0xe8ac2b*_0xe8ac2b*((_0x33922f+0x1)*_0xe8ac2b-_0x33922f);case _0x3d3199(0x226):var _0x4c2bce=_0xe8ac2b/0x1-0x1;return _0x4c2bce*_0x4c2bce*((_0x33922f+0x1)*_0x4c2bce+_0x33922f)+0x1;break;case _0x3d3199(0x3f7):var _0x4c2bce=_0xe8ac2b*0x2,_0x5502bb=_0x4c2bce-0x2,_0x5cf5a7=_0x33922f*1.525;if(_0x4c2bce<0x1)return 0.5*_0x4c2bce*_0x4c2bce*((_0x5cf5a7+0x1)*_0x4c2bce-_0x5cf5a7);return 0.5*(_0x5502bb*_0x5502bb*((_0x5cf5a7+0x1)*_0x5502bb+_0x5cf5a7)+0x2);case _0x3d3199(0x8e6):if(_0xe8ac2b===0x0||_0xe8ac2b===0x1)return _0xe8ac2b;var _0x4c2bce=_0xe8ac2b/0x1,_0x47b76d=_0x4c2bce-0x1,_0xeeb36e=0x1-_0x1cccf8,_0x5cf5a7=_0xeeb36e/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0x3d3199(0x2e2)](0x2,0xa*_0x47b76d)*Math['sin']((_0x47b76d-_0x5cf5a7)*(0x2*Math['PI'])/_0xeeb36e));case _0x3d3199(0x2c0):var _0xeeb36e=0x1-_0x1cccf8,_0x4c2bce=_0xe8ac2b*0x2;if(_0xe8ac2b===0x0||_0xe8ac2b===0x1)return _0xe8ac2b;var _0x5cf5a7=_0xeeb36e/(0x2*Math['PI'])*Math['asin'](0x1);return Math['pow'](0x2,-0xa*_0x4c2bce)*Math[_0x3d3199(0x82c)]((_0x4c2bce-_0x5cf5a7)*(0x2*Math['PI'])/_0xeeb36e)+0x1;case _0x3d3199(0x1b3):var _0xeeb36e=0x1-_0x1cccf8;if(_0xe8ac2b===0x0||_0xe8ac2b===0x1)return _0xe8ac2b;var _0x4c2bce=_0xe8ac2b*0x2,_0x47b76d=_0x4c2bce-0x1,_0x5cf5a7=_0xeeb36e/(0x2*Math['PI'])*Math[_0x3d3199(0x889)](0x1);if(_0x4c2bce<0x1)return-0.5*(Math[_0x3d3199(0x2e2)](0x2,0xa*_0x47b76d)*Math[_0x3d3199(0x82c)]((_0x47b76d-_0x5cf5a7)*(0x2*Math['PI'])/_0xeeb36e));return Math['pow'](0x2,-0xa*_0x47b76d)*Math[_0x3d3199(0x82c)]((_0x47b76d-_0x5cf5a7)*(0x2*Math['PI'])/_0xeeb36e)*0.5+0x1;case'OUTBOUNCE':var _0x4c2bce=_0xe8ac2b/0x1;if(_0x4c2bce<0x1/2.75)return 7.5625*_0x4c2bce*_0x4c2bce;else{if(_0x4c2bce<0x2/2.75){var _0x5502bb=_0x4c2bce-1.5/2.75;return 7.5625*_0x5502bb*_0x5502bb+0.75;}else{if(_0x4c2bce<2.5/2.75){var _0x5502bb=_0x4c2bce-2.25/2.75;return 7.5625*_0x5502bb*_0x5502bb+0.9375;}else{var _0x5502bb=_0x4c2bce-2.625/2.75;return 7.5625*_0x5502bb*_0x5502bb+0.984375;}}}case _0x3d3199(0x1a9):var _0x34c1d9=0x1-VisuMZ[_0x3d3199(0x266)](0x1-_0xe8ac2b,_0x3d3199(0x233));return _0x34c1d9;case'INOUTBOUNCE':if(_0xe8ac2b<0.5)var _0x34c1d9=VisuMZ[_0x3d3199(0x266)](_0xe8ac2b*0x2,'inbounce')*0.5;else var _0x34c1d9=VisuMZ[_0x3d3199(0x266)](_0xe8ac2b*0x2-0x1,_0x3d3199(0x233))*0.5+0.5;return _0x34c1d9;default:return _0xe8ac2b;}},VisuMZ[_0x45f0a9(0x664)]=function(_0xc82e16){const _0x4b39fe=_0x45f0a9;_0xc82e16=String(_0xc82e16)[_0x4b39fe(0x26d)]();const _0x282263=VisuMZ[_0x4b39fe(0x601)][_0x4b39fe(0x5ba)][_0x4b39fe(0x6ca)];if(_0xc82e16===_0x4b39fe(0x8cf))return _0x282263[_0x4b39fe(0x252)];if(_0xc82e16===_0x4b39fe(0x300))return _0x282263[_0x4b39fe(0x4cb)];if(_0xc82e16===_0x4b39fe(0x5cc))return _0x282263[_0x4b39fe(0x346)];if(_0xc82e16==='DEF')return _0x282263['IconParam3'];if(_0xc82e16===_0x4b39fe(0x323))return _0x282263['IconParam4'];if(_0xc82e16===_0x4b39fe(0x2da))return _0x282263[_0x4b39fe(0x431)];if(_0xc82e16===_0x4b39fe(0x356))return _0x282263[_0x4b39fe(0x7b7)];if(_0xc82e16===_0x4b39fe(0x265))return _0x282263['IconParam7'];if(_0xc82e16===_0x4b39fe(0x51c))return _0x282263[_0x4b39fe(0x4c0)];if(_0xc82e16===_0x4b39fe(0x1bc))return _0x282263[_0x4b39fe(0x337)];if(_0xc82e16===_0x4b39fe(0x78e))return _0x282263[_0x4b39fe(0x6a0)];if(_0xc82e16==='CEV')return _0x282263[_0x4b39fe(0x371)];if(_0xc82e16===_0x4b39fe(0x1ba))return _0x282263['IconXParam4'];if(_0xc82e16==='MRF')return _0x282263[_0x4b39fe(0x351)];if(_0xc82e16===_0x4b39fe(0x83a))return _0x282263['IconXParam6'];if(_0xc82e16===_0x4b39fe(0x6ab))return _0x282263[_0x4b39fe(0x6dd)];if(_0xc82e16===_0x4b39fe(0x7ea))return _0x282263[_0x4b39fe(0x4a6)];if(_0xc82e16==='TRG')return _0x282263['IconXParam9'];if(_0xc82e16===_0x4b39fe(0x7ab))return _0x282263['IconSParam0'];if(_0xc82e16===_0x4b39fe(0x598))return _0x282263['IconSParam1'];if(_0xc82e16===_0x4b39fe(0x274))return _0x282263[_0x4b39fe(0x6c6)];if(_0xc82e16===_0x4b39fe(0x155))return _0x282263[_0x4b39fe(0x17f)];if(_0xc82e16==='MCR')return _0x282263['IconSParam4'];if(_0xc82e16===_0x4b39fe(0x3b8))return _0x282263[_0x4b39fe(0x1c2)];if(_0xc82e16===_0x4b39fe(0x313))return _0x282263[_0x4b39fe(0x852)];if(_0xc82e16===_0x4b39fe(0x49b))return _0x282263[_0x4b39fe(0x6c3)];if(_0xc82e16===_0x4b39fe(0x29c))return _0x282263['IconSParam8'];if(_0xc82e16===_0x4b39fe(0x71c))return _0x282263['IconSParam9'];if(VisuMZ[_0x4b39fe(0x601)]['CustomParamIcons'][_0xc82e16])return VisuMZ[_0x4b39fe(0x601)][_0x4b39fe(0x84a)][_0xc82e16]||0x0;return 0x0;},VisuMZ[_0x45f0a9(0x6b0)]=function(_0x4e4d43,_0x460562,_0x5b7e54){const _0xa3090c=_0x45f0a9;if(_0x5b7e54===undefined&&_0x4e4d43%0x1===0x0)return _0x4e4d43;if(_0x5b7e54!==undefined&&[_0xa3090c(0x8cf),_0xa3090c(0x300),_0xa3090c(0x5cc),_0xa3090c(0x2cc),'MAT',_0xa3090c(0x2da),'AGI','LUK'][_0xa3090c(0x65f)](String(_0x5b7e54)[_0xa3090c(0x26d)]()[_0xa3090c(0x88c)]()))return _0x4e4d43;_0x460562=_0x460562||0x0;if(VisuMZ[_0xa3090c(0x601)][_0xa3090c(0x401)][_0x5b7e54])return VisuMZ[_0xa3090c(0x601)][_0xa3090c(0x8ea)][_0x5b7e54]===_0xa3090c(0x8f2)?_0x4e4d43:String((_0x4e4d43*0x64)[_0xa3090c(0x122)](_0x460562))+'%';return String((_0x4e4d43*0x64)[_0xa3090c(0x122)](_0x460562))+'%';},VisuMZ['GroupDigits']=function(_0x43f4ea){const _0x3c57e3=_0x45f0a9;_0x43f4ea=String(_0x43f4ea);if(!_0x43f4ea)return _0x43f4ea;if(typeof _0x43f4ea!==_0x3c57e3(0x54f))return _0x43f4ea;const _0x49a744=VisuMZ[_0x3c57e3(0x601)][_0x3c57e3(0x5ba)][_0x3c57e3(0x8f1)]['DigitGroupingLocale']||_0x3c57e3(0x474),_0x1da631={'maximumFractionDigits':0x6};_0x43f4ea=_0x43f4ea[_0x3c57e3(0x5a2)](/\[(.*?)\]/g,(_0x1e72f1,_0x233e0f)=>{const _0x108428=_0x3c57e3;return VisuMZ[_0x108428(0x8d5)](_0x233e0f,'[',']');}),_0x43f4ea=_0x43f4ea['replace'](/<(.*?)>/g,(_0x17901f,_0x29e7c1)=>{const _0x4767b9=_0x3c57e3;return VisuMZ[_0x4767b9(0x8d5)](_0x29e7c1,'<','>');}),_0x43f4ea=_0x43f4ea[_0x3c57e3(0x5a2)](/\{\{(.*?)\}\}/g,(_0x55660b,_0x52ee6c)=>{const _0x49dc09=_0x3c57e3;return VisuMZ[_0x49dc09(0x8d5)](_0x52ee6c,'','');}),_0x43f4ea=_0x43f4ea[_0x3c57e3(0x5a2)](/(\d+\.?\d*)/g,(_0xeadb80,_0x4038ce)=>{const _0x2f5319=_0x3c57e3;let _0x2ab2aa=_0x4038ce;if(_0x2ab2aa[0x0]==='0')return _0x2ab2aa;if(_0x2ab2aa[_0x2ab2aa['length']-0x1]==='.')return Number(_0x2ab2aa)['toLocaleString'](_0x49a744,_0x1da631)+'.';else return _0x2ab2aa[_0x2ab2aa['length']-0x1]===','?Number(_0x2ab2aa)[_0x2f5319(0x40d)](_0x49a744,_0x1da631)+',':Number(_0x2ab2aa)[_0x2f5319(0x40d)](_0x49a744,_0x1da631);});let _0x584088=0x3;while(_0x584088--){_0x43f4ea=VisuMZ['RevertPreserveNumbers'](_0x43f4ea);}return _0x43f4ea;},VisuMZ[_0x45f0a9(0x8d5)]=function(_0x962dbe,_0x3ee7c8,_0x2029cf){const _0x1141e1=_0x45f0a9;return _0x962dbe=_0x962dbe[_0x1141e1(0x5a2)](/(\d)/gi,(_0x1a2084,_0x7a12d2)=>'PRESERVCONVERSION(%1)'['format'](Number(_0x7a12d2))),_0x1141e1(0x319)['format'](_0x962dbe,_0x3ee7c8,_0x2029cf);},VisuMZ[_0x45f0a9(0x56f)]=function(_0x55bc84){const _0x217771=_0x45f0a9;return _0x55bc84=_0x55bc84[_0x217771(0x5a2)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x55e632,_0x266f2b)=>Number(parseInt(_0x266f2b))),_0x55bc84;},VisuMZ[_0x45f0a9(0x5f0)]=function(_0x3218a2){const _0x1d15b3=_0x45f0a9;SoundManager[_0x1d15b3(0x5eb)]();if(!Utils[_0x1d15b3(0x668)]()){const _0x357b54=window[_0x1d15b3(0x6d3)](_0x3218a2,_0x1d15b3(0x622));}else{const _0x59f3b7=process[_0x1d15b3(0x327)]==_0x1d15b3(0x4d6)?_0x1d15b3(0x6d3):process[_0x1d15b3(0x327)]==_0x1d15b3(0x16f)?_0x1d15b3(0x231):_0x1d15b3(0x8b0);require(_0x1d15b3(0x780))[_0x1d15b3(0x4f0)](_0x59f3b7+'\x20'+_0x3218a2);}},VisuMZ[_0x45f0a9(0x2fe)]=function(_0x1d83d8,_0x2feff3){const _0x30c720=_0x45f0a9;if(!_0x1d83d8)return'';const _0x5792ce=_0x1d83d8[_0x30c720(0x1cd)]||_0x1d83d8['id'];let _0x398905='';return _0x1d83d8[_0x30c720(0x7ce)]!==undefined&&_0x1d83d8['nickname']!==undefined&&(_0x398905=_0x30c720(0x636)[_0x30c720(0x525)](_0x5792ce,_0x2feff3)),_0x1d83d8[_0x30c720(0x658)]!==undefined&&_0x1d83d8[_0x30c720(0x841)]!==undefined&&(_0x398905='Class-%1-%2'[_0x30c720(0x525)](_0x5792ce,_0x2feff3)),_0x1d83d8[_0x30c720(0x570)]!==undefined&&_0x1d83d8[_0x30c720(0x846)]!==undefined&&(_0x398905=_0x30c720(0x84c)[_0x30c720(0x525)](_0x5792ce,_0x2feff3)),_0x1d83d8[_0x30c720(0x51d)]!==undefined&&_0x1d83d8[_0x30c720(0x85c)]!==undefined&&(_0x398905=_0x30c720(0x7fc)[_0x30c720(0x525)](_0x5792ce,_0x2feff3)),_0x1d83d8[_0x30c720(0x4a4)]!==undefined&&_0x1d83d8['etypeId']===0x1&&(_0x398905=_0x30c720(0x307)[_0x30c720(0x525)](_0x5792ce,_0x2feff3)),_0x1d83d8[_0x30c720(0x1dc)]!==undefined&&_0x1d83d8[_0x30c720(0x305)]>0x1&&(_0x398905=_0x30c720(0x818)[_0x30c720(0x525)](_0x5792ce,_0x2feff3)),_0x1d83d8['dropItems']!==undefined&&_0x1d83d8[_0x30c720(0x2e4)]!==undefined&&(_0x398905=_0x30c720(0x51b)[_0x30c720(0x525)](_0x5792ce,_0x2feff3)),_0x1d83d8[_0x30c720(0x86f)]!==undefined&&_0x1d83d8['maxTurns']!==undefined&&(_0x398905=_0x30c720(0x46d)[_0x30c720(0x525)](_0x5792ce,_0x2feff3)),_0x398905;},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x7b4)]=function(_0x3f8038,_0x4c3e25){const _0x156b2b=_0x45f0a9,_0x5585a6=ImageManager['standardIconWidth']||0x20,_0x41d87b=ImageManager[_0x156b2b(0x8c9)]||0x20;if(_0x4c3e25[_0x156b2b(0x88a)]){const _0x54df80=_0x5585a6-ImageManager[_0x156b2b(0x6e8)],_0xdb33af=_0x41d87b-ImageManager['iconHeight'];let _0x542630=0x2,_0x57c780=0x2;this[_0x156b2b(0x59c)]()!==0x24&&(_0x57c780=Math[_0x156b2b(0x5ae)]((this['lineHeight']()-_0x41d87b)/0x2));const _0xcc97a=_0x4c3e25['x']+Math[_0x156b2b(0x5ae)](_0x54df80/0x2)+_0x542630,_0x29f756=_0x4c3e25['y']+Math['floor'](_0xdb33af/0x2)+_0x57c780;this[_0x156b2b(0x2df)](_0x3f8038,_0xcc97a,_0x29f756);}_0x4c3e25['x']+=_0x5585a6+0x4;},Window_StatusBase[_0x45f0a9(0x7bc)][_0x45f0a9(0x3a3)]=function(_0x21a5ba,_0x3df8f3,_0x48050d,_0x13d3aa){const _0x40821a=_0x45f0a9;_0x13d3aa=_0x13d3aa||0x90;const _0x82f7ba=ImageManager[_0x40821a(0x706)]||0x20,_0x29fc5a=ImageManager[_0x40821a(0x8c9)]||0x20,_0x4a008e=_0x82f7ba-ImageManager[_0x40821a(0x6e8)],_0x1323e5=_0x29fc5a-ImageManager[_0x40821a(0x746)],_0x9a8a8e=_0x82f7ba,_0x427757=_0x21a5ba[_0x40821a(0x4ae)]()[_0x40821a(0x4ef)](0x0,Math[_0x40821a(0x5ae)](_0x13d3aa/_0x9a8a8e));let _0x1292a0=_0x3df8f3+Math[_0x40821a(0x7b9)](_0x4a008e/0x2),_0x27e2ca=_0x48050d+Math['ceil'](_0x1323e5/0x2);for(const _0x310fb3 of _0x427757){this[_0x40821a(0x2df)](_0x310fb3,_0x1292a0,_0x27e2ca),_0x1292a0+=_0x9a8a8e;}},Game_Picture[_0x45f0a9(0x7bc)]['anchor']=function(){const _0x54197d=_0x45f0a9;return this[_0x54197d(0x1a6)];},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x421)]=Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x495)],Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x495)]=function(){const _0x2756c2=_0x45f0a9;VisuMZ['CoreEngine'][_0x2756c2(0x421)][_0x2756c2(0x573)](this),this[_0x2756c2(0x1a6)]={'x':0x0,'y':0x0},this[_0x2756c2(0x2f7)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x45f0a9(0x850)]=Game_Picture['prototype'][_0x45f0a9(0x3e4)],Game_Picture['prototype']['updateMove']=function(){const _0x51a482=_0x45f0a9;this[_0x51a482(0x88f)]();const _0x2ed63e=this[_0x51a482(0x596)];VisuMZ['CoreEngine'][_0x51a482(0x850)][_0x51a482(0x573)](this),_0x2ed63e>0x0&&this[_0x51a482(0x596)]<=0x0&&(this['_x']=this[_0x51a482(0x7bb)],this['_y']=this[_0x51a482(0x6bd)],this[_0x51a482(0x4dd)]=this[_0x51a482(0x22a)],this[_0x51a482(0x6b6)]=this[_0x51a482(0x6b9)],this[_0x51a482(0x2aa)]=this[_0x51a482(0x450)],this['_anchor']&&(this[_0x51a482(0x1a6)]['x']=this[_0x51a482(0x2f7)]['x'],this[_0x51a482(0x1a6)]['y']=this[_0x51a482(0x2f7)]['y']));},VisuMZ[_0x45f0a9(0x601)]['Game_Picture_show']=Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x5c3)],Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x5c3)]=function(_0x209de4,_0x48c9c1,_0x4704e7,_0x56eaac,_0x497bdf,_0xc4ad5f,_0x2e8a19,_0x5755d2){const _0x491445=_0x45f0a9;VisuMZ[_0x491445(0x601)]['Game_Picture_show'][_0x491445(0x573)](this,_0x209de4,_0x48c9c1,_0x4704e7,_0x56eaac,_0x497bdf,_0xc4ad5f,_0x2e8a19,_0x5755d2),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x48c9c1]||{'x':0x0,'y':0x0});},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x588)]=Game_Picture['prototype'][_0x45f0a9(0x2f0)],Game_Picture[_0x45f0a9(0x7bc)]['move']=function(_0x5dadd3,_0x52a1ae,_0x2eebc8,_0x26fcc0,_0x1f906d,_0x5128be,_0x1ed184,_0x424ef3,_0x321475){const _0x4265b7=_0x45f0a9;VisuMZ[_0x4265b7(0x601)][_0x4265b7(0x588)][_0x4265b7(0x573)](this,_0x5dadd3,_0x52a1ae,_0x2eebc8,_0x26fcc0,_0x1f906d,_0x5128be,_0x1ed184,_0x424ef3,_0x321475),this[_0x4265b7(0x7a8)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5dadd3]||{'x':0x0,'y':0x0});},Game_Picture[_0x45f0a9(0x7bc)]['updateAnchor']=function(){const _0x1fb57a=_0x45f0a9;this['_duration']>0x0&&(this[_0x1fb57a(0x1a6)]['x']=this[_0x1fb57a(0x407)](this[_0x1fb57a(0x1a6)]['x'],this['_targetAnchor']['x']),this[_0x1fb57a(0x1a6)]['y']=this[_0x1fb57a(0x407)](this[_0x1fb57a(0x1a6)]['y'],this['_targetAnchor']['y']));},Game_Picture['prototype'][_0x45f0a9(0x86a)]=function(_0x5c4924){const _0x39a265=_0x45f0a9;this['_anchor']=_0x5c4924,this['_targetAnchor']=JsonEx[_0x39a265(0x3c2)](this[_0x39a265(0x1a6)]);},Game_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x7a8)]=function(_0x36c903){this['_targetAnchor']=_0x36c903;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x4b2)]=Sprite_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x8bd)],Sprite_Picture[_0x45f0a9(0x7bc)][_0x45f0a9(0x8bd)]=function(){const _0x1487bb=_0x45f0a9,_0x3252a9=this['picture']();!_0x3252a9[_0x1487bb(0x62d)]()?VisuMZ[_0x1487bb(0x601)]['Sprite_Picture_updateOrigin'][_0x1487bb(0x573)](this):(this['anchor']['x']=_0x3252a9[_0x1487bb(0x62d)]()['x'],this['anchor']['y']=_0x3252a9['anchor']()['y']);},Game_Action['prototype'][_0x45f0a9(0x606)]=function(_0xce2532){const _0x2efa49=_0x45f0a9;if(_0xce2532){const _0x50490d=_0xce2532[_0x2efa49(0x73e)];if(_0x50490d===0x1&&this[_0x2efa49(0x644)]()[_0x2efa49(0x275)]()!==0x1)this[_0x2efa49(0x223)]();else _0x50490d===0x2&&this[_0x2efa49(0x644)]()[_0x2efa49(0x32d)]()!==0x2?this['setGuard']():this['setSkill'](_0x50490d);}else this['clear']();},Game_Actor['prototype'][_0x45f0a9(0x89c)]=function(){const _0x499e27=_0x45f0a9;return this[_0x499e27(0x78a)]()['filter'](_0x5202a0=>this['canUse'](_0x5202a0)&&this[_0x499e27(0x884)]()[_0x499e27(0x65f)](_0x5202a0[_0x499e27(0x570)]));},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x446)]=function(){const _0x1b2411=_0x45f0a9;this[_0x1b2411(0x773)]=new Sprite(),this['_dimmerSprite'][_0x1b2411(0x6e7)]=new Bitmap(0x0,0x0),this[_0x1b2411(0x773)]['x']=0x0,this['addChildToBack'](this[_0x1b2411(0x773)]);},Window_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x2b8)]=function(){const _0x21a58a=_0x45f0a9;if(this['_dimmerSprite']){const _0x4ed14f=this[_0x21a58a(0x773)][_0x21a58a(0x6e7)],_0x4e9086=this['width'],_0x648566=this[_0x21a58a(0x2a5)],_0x468694=this[_0x21a58a(0x56e)],_0x3e93ac=ColorManager[_0x21a58a(0x486)](),_0x4d82e1=ColorManager[_0x21a58a(0x1e2)]();_0x4ed14f[_0x21a58a(0x669)](_0x4e9086,_0x648566),_0x4ed14f['gradientFillRect'](0x0,0x0,_0x4e9086,_0x468694,_0x4d82e1,_0x3e93ac,!![]),_0x4ed14f['fillRect'](0x0,_0x468694,_0x4e9086,_0x648566-_0x468694*0x2,_0x3e93ac),_0x4ed14f[_0x21a58a(0x1ea)](0x0,_0x648566-_0x468694,_0x4e9086,_0x468694,_0x3e93ac,_0x4d82e1,!![]),this[_0x21a58a(0x773)][_0x21a58a(0x36a)](0x0,0x0,_0x4e9086,_0x648566);}},Game_Actor[_0x45f0a9(0x7bc)]['makeAutoBattleActions']=function(){const _0x3b2033=_0x45f0a9;for(let _0xe7cba8=0x0;_0xe7cba8<this['numActions']();_0xe7cba8++){const _0x472ab2=this[_0x3b2033(0x15f)]();let _0x1a77c6=Number['MIN_SAFE_INTEGER'];this[_0x3b2033(0x382)](_0xe7cba8,_0x472ab2[0x0]);for(const _0x69953d of _0x472ab2){const _0x201046=_0x69953d[_0x3b2033(0x2d1)]();_0x201046>_0x1a77c6&&(_0x1a77c6=_0x201046,this[_0x3b2033(0x382)](_0xe7cba8,_0x69953d));}}this[_0x3b2033(0x56d)](_0x3b2033(0x656));},Window_BattleItem[_0x45f0a9(0x7bc)][_0x45f0a9(0x363)]=function(_0x5132cb){const _0x160b27=_0x45f0a9;return BattleManager[_0x160b27(0x592)]()?BattleManager[_0x160b27(0x592)]()['canUse'](_0x5132cb):Window_ItemList[_0x160b27(0x7bc)][_0x160b27(0x363)][_0x160b27(0x573)](this,_0x5132cb);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x373)]=Scene_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x448)],Scene_Map[_0x45f0a9(0x7bc)]['createSpriteset']=function(){const _0x171e34=_0x45f0a9;VisuMZ[_0x171e34(0x601)][_0x171e34(0x373)][_0x171e34(0x573)](this);const _0x32bd3a=this[_0x171e34(0x29e)][_0x171e34(0x3df)];if(_0x32bd3a)this[_0x171e34(0x2c5)](_0x32bd3a);},VisuMZ[_0x45f0a9(0x601)]['Scene_Battle_createSpritesetFix']=Scene_Battle[_0x45f0a9(0x7bc)][_0x45f0a9(0x448)],Scene_Battle[_0x45f0a9(0x7bc)][_0x45f0a9(0x448)]=function(){const _0x185e4e=_0x45f0a9;VisuMZ['CoreEngine']['Scene_Battle_createSpritesetFix'][_0x185e4e(0x573)](this);const _0x538188=this['_spriteset']['_timerSprite'];if(_0x538188)this['addChild'](_0x538188);},Sprite_Actor[_0x45f0a9(0x7bc)][_0x45f0a9(0x314)]=function(){const _0x4f0255=_0x45f0a9;Sprite_Battler[_0x4f0255(0x7bc)][_0x4f0255(0x314)][_0x4f0255(0x573)](this),this[_0x4f0255(0x46b)]();if(this[_0x4f0255(0x828)])this['updateMotion']();else this[_0x4f0255(0x303)]!==''&&(this[_0x4f0255(0x303)]='');},Window[_0x45f0a9(0x7bc)][_0x45f0a9(0x851)]=function(){const _0x4ec235=_0x45f0a9,_0x5ddf17=this[_0x4ec235(0x70b)],_0x3c5f0d=this[_0x4ec235(0x514)],_0x104654=0x18,_0x79f518=_0x104654/0x2,_0x5b3b0e=0x60+_0x104654,_0x49c6a2=0x0+_0x104654;this[_0x4ec235(0x602)]['bitmap']=this['_windowskin'],this['_downArrowSprite'][_0x4ec235(0x62d)]['x']=0.5,this['_downArrowSprite'][_0x4ec235(0x62d)]['y']=0.5,this[_0x4ec235(0x602)][_0x4ec235(0x36a)](_0x5b3b0e+_0x79f518,_0x49c6a2+_0x79f518+_0x104654,_0x104654,_0x79f518),this[_0x4ec235(0x602)][_0x4ec235(0x2f0)](Math['round'](_0x5ddf17/0x2),Math[_0x4ec235(0x640)](_0x3c5f0d-_0x79f518)),this[_0x4ec235(0x827)]['bitmap']=this[_0x4ec235(0x4c6)],this[_0x4ec235(0x827)][_0x4ec235(0x62d)]['x']=0.5,this[_0x4ec235(0x827)]['anchor']['y']=0.5,this['_upArrowSprite']['setFrame'](_0x5b3b0e+_0x79f518,_0x49c6a2,_0x104654,_0x79f518),this[_0x4ec235(0x827)][_0x4ec235(0x2f0)](Math[_0x4ec235(0x640)](_0x5ddf17/0x2),Math[_0x4ec235(0x640)](_0x79f518));},Window[_0x45f0a9(0x7bc)][_0x45f0a9(0x12f)]=function(){const _0x2f2753=_0x45f0a9,_0x594685=0x90,_0x4a0dd9=0x60,_0x16b7ed=0x18;this['_pauseSignSprite']['bitmap']=this['_windowskin'],this['_pauseSignSprite'][_0x2f2753(0x62d)]['x']=0.5,this[_0x2f2753(0x28f)][_0x2f2753(0x62d)]['y']=0x1,this[_0x2f2753(0x28f)][_0x2f2753(0x2f0)](Math[_0x2f2753(0x640)](this['_width']/0x2),this['_height']),this[_0x2f2753(0x28f)][_0x2f2753(0x36a)](_0x594685,_0x4a0dd9,_0x16b7ed,_0x16b7ed),this[_0x2f2753(0x28f)][_0x2f2753(0x203)]=0xff;},Window[_0x45f0a9(0x7bc)][_0x45f0a9(0x5fd)]=function(){const _0x2e42a9=_0x45f0a9,_0x3445d5=this[_0x2e42a9(0x6d1)]['worldTransform'][_0x2e42a9(0x3ab)](new Point(0x0,0x0)),_0x317b67=this[_0x2e42a9(0x6d1)][_0x2e42a9(0x1d7)];_0x317b67['x']=_0x3445d5['x']+this['origin']['x'],_0x317b67['y']=_0x3445d5['y']+this[_0x2e42a9(0x207)]['y'],_0x317b67[_0x2e42a9(0x4bc)]=Math[_0x2e42a9(0x7b9)](this['innerWidth']*this['scale']['x']),_0x317b67[_0x2e42a9(0x2a5)]=Math['ceil'](this[_0x2e42a9(0x65a)]*this[_0x2e42a9(0x5e2)]['y']);},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x40e)]=Window[_0x45f0a9(0x7bc)]['_refreshBack'],Window['prototype'][_0x45f0a9(0x80a)]=function(){const _0x20bf27=_0x45f0a9,_0x2fbb1a=VisuMZ['CoreEngine'][_0x20bf27(0x5ba)][_0x20bf27(0x74d)]['CorrectSkinBleeding']??!![];if(!_0x2fbb1a)return VisuMZ[_0x20bf27(0x601)][_0x20bf27(0x40e)][_0x20bf27(0x573)](this);const _0x186b2c=this[_0x20bf27(0x488)],_0x5d6d7a=Math[_0x20bf27(0x5dc)](0x0,this['_width']-_0x186b2c*0x2),_0x563838=Math['max'](0x0,this['_height']-_0x186b2c*0x2),_0x5a7338=this[_0x20bf27(0x44c)],_0x3fec5e=_0x5a7338[_0x20bf27(0x778)][0x0];_0x5a7338[_0x20bf27(0x6e7)]=this['_windowskin'],_0x5a7338[_0x20bf27(0x36a)](0x0,0x0,0x60,0x60),_0x5a7338[_0x20bf27(0x2f0)](_0x186b2c,_0x186b2c),_0x5a7338['scale']['x']=_0x5d6d7a/0x60,_0x5a7338[_0x20bf27(0x5e2)]['y']=_0x563838/0x60,_0x3fec5e['bitmap']=this[_0x20bf27(0x4c6)],_0x3fec5e[_0x20bf27(0x36a)](0x0,0x60,0x60,0x60),_0x3fec5e[_0x20bf27(0x2f0)](0x0,0x0,_0x5d6d7a,_0x563838),_0x3fec5e[_0x20bf27(0x5e2)]['x']=0x1/_0x5a7338[_0x20bf27(0x5e2)]['x'],_0x3fec5e[_0x20bf27(0x5e2)]['y']=0x1/_0x5a7338[_0x20bf27(0x5e2)]['y'],_0x5a7338[_0x20bf27(0x2e7)](this['_colorTone']);},Game_Temp['prototype'][_0x45f0a9(0x40f)]=function(){const _0x2151b7=_0x45f0a9;this[_0x2151b7(0x807)]=[],this[_0x2151b7(0x1cf)]=[],this[_0x2151b7(0x216)]=[],this[_0x2151b7(0x731)]=[];},VisuMZ['CoreEngine']['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x6b8)],Scene_Base[_0x45f0a9(0x7bc)][_0x45f0a9(0x6b8)]=function(){const _0x116e26=_0x45f0a9;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x116e26(0x601)][_0x116e26(0x504)]['call'](this);},Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x1b9)]=function(_0x328422){const _0x301c1c=_0x45f0a9,_0x55ffed=this[_0x301c1c(0x769)];_0x55ffed['save'](),_0x55ffed[_0x301c1c(0x60a)]=this[_0x301c1c(0x832)]();const _0x57a342=_0x55ffed[_0x301c1c(0x3ca)](_0x328422)[_0x301c1c(0x4bc)];return _0x55ffed['restore'](),_0x57a342;},Window_Message[_0x45f0a9(0x7bc)][_0x45f0a9(0x1f4)]=function(_0x271307){const _0x1d553d=_0x45f0a9;return this[_0x1d553d(0x22f)]()?this[_0x1d553d(0x629)]['measureTextWidthNoRounding'](_0x271307):Window_Base[_0x1d553d(0x7bc)][_0x1d553d(0x1f4)][_0x1d553d(0x573)](this,_0x271307);},Window_Message['prototype'][_0x45f0a9(0x22f)]=function(){const _0x2d5ecd=_0x45f0a9;return VisuMZ[_0x2d5ecd(0x601)][_0x2d5ecd(0x5ba)]['QoL']['FontWidthFix']??!![];},VisuMZ[_0x45f0a9(0x601)]['Game_Action_numRepeats']=Game_Action[_0x45f0a9(0x7bc)][_0x45f0a9(0x414)],Game_Action[_0x45f0a9(0x7bc)]['numRepeats']=function(){const _0x3558d6=_0x45f0a9;return this['item']()?VisuMZ[_0x3558d6(0x601)][_0x3558d6(0x3cc)][_0x3558d6(0x573)](this):0x0;},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x27a)]=Game_Action[_0x45f0a9(0x7bc)][_0x45f0a9(0x223)],Game_Action[_0x45f0a9(0x7bc)]['setAttack']=function(){const _0x3ffeab=_0x45f0a9;if(this['subject']()&&this[_0x3ffeab(0x644)]()[_0x3ffeab(0x53f)]())VisuMZ[_0x3ffeab(0x601)][_0x3ffeab(0x27a)][_0x3ffeab(0x573)](this);else BattleManager[_0x3ffeab(0x600)]?VisuMZ[_0x3ffeab(0x601)]['Game_Action_setAttack'][_0x3ffeab(0x573)](this):this[_0x3ffeab(0x1d9)]();},VisuMZ['CoreEngine'][_0x45f0a9(0x380)]=BattleManager[_0x45f0a9(0x7c8)],BattleManager[_0x45f0a9(0x7c8)]=function(_0x35efb5,_0x8e18e9){const _0x41e869=_0x45f0a9;this[_0x41e869(0x600)]=!![],VisuMZ[_0x41e869(0x601)]['BattleManager_invokeCounterAttack'][_0x41e869(0x573)](this,_0x35efb5,_0x8e18e9),this[_0x41e869(0x600)]=undefined;},Sprite_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x160)]=function(){return 0x24;},Sprite_Name[_0x45f0a9(0x7bc)][_0x45f0a9(0x23f)]=function(){const _0x3b87ef=_0x45f0a9,_0x278a26=this[_0x3b87ef(0x3d0)](),_0x1c0510=this[_0x3b87ef(0x5a3)](),_0x49c175=this[_0x3b87ef(0x160)]();this[_0x3b87ef(0x2ce)](),this[_0x3b87ef(0x6e7)][_0x3b87ef(0x1d9)](),this[_0x3b87ef(0x6e7)][_0x3b87ef(0x1d5)](_0x278a26,0x4,0x0,_0x1c0510-0xa,_0x49c175,_0x3b87ef(0x902));},Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x1d5)]=function(_0x509d2c,_0x250a84,_0x5cf984,_0xb27d7,_0x41faa1,_0x42c8f4){const _0x5e660a=_0x45f0a9,_0x36452a=this['context'],_0x1e8af3=_0x36452a[_0x5e660a(0x4de)];_0xb27d7=_0xb27d7||0xffffffff;let _0x12515c=_0x250a84,_0x2617eb=Math[_0x5e660a(0x640)](_0x5cf984+0x18/0x2+this[_0x5e660a(0x30c)]*0.35);_0x42c8f4===_0x5e660a(0x76a)&&(_0x12515c+=_0xb27d7/0x2),_0x42c8f4===_0x5e660a(0x7af)&&(_0x12515c+=_0xb27d7),_0x36452a[_0x5e660a(0x8db)](),_0x36452a[_0x5e660a(0x60a)]=this['_makeFontNameText'](),_0x36452a[_0x5e660a(0x740)]=_0x42c8f4,_0x36452a[_0x5e660a(0x44a)]=_0x5e660a(0x6c2),_0x36452a[_0x5e660a(0x4de)]=0x1,this[_0x5e660a(0x419)](_0x509d2c,_0x12515c,_0x2617eb,_0xb27d7),_0x36452a[_0x5e660a(0x4de)]=_0x1e8af3,this[_0x5e660a(0x144)](_0x509d2c,_0x12515c,_0x2617eb,_0xb27d7),_0x36452a[_0x5e660a(0x48f)](),this['_baseTexture'][_0x5e660a(0x314)]();},VisuMZ[_0x45f0a9(0x601)]['BattleManager_checkSubstitute']=BattleManager[_0x45f0a9(0x781)],BattleManager[_0x45f0a9(0x781)]=function(_0x299b93){const _0x35f160=_0x45f0a9;if(this[_0x35f160(0x316)]&&this[_0x35f160(0x316)][_0x35f160(0x29a)]()===_0x299b93[_0x35f160(0x29a)]())return![];return VisuMZ[_0x35f160(0x601)][_0x35f160(0x663)]['call'](this,_0x299b93);},BattleManager['endAction']=function(){const _0x26b7ec=_0x45f0a9;if(this['_subject'])this[_0x26b7ec(0x892)][_0x26b7ec(0x68a)](this['_subject']);this[_0x26b7ec(0x84b)]='turn',this[_0x26b7ec(0x316)]&&this[_0x26b7ec(0x316)]['numActions']()===0x0&&(this[_0x26b7ec(0x751)](this[_0x26b7ec(0x316)]),this[_0x26b7ec(0x316)]=null);},Bitmap[_0x45f0a9(0x7bc)][_0x45f0a9(0x330)]=function(){const _0x470015=_0x45f0a9;this[_0x470015(0x7e7)]=new Image(),this[_0x470015(0x7e7)][_0x470015(0x1bf)]=this[_0x470015(0x2eb)][_0x470015(0x159)](this),this['_image'][_0x470015(0x464)]=this[_0x470015(0x254)][_0x470015(0x159)](this),this['_destroyCanvas'](),this['_loadingState']=_0x470015(0x84e),Utils['hasEncryptedImages']()?this[_0x470015(0x3c5)]():(this['_image'][_0x470015(0x2e5)]=this['_url'],![]&&this[_0x470015(0x7e7)]['width']>0x0&&(this['_image'][_0x470015(0x1bf)]=null,this[_0x470015(0x2eb)]()));},Scene_Skill[_0x45f0a9(0x7bc)]['onActorChange']=function(){const _0x5316a7=_0x45f0a9;Scene_MenuBase[_0x5316a7(0x7bc)][_0x5316a7(0x31e)][_0x5316a7(0x573)](this),this[_0x5316a7(0x6b5)](),this['_itemWindow']['deactivate'](),this['_itemWindow'][_0x5316a7(0x7dd)](),this[_0x5316a7(0x12d)][_0x5316a7(0x7d2)]();},Scene_Skill[_0x45f0a9(0x7bc)][_0x45f0a9(0x3b0)]=function(){const _0x4953bd=_0x45f0a9;return this[_0x4953bd(0x12d)]&&this[_0x4953bd(0x12d)][_0x4953bd(0x53c)];},Game_Map[_0x45f0a9(0x7bc)][_0x45f0a9(0x721)]=function(_0x1e067e,_0x263054,_0x229275){const _0x2d33c4=_0x45f0a9,_0x46e8e8=this[_0x2d33c4(0x8cd)](),_0x2146a8=this[_0x2d33c4(0x3e3)](_0x1e067e,_0x263054);for(const _0x53d353 of _0x2146a8){const _0x1f39f1=_0x46e8e8[_0x53d353];if(_0x1f39f1===undefined||_0x1f39f1===null){if($gameTemp[_0x2d33c4(0x88e)]()&&!DataManager[_0x2d33c4(0x904)]()){let _0xcb4062=_0x2d33c4(0x4ac)+'\x0a';_0xcb4062+='Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages'+'\x0a',_0xcb4062+=_0x2d33c4(0x76f);if(this[_0x2d33c4(0x5cb)]())alert(_0xcb4062),SceneManager[_0x2d33c4(0x34b)]();else{if(!this['_displayedPassageError'])console['log'](_0xcb4062);this[_0x2d33c4(0x1e6)]=!![];}}}if((_0x1f39f1&0x10)!==0x0)continue;if((_0x1f39f1&_0x229275)===0x0)return!![];if((_0x1f39f1&_0x229275)===_0x229275)return![];}return![];},Game_Map['prototype']['showIncompleteTilesetError']=function(){const _0x16595c=_0x45f0a9;if(Imported[_0x16595c(0x1ee)])return!![];if(Imported[_0x16595c(0x7c7)])return!![];return![];},Sprite_Animation[_0x45f0a9(0x7bc)][_0x45f0a9(0x899)]=function(_0x63e48){const _0x5b82c2=_0x45f0a9;!this[_0x5b82c2(0x80b)]&&(this['_originalViewport']=_0x63e48['gl']['getParameter'](_0x63e48['gl']['VIEWPORT']));},VisuMZ[_0x45f0a9(0x601)][_0x45f0a9(0x5e7)]=Scene_Map[_0x45f0a9(0x7bc)]['shouldAutosave'],Scene_Map[_0x45f0a9(0x7bc)]['shouldAutosave']=function(){const _0x49721e=_0x45f0a9,_0x526452=SceneManager['_previousClass'][_0x49721e(0x3d0)];if(['Scene_Title',_0x49721e(0x8d7),_0x49721e(0x127),_0x49721e(0x32e)]['includes'](_0x526452))return![];return VisuMZ[_0x49721e(0x601)][_0x49721e(0x5e7)][_0x49721e(0x573)](this);},VisuMZ['CoreEngine'][_0x45f0a9(0x145)]=Window_SkillList[_0x45f0a9(0x7bc)]['includes'],Window_SkillList[_0x45f0a9(0x7bc)][_0x45f0a9(0x65f)]=function(_0x1889fb){const _0x3a004e=_0x45f0a9;if(this[_0x3a004e(0x6d0)]<=0x0)return![];return VisuMZ[_0x3a004e(0x601)][_0x3a004e(0x145)]['call'](this,_0x1889fb);},VisuMZ[_0x45f0a9(0x601)]['Game_Battler_initTpbChargeTime']=Game_Battler['prototype']['initTpbChargeTime'],Game_Battler[_0x45f0a9(0x7bc)][_0x45f0a9(0x66c)]=function(_0x23cc02){const _0x5a905b=_0x45f0a9;VisuMZ[_0x5a905b(0x601)][_0x5a905b(0x2ca)]['call'](this,_0x23cc02),isNaN(this['_tpbChargeTime'])&&(VisuMZ['CoreEngine'][_0x5a905b(0x2ca)][_0x5a905b(0x573)](this,_0x23cc02),isNaN(this['_tpbChargeTime'])&&(this[_0x5a905b(0x71d)]=0x0));},Game_Battler[_0x45f0a9(0x7bc)][_0x45f0a9(0x531)]=function(){const _0x1f19df=_0x45f0a9;this[_0x1f19df(0x7d3)]===_0x1f19df(0x70d)&&(this['_tpbChargeTime']+=this[_0x1f19df(0x3ad)](),isNaN(this['_tpbChargeTime'])&&(this[_0x1f19df(0x71d)]=this['tpbAcceleration'](),isNaN(this[_0x1f19df(0x71d)])&&(this[_0x1f19df(0x71d)]=0x0)),this[_0x1f19df(0x71d)]>=0x1&&(this[_0x1f19df(0x71d)]=0x1,this[_0x1f19df(0x54b)]()));};