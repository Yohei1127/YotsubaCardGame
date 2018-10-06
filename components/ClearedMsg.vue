<template>
  <div class="modal-overlay">
    <div class="modal-window">
      <img :src="clearedMsg" style="width:100%; height:100%">
      <div class="msg">
        <div class="home" @click="closeClearedWindow">戻る</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations} from 'vuex';
export default {
  methods: {
    ...mapMutations(['closeClearedWindow']),
  },
  data () {
      return {
          clearedMsg: require("../assets/giphy.gif"),
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
  height: 450px;
  width: 600px;
}

.msg {
  margin-top: 30px;
  text-align: center;
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
