<template>
  <div class="error-wrapper-c">
    <div class="error">Error:</div>
    <br />
    <div class="error-message" v-html="flexi.errors.message"></div>
    <div class="readme">
      <p>The expected prop structure is <code>:propName (any valid name) = "an object"</code>.</p>
      <p>The object should include the following fields:</p>
      <ul>
        <li>options (optional): { }</li>
        <li class="rows">rows (required): [ ]
          <div class="rows-details">
            <p>yapı ve isimlendirme açıklanacak</p>
          </div>
        </li>
        <li>columns (required): [ ]</li>
        <li>selectedRows (required): [ ]</li>
      </ul>
      <p>Both rows and columns must be filled.</p>
      <p>Additionally, you can provide custom configurations inside the 'options' object based on values defined in
        "flexi.config.json".</p>
    </div>
  </div>
</template>

<script lang="ts">
import flexitableExceptionHandler from '../flexitableExceptionHandler'
export default {
  name: 'FlexiTableInfo',
  mixins: [flexitableExceptionHandler],
  inject: ['flexi']
}
</script>

<style lang="scss" scoped>
.error-wrapper-c {
  align-items: center;

  .error {
    font-weight: bold;
    color: rgb(206, 0, 0);
  }

  .readme {
    background-color: antiquewhite;
    border-radius: 12px;
    padding: 4px;
    margin-top: 12px;
  }

  .rows {
    // color: #366EF3;
    // cursor: pointer;

  }
}
</style>
