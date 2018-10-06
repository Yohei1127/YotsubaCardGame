<template>
  <div class="modal-overlay">
    <div class="modal-window">
      <div class="msg-window">
        <img :src="hahaha" style="width:150px"/>
        <div class="comment">ゲームオーバー</div>
      </div>
      <div class="btn">
        <div class="home" @click="resetGame()">もう一度</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations} from 'vuex';
export default {
  data () {
      return {
          hahaha: require("../assets/hahaha.gif"),
      }
  },
  methods: {
    resetGame(){
      location.reload("/");
    }
  },
}
</script>

<style>
/*モーダル部分 */
.modal-overlay{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top:0;
  width: 100%;
  height: 100%;
  background:rgba(0, 0, 0, 0.5);
}

.modal-window{
  background: #fff;
  height: 200px;
  width: 400px;
}

.msg-window {
  width: 100%;
  height: 100%;
  text-align: center;
}

.comment {
  font-size: 24px;
}

.btn {
  text-align: center;
  margin-top: 30px;
}

.home {
  width: 100px;
  height: 61.5px;
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
  margin: auto;
}

</style>
