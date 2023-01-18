import { ActionFormData, MessageFormData  } from "@minecraft/server-ui"
import { world, DynamicPropertiesDefinition, MinecraftEntityTypes, ItemTypes, ItemStack } from '@minecraft/server';


const stat = new ActionFormData()
  .title("watts.ui.info_ui")
  .button("힘", "1")
  .button("민첩", "10")
  .button("체력", "20 + 10000")
  .button("치명타", "0")
  .button("행운", "0")
  .button("회피", "0")
  .button("지능", "0")
  .button("마력", "0")
  .button("방어력", "0")
  .button("포인트", "12")

const skill = new ActionFormData()
  .title("watts.ui.skill_ui")
  .button("기본 검술", "textures/ui/watts/plus")
  .button("기본 궁술", "textures/ui/watts/plus")
  .button("기초 마법", "textures/ui/watts/plus")
  .button("기초 이동", "textures/ui/watts/plus")
  .button("기타", "textures/ui/watts/plus")
  
  .button("단검술", "textures/ui/watts/plus")
  .button("검술", "textures/ui/watts/plus")
  .button("도술", "textures/ui/watts/plus")
  .button("칭술", "textures/ui/watts/plus")
  
  .button("연사", "textures/ui/watts/plus")
  .button("속도", "textures/ui/watts/plus")
  .button("관통", "textures/ui/watts/plus")
  
  .button("파이어 볼", "textures/ui/watts/plus")
  .button("윈드 커터", "textures/ui/watts/plus")
  .button("스파크", "textures/ui/watts/plus")
  .button("아이스 스피어", "textures/ui/watts/plus")
  
  .button("대쉬", "textures/ui/watts/plus")
  .button("진각", "textures/ui/watts/plus")
  .button("파워 점프", "textures/ui/watts/plus")
  .button("효율적 이동(패시브)", "textures/ui/watts/plus")
  
  .button("방패 활용술(패시브)", "textures/ui/watts/plus")
  .button("골각기(패시브)", "textures/ui/watts/plus")
  .button("빠른 재생(패시브)", "textures/ui/watts/plus")
  .button("모험가의 감(패시브)", "textures/ui/watts/plus")
  .button("야간 투시(패시브)", "textures/ui/watts/plus")
  
  .button("오러 블레이드", "textures/ui/watts/plus")
  .button("검기 발출", "textures/ui/watts/plus")



const arr = [
  "기본 검술", 
  "기본 궁술", 
  "기초 마법", 
  "기초 이동", 
  "기타", 
  "단검술", 
  "검술", 
  "도술", 
  "칭술", 
  "연사", 
  "속도", 
  "관통", 
  "파이어 볼", 
  "윈드 커터", 
  "스파크", 
  "아이스 스피어", 
  "대쉬", 
  "진각", 
  "파워 점프", 
  "효율적 이동(패시브)", 
  "방패 활용술(패시브)", 
  "골각기(패시브)", 
  "빠른 재생(패시브)", 
  "모험가의 감(패시브)", 
  "야간 투시(패시브)", 
  "오러 블레이드", 
  "검기 발출"
]

const armorSlot = new ActionFormData()
  .button("무기")
  .button("슬롯 1")
  .button("슬롯 2")
  .button("슬롯 3")
  .button("슬롯 4")
  .button("슬롯 5")
  .button("슬롯 6")
  .button("슬롯 7")
  .button("슬롯 8")

  const skillSlot = new ActionFormData()
  .button("슬롯 1")
  .button("슬롯 2")
  .button("슬롯 3")
  .button("슬롯 4")
  .button("슬롯 5")
  .button("슬롯 6")
  .button("슬롯 7")
  .button("슬롯 8")

const book = new ActionFormData()
  .button("스텟")
  .button("스킬")
  .button("스킬창")
  .button("무기/장신구")

world.events.beforeItemUse.subscribe(e => {
  const player = e.source;
    if(e.item.typeId === "minecraft:book") {
      book.show(player).then((response) => {
        if(response.canceled){
          return;
        }
        formResult(response.selection, player)
      });
    }
});

const formResult = (ans, player) =>{

  if(ans == 0){
    stat.show(player)
  }
  if(ans == 1) {
    skill.show(player).then((response) => {
      if(response.selection === 4 || response.canceled){
        return;
      }
      const skillLv = new MessageFormData()
        .body(`테스트 스킬\n 포인트 x를 소모해 ${arr[response.selection]} 스킬의 레벨을 올리시겠습니까?\n 스킬 설명: 정보 없음\n 선행 스킬: 정보 없음`)
        .button1("예")
        .button2("아니요")
      skillLv.show(player)
    });
  }
  if(ans == 2){
    armorSlot.show(player)
  }
  if(ans == 3){
    skillSlot.show(player)
  }
}

const init = (player) => {
  for (let i = 1; i < 10; i++){
    if(!player.getDynamicProperty(`slot${i}`)){
      player.setDynamicProperty(`slot${i}`, `None`)
    }

    if(player.getDynamicProperty(`slot${i}`) == "None") {
      player.getComponent("minecraft:inventory").container.setItem(i - 1, new ItemStack(ItemTypes.get("minecraft:barrier"), 1, 0))
    }
  }
  for (let i = 1; i < 9; i++){
    if(!player.getDynamicProperty(`skill${i}`)){
      player.setDynamicProperty(`skill${i}`, `None`)
    }
    if(player.getDynamicProperty(`skill${i}`) == "None") {
      player.getComponent("minecraft:inventory").container.setItem(i + 8, new ItemStack(ItemTypes.get("minecraft:barrier"), 1, 0))
    }
  }
  player.getComponent("minecraft:inventory").container.setItem(8, new ItemStack(ItemTypes.get("minecraft:book"), 1, 0))
}

world.events.playerJoin.subscribe((event) => {
  const player = event.player;
  //init(player)
});


world.events.beforeChat.subscribe((event) => {
  const player = event.sender;
  const msg = event.message;
  if(msg == "책 소환"){
    player.getComponent("minecraft:inventory").container.setItem(8, new ItemStack(ItemTypes.get("minecraft:book"), 1, 0))
  }
});



world.events.worldInitialize.subscribe(e => {
  let def = new DynamicPropertiesDefinition();
  def.defineString("slot1", 40);
  def.defineString("slot2", 40);
  def.defineString("slot3", 40);
  def.defineString("slot4", 40);
  def.defineString("slot5", 40);
  def.defineString("slot6", 40);
  def.defineString("slot7", 40);
  def.defineString("slot8", 40);
  def.defineString("slot9", 40);
  
  def.defineString("skill1", 40);
  def.defineString("skill2", 40);
  def.defineString("skill3", 40);
  def.defineString("skill4", 40);
  def.defineString("skill5", 40);
  def.defineString("skill6", 40);
  def.defineString("skill7", 40);
  def.defineString("skill8", 40);
  e.propertyRegistry.registerEntityTypeDynamicProperties(def, MinecraftEntityTypes.player);
});