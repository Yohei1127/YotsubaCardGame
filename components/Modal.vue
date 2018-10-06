<template>
  <div class="modal-overlay" @click="modalClose">
    <div class="description">
      <div class="descHead">遊び方について</div>
      <div></div>
      <div>場札の16枚のカードの中から、同じマークで数字の合計が15になる組み合わせをクリックするとカードが消えます。
          <span style="color:#ff0000">全てのカードを取り除くことができれば成功です。</span>
          J、Q、Kは、同じマークのJ、Q、Kで組み合わせないと消化することはできません。<br><br>
      </div>
      <div class="footer">それでは、頑張ってください(^^)</div>
    </div>
  </div>
</template>

<script>
import { mapMutations} from 'vuex';
export default {
  methods: {
    ...mapMutations(['modalClose']),
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
  z-index: 30;
  top:0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.description{
  background: #fff;
  height: 200px;
  width: 400px;
}

.descHead {
  font-size: 24px;
  border-bottom:1px solid #000;
}

.footer {
  text-align: center;
  font-size: 20px;
}
</style>
