<template>
  <div class="board">
    <div class="header">
      <div class="header-title">ようこそ、四つ葉のクローバーへ</div>
    </div>
    <div class="playArea">
      <div
        v-for="i in openedCards"
        :key="i.mark + i.num"
        :style="`width:${100/4}%;height:${100/4}%`"
        class="card-holder"
      >
        <img
          @click="addNum(i);startCountDown()"
          :style="`border-color:${changeBorderColor(i)}`"
          class="card"
          :src ="`${setOpenedImg(i)}`"
        />
      </div>
    </div>

    <!-- タイマー情報 -->
    <div class="timer" v-if="startGame">
      <img :src="timerIcon" style="width: 100px; border-radius:25%">
      <div style="color:#fff" v-if="timer > 0">残り{{ timer }}秒</div>
      <div style="color:#ff0;" v-else>ゲームオーバー</div>
    </div>
    <!-- デッキ情報 -->
    <div class="deck" v-if="deck.length > 0">
      <div><img :src="backedImg" style="width: 100px; height: 150px"></div>
      <div style="text-align:center; color:#fff">残り{{deck.length}}枚</div>
    </div>

    <!-- リスタート機能 -->
    <div class="reset">
      <div @click="reset()">
        <div v-if="openedCards.length === 0">もう一度</div>
        <div v-else>リセット</div>
      </div>
    </div>
    <div class="rule" @click="modalOpen"><img :src="ruleIcon" style="width: 100px"></div>

    <!-- モーダル -->
    <div v-if="modalOption">
      <modalWindow/>
    </div>

    <!-- ゲームオーバーモーダル -->
    <div v-if="timer === 0">
      <gameoverModal/>
    </div>

    <!-- ゲームクリアモーダル -->
    <div v-if="openedCards.length === 0 && cleared">
      <cleared/>
    </div>
  </div>
</template>

<script>

import modalWindow from '~/components/Modal';
import cleared from '~/components/ClearedMsg';
import gameoverModal from '~/components/GameOver';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  components: { modalWindow, cleared, gameoverModal },
  data () {
      return {
          backedImg: require("../assets/cards/z01.png"),
          ruleIcon: require("../assets/ruleIcon.png"),
          timerIcon: require("../assets/clock.gif"),
          timer: 3,
      }
  },
  mounted() {
    this.$store.commit("setCards"); //ゲーム開始
  },

  computed: {
    ...mapState([
      'clickedCards',
      'openedCards',
      'deck',
      'modalOption',
      'cleared',
      'startGame',
    ]),
    changeBorderColor(){
      return (i) => {
        const target = this.clickedCards.find(el => el === i);
        return target ? '#0ff' : '';
      }
    },
    setOpenedImg(){
      return (i) => {
        const m = i.mark;
        const n = ("0" + i.num).slice(-2);
        return require('../assets/cards/' + m + n + '.png');
      }
    },
  },
  methods: {
    ...mapMutations(['addNum', 'modalOpen']),
    reset(){
      location.reload("/");
    },
    startCountDown(){
      if (this.timer === 3){
        this.count();
        this.interval = setInterval(this.count, 1000);
      }
    },
    count(){
      console.log(this.timer);
      this.timer > 0 ? this.timer -- :  '';
    }
  },
};
</script>

<style>

.board {
  background: green;
  width: 800px;
  height: 750px;
  position: relative;
}

.header {
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: -moz-linear-gradient(top, #CD853F, #A0522D);
  background: -webkit-linear-gradient(top, #CD853F, #A0522D);
  background: linear-gradient(to bottom, #CD853F, #A0522D);
}

.header-title {
  color: #fff;
  text-shadow:2px 2px 1px #999999;
  font-size: 24px;
  margin-left: 20px;
  line-height: 60px;
}

.playArea {
  width: 50%;
  height: 600px;
  border: 1px solid gray;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%,-50%);
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
}

.card-holder{
  cursor: pointer;
  padding:1%;
}

.card {
  border: 3px solid transparent;
  height: 100%;
}

.timer {
  position: absolute;
  right: 10px;
  bottom: 200px;
  text-align: center;
}

.deck {
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}

.flipedCard {
  width: 100px;
  height: 150px;
  background-image: url("../assets/cards/z01.png")
}

.rule {
  position: absolute;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
}

.reset {
  width: 100px;
  height: 61.5px;
  position: absolute;
  bottom: 100px;
  left: 10px;
  cursor: pointer;
  background: #03A9F4;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
  border-radius: 5%;
  text-align: center;
  color: #FFF;
  line-height: 61.5px;
  border: solid 1px #0f9ada;
  font-size: 20px;
  font-weight: bold;
}

</style>
