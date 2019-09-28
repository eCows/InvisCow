var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var Button = android.widget.Button;
var LinearLayout = android.widget.LinearLayout;
var RelativeLayout = android.widget.RelativeLayout;
var PopupWindow = android.widget.PopupWindow;
var ScrollView = android.widget.ScrollView;
var TextView = android.widget.TextView;
var CheckBox = android.widget.CheckBox;
var Switch = android.widget.Switch;
var Toast = android.widget.Toast;
var Runnable = java.lang.Runnable;
var View = android.view.View;
var ColorDrawable = android.graphics.drawable.ColorDrawable;
var Color = android.graphics.Color;
var Gravity = android.view.Gravity;
var Intent = android.content.Intent;
var Uri = android.net.Uri;

var HudBtn;
var Tab;
var Tab2;
var TabScroll;
var TabGUI;

var reach = 1.2;
var speed = 21;
var max = 2;
var hitbox = false;
var ce = false;
var sprint = false;
var waterfly = false;
var glide = false;
var taptp = false;
var tapjet = false;
var autoswitch = false;
var hitaim = false;
var switcher = false;
var bow = false;
var saddle = false;
var showname = false;
var reachaura = false;
var behindhit = false;
var randomtp = false;
var forcetp = false;
var autopot = false;
var fly = false;
var elytra = false;
var gamemode = false;
var hitspam = false;
var sk = false;
var tw = false;
var v = false;
var bce = false;
var ss = false;
var ss3 = false;
var ss4 = false;
var swap = false;
var msg = false;
var ternary = false;
var toggler = false;
var quad = false;
var stackpots = false;
var scaffold = false;
var namestore = "MURDERER"

ctx.runOnUiThread(new Runnable(
{
    run: function ()
    {
        try
        {
        
        
        
            Tab = new LinearLayout(ctx);
            Tab2 = new LinearLayout(ctx);
            TabScroll = new ScrollView(ctx);

            TabScroll.addView(Tab);
            Tab2.addView(TabScroll);

            Tab.setOrientation(1);
            Tab2.setOrientation(1);

            HudBtn = new Button(ctx);
            HudBtn.setText("L");
            HudBtn.setBackgroundColor(Color.BLACK);
            HudBtn.setTextColor(Color.TRANSPARENT);
			HudBtn.setGravity(Gravity.CENTER);
            HudBtn.getBackground()
                .setAlpha(0);
            HudBtn.setOnClickListener(new View.OnClickListener(
            {
                onClick: function (viewarg)
                {
	  if(msg == false){
      msg = true;
	  Server.sendChat("./kit nodebuff");
	  }else{
	  msg = false;
	  Server.sendChat("./kit nodebuff");
    }
			}}));
            Tab.addView(HudBtn, 150, 130);
            
            
            TabGUI = new android.widget.PopupWindow(Tab2, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
            TabGUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
            TabGUI.showAtLocation(ctx.getWindow()
                .getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 20);
				
                }
        catch (err)
        {
            Toast.makeText(ctx, "An error occured: " + err, 1)
                .show();
        }
    }
}));

Array.prototype.getRandomElement = function() {
	return this[Math.floor(Math.random() * this.length)];
}
var Utils = {        
            Block: {
                 isLiquid: function(id) {
			if(id >= 8 && id <= 11) return true;
			return false;
		         }
            },
            Player: {
                isInWater: function() {
			if(Utils.Block.isLiquid(getTile(Entity.getX(getPlayerEnt()), Entity.getY(getPlayerEnt()) - 1.65, Entity.getZ(getPlayerEnt())))) {
            return true;
            } else {
			return false;
			   }
		    },
                isOnGround: function() {
			var y = Entity.getY(getPlayerEnt());
			while(y > 1) y -= 1;
			if((Math.round(y * 100) >= 61 && Math.round(y * 100) <= 63) && getTile(Entity.getX(getPlayerEnt()), Entity.getY(getPlayerEnt()) - 1.65, Entity.getZ(getPlayerEnt())) != 0 && !Utils.Block.isLiquid(getTile(Entity.getX(getPlayerEnt()), Entity.getY(getPlayerEnt()) - 1.65, Entity.getZ(getPlayerEnt())))) {
            return true;
            }
			if((Math.round(y * 100) >= 11 && Math.round(y * 100) <= 13) && getTile(Entity.getX(getPlayerEnt()), Entity.getY(getPlayerEnt()) - 1.65, Entity.getZ(getPlayerEnt())) != 0 && !Utils.Block.isLiquid(getTile(Entity.getX(getPlayerEnt()), Entity.getY(getPlayerEnt()) - 1.65, Entity.getZ(getPlayerEnt())))) {
            return true;
            } else {
			return false;
			  }
		    },
            isCollidedHorizontally: function() {
			var x = Entity.getX(getPlayerEnt());
			var z = Entity.getZ(getPlayerEnt());
			var blockX = Math.round(x - 0.5);
			var blockZ = Math.round(z - 0.5);
			while(x < 1) x += 1;
			while(z < 1) z += 1;
			while(x > 1) x -= 1;
			while(z > 1) z -= 1;

			if(Math.round(x * 100) == 31) x -= 0.01;
			if(Math.round(z * 100) == 31) z -= 0.01;
			if(Math.round(x * 100) == 69) x += 0.01;
			if(Math.round(z * 100) == 69) z += 0.01;
			if(Math.round(x * 100) == 30) blockX--;
			if(Math.round(z * 100) == 30) blockZ--;
			if(Math.round(x * 100) == 70) blockX++;
			if(Math.round(z * 100) == 70) blockZ++;
			//clientMessage(blockX+";"+blockZ);
			if(getTile(blockX, Entity.getY(getPlayerEnt()), blockZ) == 0 && getTile(blockX, Entity.getY(getPlayerEnt()) - 1, blockZ) == 0) return false;

			if(Block.getDestroyTime(getTile(blockX, Entity.getY(getPlayerEnt()) - 1, blockZ)) <= 0.1 && Block.getDestroyTime(getTile(blockX, Entity.getY(getPlayerEnt()), blockZ)) <= 0.1) return false;

			if(Math.round(x * 100) == 30 || Math.round(x * 100) == 70) return true;
			if(Math.round(z * 100) == 30 || Math.round(z * 100) == 70) return true;
			return false;
		}
	}
}

var dragon = {
sortPots: function (id, dam) {
if(id == 438){
switch(dam){
case 21:
return 1;
break;
case 22:
return 2;
break;
}
}
}
}

var dragon2 = {
yawDir: function (where, yaw) {
if(where == 0){
if(yaw >= -45 && yaw <= 45){
return true;
}
}
if(where == 1){
if(yaw >= -135 && yaw <= -44){
return true;
}
}
if(where == 2){
if(yaw >= 131 && yaw >= -134 && yaw != -135){
return true;
}
}
if(where == 3){
if(yaw >= 45 && yaw <= 130){
return true;
}}}
}


function chatHook(text){
var spli = text.split(" ");

  if(text == ".help"){
  preventDefault();
  clientMessage("Welcome to InvisCow");
  clientMessage("use . and a number to change hitbox size");
  clientMessage("use / and a number to change CE speed");
  clientMessage("use , and a number to change autopot");
  clientMessage("List of Commands");
  clientMessage(".hitbox");
  clientMessage(".ce");
  clientMessage(".bce");
  clientMessage(".sprint");
  clientMessage(".taptp");
  clientMessage(".tapjet");
  clientMessage(".glide");
  clientMessage(".hitaim");
  clientMessage(".switcher");
  clientMessage(".ss");
  clientMessage(".3switcher");
  clientMessage(".4switcher");
  clientMessage(".saddle");
  clientMessage(".showname");;
  clientMessage(".randomtp");
  clientMessage(".bow")
  clientMessage(".forcetp");
  clientMessage(".autopot");
  clientMessage(".autoswitch");
  clientMessage(".fly");
  clientMessage(".waterfly");
  clientMessage(".gamemode");
  clientMessage(".elytra");
  clientMessage(".hitspam");
  clientMessage(".reachaura");
  clientMessage(".stackpots");
  clientMessage(".scaffold");
  clientMessage(".b");
  clientMessage(".v");
  clientMessage(".l");
  clientMessage(".tw");
  clientMessage(".sk");
  }

  if(spli[0] == ".") {
  preventDefault();
  reach = spli[1];
  clientMessage("Mod => set hitbox size to "+spli[1]);
 }
 
 if(spli[0] == "/") {
  preventDefault();
  speed = spli[1];
  clientMessage("Mod => set Cheat Engine speed to "+spli[1]);
 }
 
  if(spli[0] == ",") {
  preventDefault();
  max = spli[1];
  clientMessage("Mod => set AutoPot trigger health to "+spli[1]);
 }
 
  if(text == ".hitbox"){
  preventDefault();
  if(hitbox == false){
  hitbox = true;
  clientMessage("Mod => Hitbox enabled");
  }else{
  hitbox = false;
  clientMessage("Mod => Hitbox disabled");
  }}
  
  if(text == ".ce"){
  preventDefault();
  if(ce == false){
  ce = true;
  clientMessage("Mod => CheatEngine enabled");
  }else{
  ce = false;
  ModPE.setGameSpeed(20);
  clientMessage("Mod => CheatEngine disabled");
  }}
  
  if(text == ".bce"){
  preventDefault();
  if(bce == false){
  bce = true;
  clientMessage("Mod => BlatantCheatEngine enabled");
  }else{
  bce = false;
  ModPE.setGameSpeed(20);
  clientMessage("Mod => BlatantCheatEngine disabled");
  }}

  if(text == ".glide"){
  preventDefault();
  if(glide == false){
  glide = true;
  clientMessage("Mod => Glide enabled");
  }else{
  glide = false;
  clientMessage("Mod => Glide disabled");
  }}
  
  if(text == ".taptp"){
  preventDefault();
  if(taptp == false){
  taptp = true;
  clientMessage("Mod => TapTeleport enabled");
  }else{
  taptp = false;
  clientMessage("Mod => TapTeleport disabled");
  }}
  
  if(text == ".tapjet"){
  preventDefault();
  if(tapjet == false){
  tapjet = true;
  clientMessage("Mod => TapJet enabled");
  }else{
  tapjet = false;
  clientMessage("Mod => TapJet disabled");
  }}
  
  if(text == ".b"){
  preventDefault();
  if(behindhit == false){
  behindhit = true;
  hitbox = true;
  showname = true;
  reachaura = true;
  fly = true;
  hitaim = true;
  taptp = true;
  clientMessage("Mod => BehindHit enabled");
  }else{
  behindhit = false;
  hitbox = false;
  reachaura = false;
  fly = false;
  hitaim = false;
  taptp = false;
  clientMessage("Mod => BehindHit disabled");
  }}
  
  if(text == ".hitaim"){
  preventDefault();
  if(hitaim == false){
  hitaim = true;
  clientMessage("Mod => HitAim enabled");
  }else{
  hitaim = false;
  clientMessage("Mod => HitAim disabled");
  }}
  
  if(text == ".switcher"){
  preventDefault();
  if(switcher == false){
  switcher = true;
  showname = true;
  ss = false;
  ss3 = false;
  ss4 = false;
  clientMessage("Mod => Switcher enabled");
  }else{
  switcher = false;
  clientMessage("Mod => Switcher disabled");
  }}
  
  if(text == ".saddle"){
  preventDefault();
  if(saddle == false){
  saddle = true;
  clientMessage("Mod => Saddle enabled");
  }else{
  saddle = false;
  clientMessage("Mod => Saddle disabled");
  }}
  
  if(text == ".showname"){
  preventDefault();
  if(showname == false){
  showname = true;
  clientMessage("Mod => ShowName enabled");
  }else{
  showname = false;
  clientMessage("Mod => ShowName disabled");
  }}
  
  if(text == ".l"){
  preventDefault();
  if(reachaura == false){
  reachaura = true;
  hitbox = true;
  showname = true;
  glide = true;
  taptp = true;
  clientMessage("Mod => ReachAura enabled");
  }else{
  reachaura = false;
  hitbox = false;
  glide = false;
  taptp = false;
  clientMessage("Mod => ReachAura disabled");
  }}
  
  if(text == ".reachaura"){
  preventDefault();
  if(reachaura == false){
  reachaura = true;
  hitbox = true;
  showname = true;
  glide = false;
  taptp = true;
  fly = true;
  clientMessage("Mod => ReachAura enabled");
  }else{
  reachaura = false;
  hitbox = false;
  glide = false;
  taptp = false;
  fly = false;
  clientMessage("Mod => ReachAura disabled");
  }}
  
  if(text == ".randomtp"){
  preventDefault();
  if(randomtp == false){
  randomtp = true;
  clientMessage("Mod => RandomTP for MM enabled");
  }else{
  randomtp = false;
  clientMessage("Mod => RandomTP for MM disabled");
  }}
  
  if(text == ".bow"){
  preventDefault();
  if(bow == false){
  bow = true;
  clientMessage("Mod => BowAimbot for MM enabled");
  }else{
  bow = false;
  clientMessage("Mod => BowAimbot for MM disabled");
  }}
  
  if(text == ".fly"){
  preventDefault();
  if(fly == false){
  fly = true;
  glide = false;
  clientMessage("Mod => Fly enabled");
  }else{
  fly = false;
  glide = false;
  clientMessage("Mod => Fly disabled");
  }}
  
  if(text == ".elytra"){
  preventDefault();
  if(elytra == false){
  elytra = true;
  ce = true;
  clientMessage("Mod => Elytra enabled");
  }else{
  elytra = false;
  clientMessage("Mod => Elytra disabled");
  }}
  
  if(text == ".hitspam"){
  preventDefault();
  if(hitspam == false){
  hitspam = true;
  clientMessage("Mod => Hitspam enabled");
  }else{
  hitspam = false;
  clientMessage("Mod => Hitspam disabled");
  }}
  
  if(text == ".forcetp"){
  preventDefault();
  if(forcetp == false){
  forcetp = true;
  clientMessage("Mod => ForceTP enabled");
  }else{
  forcetp = false;
  clientMessage("Mod => ForceTP disabled");
  }}
  
  if(text == ".autopot"){
  preventDefault();
  if(autopot == false){
  autopot = true;
  clientMessage("Mod => AutoPot enabled");
  }else{
  autopot = false;
  clientMessage("Mod => AutoPot disabled");
  }}
  
  if(text == ".gamemode"){
  preventDefault();
  if(gamemode == false){
  gamemode = true;
  clientMessage("Mod => Gamemode enabled");
  }else{
  gamemode = false;
  clientMessage("Mod => Gamemode disabled");
  }}
  
  if(text == ".sprint"){
  preventDefault();
  if(sprint == false){
	  sprint = true;
	  clientMessage("Mod => AutoSprint enabled");
  for(let i = 0; i <= 255; i++) {
  Block.setFriction(i, 0.525);
  }}else{
  clientMessage("Mod => AutoSprint disabled");
  sprint = false;
  Player.setHunger(20);
  for(var i = 0; i < 406; i++){
Block.setFriction(i, .4);
}
Block.setFriction(79, .4);
Block.setFriction(174, .4);
Block.setFriction(207, .4);
Block.setFriction(266, .4);
}}
  
  if(text == ".tw"){
  preventDefault();
  if(tw == false){
  tw = true;
  clientMessage("Mod => TreasureWars Helper enabled");
  }else{
  tw = false;
  clientMessage("Mod => TreasureWars Helper disabled");
  }}
  
  if(text == ".sk"){
  preventDefault();
  if(sk == false){
  sk = true;
  clientMessage("Mod => Spawnkill Helper enabled");
  }else{
  sk = false;
  clientMessage("Mod => Spawnkill Helper disabled");
  }}
  
  if(text == ".waterfly"){
  preventDefault();
  if(waterfly == false){
  waterfly = true;
  clientMessage("Mod => Waterfly enabled");
  }else{
  waterfly = false;
  clientMessage("Mod => Waterfly disabled");
  }}
  
  if(text == ".ss"){
  preventDefault();
  if(ss == false){
  ss = true;
  ss3 = false;
  ss4 = false;
  showname = true;
  ce = true;
  switcher = false;
  clientMessage("Mod => SuperSwitcher enabled");
  }else{
  ss = false;
  clientMessage("Mod => SuperSwitcher disabled");
  }}
  
  if(text == ".3switcher"){
  preventDefault();
  if(ss3 == false){
  ss3 = true;
  ss = false;
  ss4 = false;
  showname = true;
  ce = true;
  switcher = false;
  clientMessage("Mod => TripleSwitcher enabled");
  }else{
  ss3 = false;
  clientMessage("Mod => TripleSwitcher disabled");
  }}
  
  if(text == ".4switcher"){
  preventDefault();
  if(ss4 == false){
  ss4 = true;
  ss = false;
  ss3 = false;
  showname = true;
  ce = true;
  switcher = false;
  clientMessage("Mod => QuadSwitcher enabled");
  }else{
  ss4 = false;
  clientMessage("Mod => QuadSwitcher disabled");
  }}
  
  if(text == ".v"){
  preventDefault();
  if(v == false){
  v = true;
  showname = true;
  switcher = true;
  ce = true;
  sprint = true;
  clientMessage("Mod => VersaiSettings enabled");
  }else{
  v = false;
  sprint = false;
  clientMessage("Mod => VersaiSettings disabled");
  }}
  
  if(text == ".autoswitch"){
  preventDefault();
  if(autoswitch == false){
  autoswitch = true;
  showname = true;
  clientMessage("Mod => AutoSwitcher enabled");
  }else{
  autoswitch = false;
  clientMessage("Mod => AutoSwitcher disabled");
  }}
  
  if(text == ".stackpots"){
  preventDefault();
  if(stackpots == false){
  stackpots = true;
  for(var i = 255; i < 406; i++){
if(i!=210&i!=211&i!=212&i!=217&i!=230&i!=241&i!=242&i!=248&i!=249&i!=250&i!=326&i!=327&i!=343){
Item.setProperties(i, {
"stack_by_data": true,
});
Item.setAllowOffhand(i, true);
Item.setHandEquipped(i, true);
}

	Item.setProperties(444, {"stack_by_data": true,});
	Item.setAllowOffhand(444, true);
	Item.setHandEquipped(444, true);

	Item.setProperties(450, {"stack_by_data": true,});
	Item.setAllowOffhand(450, true);
	Item.setHandEquipped(450, true);

	Item.setProperties(441, {"stack_by_data": true,});
	Item.setAllowOffhand(441, true);
	Item.setHandEquipped(441, true);

	Item.setProperties(438, {"stack_by_data": true,});
	Item.setAllowOffhand(438, true);
	Item.setHandEquipped(438, true);

}
  clientMessage("Mod => Stackpots enabled");
  }else{
  stackpots = false;
  clientMessage("Mod => Stackpots disabled");
  }}
  
    if(text == ".scaffold"){
  preventDefault();
  if(scaffold == false){
  scaffold = true;
  clientMessage("Mod => Scaffold enabled");
  }else{
  scaffold = false;
  clientMessage("Mod => Scaffold disabled");
  }}
  
}

function modTick(){

    
  if(tw == true){
  var players = Server.getAllPlayers(250);
  players.forEach(function (entry){
  let slapper = Player.getName(entry)
  let slapper2 = Player.getName(entry)
  let slapper3 = Player.getName(entry)
  let slapper4 = Player.getName(entry)
  let slapper5 = Player.getName(entry)
    if(slapper == "§dItem Shop\n§r§7Punch Me"){
		Entity.remove(entry)
	}
    if(slapper2 == "§aUpgrade Bot 9000\n§r§7Punch Me"){
        Entity.remove(entry)
	}
	if(slapper3 == ""){
        Entity.remove(entry)
	}
	if(slapper4 == "§bDiamond Summoner §7[3"){
        Entity.remove(entry)
	}
	if(slapper5 == "§aEmerald Summoner §7[8]"){
        Entity.remove(entry)
	}
  })
  }
  
if(sk == true){
	var players = Server.getAllPlayers(250);
    players.forEach(function (entry){
  let slapper6 = Player.getName(entry)
  let slapper7 = Player.getName(entry)
  let slapper8 = Player.getName(entry)
  let slapper9 = Player.getName(entry)
	if(slapper6 == "§cRed\n§cTreasure"){
        Entity.remove(entry)
	}
	if(slapper7 == "§9Blue\n§9Treasure"){
        Entity.remove(entry)
	}
	if(slapper8 == "§eYellow\n§eTreasure"){
        Entity.remove(entry)
	}
	if(slapper9 == "§aGreen\n§aTreasure"){
        Entity.remove(entry)
	}
	})
}
  
  if(hitbox == true){
  var vic = getNearestEntity(21);
  if(vic != getPlayerEnt())Entity.setCollisionSize(vic, 10, 10);
  }
  
  if(hitbox == false){
  Entity.setCollisionSize(Player.getPointedEntity(), reach, 1.8);
  }
  
  if(fly == true){
  Player.setFlying(1);
  }  
  
  if(ce == true){
  ModPE.setGameSpeed(speed);
  }
  
  if(bce == true){
  ModPE.setGameSpeed(52);
  }  
  
  if(gamemode == true){
  Level.setGameMode(1);
  }
  
  if(sprint == true){
  Player.setHunger(6);
  }
  
  if (autoswitch == true){
	if(Player.getSelectedSlotId() < 8) {
	Player.setSelectedSlotId(Player.getSelectedSlotId() + 1);
	} else {
	Player.setSelectedSlotId(0);
	}
  }
  
  if(elytra == true){
  Player.setArmorSlot(1, 444, 0);
  }
  
  if(bow && getCarriedItem() == 261) {
  var players = Server.getAllPlayers(250);
  players.forEach(function (entry){
  let id2 = Entity.getArmor(entry, 3)
  if(id2==317){
  crosshairAimAt(entry);
  }
  })
  }
  
  if(bow && getCarriedItem() == 261) {
  setVelY(getPlayerEnt(), -0.1);
  setVelX(getPlayerEnt(), Entity.getVelX(getPlayerEnt())*1.0);
  setVelZ(getPlayerEnt(), Entity.getVelZ(getPlayerEnt())*1.0);
  var x = Entity.getX(getPlayerEnt());
  var y = Entity.getY(getPlayerEnt());
  var z = Entity.getZ(getPlayerEnt());
  if(getTile(x, y, z) > 0 || getTile(x, y-1, z) > 0){
  if(getTile(x, y, z) != 8 || getTile(x, y-1, z) != 8){
  if(getTile(x, y, z) != 9 || getTile(x, y-1, z) != 9){
  Entity.setPositionRelative(getPlayerEnt(), 0, +0.90, 0);
  }}}
  }
  
  if(bow && getCarriedItem() == 294) {
  setVelY(getPlayerEnt(), -0.1);
  setVelX(getPlayerEnt(), Entity.getVelX(getPlayerEnt())*1.0);
  setVelZ(getPlayerEnt(), Entity.getVelZ(getPlayerEnt())*1.0);
  var x = Entity.getX(getPlayerEnt());
  var y = Entity.getY(getPlayerEnt());
  var z = Entity.getZ(getPlayerEnt());
  if(getTile(x, y, z) > 0 || getTile(x, y-1, z) > 0){
  if(getTile(x, y, z) != 8 || getTile(x, y-1, z) != 8){
  if(getTile(x, y, z) != 9 || getTile(x, y-1, z) != 9){
  Entity.setPositionRelative(getPlayerEnt(), 0, +0.90, 0);
  }}}
  }
  
  if(bow && getCarriedItem() == 294) {
  var players = Server.getAllPlayers(250);
  players.forEach(function (entry){
  let id2 = Entity.getArmor(entry, 3)
  if(id2==317){
  crosshairAimAt(entry);
  }
  })
  }
  
  if(waterfly == true){
var x = Player.getX();
var y = Player.getY();
var z = Player.getZ();
setTile(x, y - 1, z, 9, 0);
setTile(x - 1, y - 1, z, 9, 0);
setTile(x + 1, y - 1, z, 9, 0);
setTile(x, y - 1, z - 1, 9, 0);
setTile(x, y - 1, z + 1, 9, 0);
setTile(x - 1, y, z, 9, 0);
setTile(x + 1, y, z, 9, 0);
setTile(x, y, z - 1, 9, 0);
setTile(x, y, z + 1, 9, 0);
setVelY(getPlayerEnt(), -1);
  }
  
if(autopot == true){
var hearts = Entity.getHealth(getPlayerEnt());
if(hearts <= max*2){
let bestsword = [-1, -1];
for (let i = 0; i < 10; i++) {
let slot = dragon.sortPots(Player.getInventorySlot(i), Player.getInventorySlotData(i));
if (slot > bestsword[0]) {
bestsword[0] = slot;
bestsword[1] = i;
}
if (bestsword[1] != -1){
Player.setSelectedSlotId(bestsword[1]);
setRot(getPlayerEnt(), getYaw(getPlayerEnt()), 90);
}
}
}
}
  
  if(randomtp == true){
  Entity.addEffect(Player.getEntity(), MobEffect.nightVision, 255, 1, false, false);
  Entity.removeEffect(getPlayerEnt(), MobEffect.blindness);
  var players = Server.getAllPlayers(250);
  players.forEach(function (entry){
  let id = Entity.getCarriedItem(entry);
  if(id==267){
  Entity.setNameTag(entry, namestore);
  Entity.setArmor(entry, 0, 0); Entity.setArmor(entry, 1, 444); Entity.setArmor(entry, 2, 0); Entity.setArmor(entry, 3, 317);
  }
  })
  }
  
  if(glide == true){
  setVelY(getPlayerEnt(), -0.1);
  setVelX(getPlayerEnt(), Entity.getVelX(getPlayerEnt())*1.0);
  setVelZ(getPlayerEnt(), Entity.getVelZ(getPlayerEnt())*1.0);
  var x = Entity.getX(getPlayerEnt());
  var y = Entity.getY(getPlayerEnt());
  var z = Entity.getZ(getPlayerEnt());
  if(getTile(x, y, z) > 0 || getTile(x, y-1, z) > 0){
  if(getTile(x, y, z) != 8 || getTile(x, y-1, z) != 8){
  if(getTile(x, y, z) != 9 || getTile(x, y-1, z) != 9){
  Entity.setPositionRelative(getPlayerEnt(), 0, +0.90, 0);
}}}
  }

    if(scaffold == true){
  let selectedSlot = Player.getSelectedSlotId();
		let heldTile = Player.getInventorySlot(selectedSlot);
		if(heldTile <= 256) {
			let heldTileData = Player.getInventorySlotData(selectedSlot);
			let y = getPlayerY() - 2;
			let tile = getTile(getPlayerX(), y, getPlayerZ());
			if(tile == 0) {
				setTile(getPlayerX(), y, getPlayerZ(), heldTile, heldTileData);
			}
		}
  }
  
}
function attackHook(att, vic){
  
  if (hitaim && Entity.getHealth(vic) > 0){
  crosshairAimAt(vic);
  }
  
  if (switcher == true){
  Player.setSelectedSlotId(0);
  }
  
  if(hitspam == true){
var hit = Player.getName(vic);
var name = hit.toString();
var person = name.replace(/[^a-zA-Z ]/g, "");
Server.sendChat("./msg "+person+" YOᑌ'ᖇE ᗩ ᑕᒪOᗯᑎ,Iᗰ ᑭᑌᒪᒪIᑎ ᑌᑭ ᗯIT TᕼE IᑎᐯISᑕOᗯ,ᕼOᒪᗪ TᕼIS █▄ & Sᑌᗷ TO EKOᗯZ");
  }
	  
  if (ss == true){
	  if(swap == false){
      swap = true;
	  Player.setSelectedSlotId(0);
	  }else{
      swap = false;
      Player.setSelectedSlotId(8);
  }
  }
  
    if (ss3 == true){
 if (ternary == false) {
        if (toggler == false) {
            toggler = true;
			Player.setSelectedSlotId(0);
        } else {
            toggler = false;
            Player.setSelectedSlotId(4);
            ternary = true;
        }
    } else {
		Player.setSelectedSlotId(8);
        ternary = false;
    }}
	
	  if (ss4 == true){
 if (ternary == false) {
        if (toggler == false) {
            toggler = true;
			Player.setSelectedSlotId(0);
        } else {
            toggler = false;
            Player.setSelectedSlotId(2);
            ternary = true;
        }
    } else {
		if (quad == false) {
			quad = true;
		    Player.setSelectedSlotId(6);
		} else {
			quad = false;
			Player.setSelectedSlotId(8);
            ternary = false;
}}}
  
  if (saddle == true){
  rideAnimal(att, vic);
  }
  
  if (v && Utils.Player.isOnGround()) {
		setVelY(getPlayerEnt(), 0.4);
  }
  
  if (showname == true){
  ModPE.showTipMessage( ChatColor.WHITE + "Fighting: "+ ChatColor.RED + Player.getName(vic) + ChatColor.RED + "");
  }
  
  if (reachaura && Entity.getHealth(vic) > 0){
  setPosition(getPlayerEnt(), Entity.getX(vic),Entity.getY(vic),Entity.getZ(vic));
  Entity.setSneaking(Player.getEntity(), 300);
  var hit = getYaw() + 90;
  var hitY = getPitch() - 180;
  x = Math.cos(hit * (Math.PI / 180));
  y = Math.sin(hitY * (Math.PI / 180));
  z = Math.sin(hit * (Math.PI / 180));
  setVelX(Player.getEntity(), x * -2);
  setVelZ(Player.getEntity(), z * -2);
 }
 
if (behindhit && Entity.getHealth(vic) > 0){
if(vic){
var yaw = Entity.getYaw(vic);
var x = Entity.getX(vic);
var y = Entity.getY(vic);
var z = Entity.getZ(vic);
if(dragon2.yawDir(0, yaw)){
if(getTile(x, y-2, z-2) != 10 || getTile(x, y-2, z-2) != 11){
Entity.setPosition(Player.getEntity(), x, y+1.62, z-2);
}
}
if(dragon2.yawDir(1, yaw)){
if(getTile(x-2, y-2, z) != 10 || getTile(x-2, y-2, z) != 11){
Entity.setPosition(Player.getEntity(), x-2, y+1.62, z);
}
}
if(dragon2.yawDir(2, yaw)){
if(getTile(x, y-2, z+2) != 10 || getTile(x, y-2, z+2) != 11){
Entity.setPosition(Player.getEntity(), x, y+1.62, z+2);
}
}
if(dragon2.yawDir(3, yaw)){
if(getTile(x+2, y-2, z) != 10 || getTile(x+2, y-2, z) != 11){
Entity.setPosition(Player.getEntity(), x+2, y+1.62, z);
}
}
}
}
}
		
      function getNearestEntity(maxrange) {
			var mobs = Entity.getAll();
			var players = Server.getAllPlayers();
			var small = maxrange;
			var vic = null;
			for (var i = 0; i < mobs.length; i++) {
				var x = Entity.getX(mobs[i]) - getPlayerX();
				var y = Entity.getY(mobs[i]) - getPlayerY();
				var z = Entity.getZ(mobs[i]) - getPlayerZ();
				var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
				if (dist < small && dist > 0 && Entity.getEntityTypeId(mobs[i]) <= 63 && Entity.getHealth(mobs[i]) >= 1) {
					small = dist;
					vic = mobs[i];
				}
			}
			for (var i = 0; i < players.length; i++) {
				var x = Entity.getX(players[i]) - getPlayerX();
				var y = Entity.getY(players[i]) - getPlayerY();
				var z = Entity.getZ(players[i]) - getPlayerZ();
				var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
				if (dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1) {
					small = dist;
					vic = players[i];
				}
			}
			return vic;
		}
		
function crosshairAimAt(vic, pos) {
if (vic != null) {
var x = Entity.getX(vic) - getPlayerX();
var y = Entity.getY(vic) - getPlayerY();
var z = Entity.getZ(vic) - getPlayerZ();
if (pos != null && pos instanceof Array) {
x = Entity.getX(vic) - pos[0];
y = Entity.getY(vic) - pos[1];
z = Entity.getZ(vic) - pos[2];
}
if (Entity.getEntityTypeId(vic) != 63) y += 0.5;
var a = 0.5 + Entity.getX(vic);
var b = Entity.getY(vic);
var c = 0.5 + Entity.getZ(vic);
var len = Math.sqrt(x * x + y * y + z * z);
var y = (y-.5) / len;
var pitch = Math.asin(y);
pitch = pitch * 180.0 / Math.PI;
pitch = -pitch;
var yaw = -Math.atan2(a - (Player.getX() + 0.5), c - (Player.getZ() + .5)) * (180 / Math.PI);
if (pitch < 89 && pitch > -89) {
Entity.setRot(Player.getEntity(), yaw, pitch );
}
}
  }
		
function leaveGame() {
ModPE.setGameSpeed(20);
}
		
function useItem(x, y, z, itemId, blockId, side)
  {
  if(taptp == true){
  if(itemId == 0) return;
  if (itemId != 438) {
  setPosition(getPlayerEnt(), Player.getPointedBlockX(), Player.getPointedBlockY() + 3.0, Player.getPointedBlockZ())
  }}
if(forcetp == true){
 preventDefault();
		if(itemId == 261) return;
		let randomEnts = [];

		let newPlayer = Server.getAllPlayers(250).getRandomElement();
		if(newPlayer != null && newPlayer != undefined && newPlayer != getPlayerEnt()) {
			randomEnts.push(newPlayer);
		}

		let randomEnt = randomEnts.getRandomElement();

		if(randomEnt != null && randomEnt != undefined) {
			if(itemId == 294) return;
			Entity.setPosition(getPlayerEnt(), Entity.getX(randomEnt), Entity.getY(randomEnt) + 1.8, Entity.getZ(randomEnt));
		}
}
 if(tapjet == true){
	    if(itemId == 0) return;
        if (itemId != 438) {
        var hit = getYaw() + 90;
        var hitY = getPitch() - 180;
        x = Math.cos(hit * (Math.PI / 180));
        y = Math.sin(hitY * (Math.PI / 180));
        z = Math.sin(hit * (Math.PI / 180));
        setVelX(Player.getEntity(), x * 1.02);
        setVelY(Player.getEntity(), y * 1.02);
        setVelZ(Player.getEntity(), z * 1.02);
 }}
 if(randomtp == true){
		preventDefault();
		if(itemId == 261) return;
		if (itemId != 261) {
		let randomEnts = [];

		let newPlayer = Server.getAllPlayers(250).getRandomElement();
		if(newPlayer != null && newPlayer != undefined && newPlayer != getPlayerEnt()) {
			randomEnts.push(newPlayer);
		}

		let randomEnt = randomEnts.getRandomElement();

		if(randomEnt != null && randomEnt != undefined) {
			if(itemId == 294) return;
			if (itemId != 294) {
			Entity.setPosition(getPlayerEnt(), Entity.getX(randomEnt), Entity.getY(randomEnt) + 1.8, Entity.getZ(randomEnt));
		}
  }}}
			}