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
        </li>
        <li>columns (required): [ ]</li>
        <li>selectedRows (required): [ ]</li>
      </ul>
      <div class="rows-details">
        <p>The structure and naming convention for <span class="bolded">rows</span> can be in one of the following
          three formats:
        </p>
        <ul>
          <li>
            <span class="bolded">row</span> and <span class="bolded">details</span> object:
            <pre class="code-wrapper"><code>
             
  row: {
    field1: {
      value: value1,
      <span class="comment">// additional fields</span>
    },
    field2: "value2",
    <span class="comment">// additional fields</span>
  },
  details: {
    status: false  <span class="comment">// or true</span>
    <span class="comment">// additional fields</span>
  }

            </code></pre>
          </li>
          <li>
            Only <span class="bolded">row</span> object:
            <pre class="code-wrapper"><code>
{
  row: {
    field1: "value1",
    field2: "value2",
    <span class="comment">// additional fields</span>
  }
}
            </code></pre>
          </li>
          <li>
            Direct values:
            <pre class="code-wrapper"><code>
{
  field1: "value1",
  field2: "value2",
  <span class="comment">// additional fields</span>
}
            </code></pre>
          </li>
        </ul>
        <p>In the first format, <span class="bolded">details</span> object must include a <span
            class="bolded">status</span> property, which
          should be <span class="bolded">false</span> (closed) or <span class="bolded">true</span> (open). This is
          necessary for toggling the
          visibility of details when a row is clicked. <br />In the <span class="bolded">row</span> object, values can
          be
          directly assigned to fields. However, if a field
          has subfields, the value to be displayed in the table should be assigned to the <span
            class="bolded">value</span> property. </p>
      </div>
      <p>Both <span class="bolded">rows</span> and <span class="bolded">columns</span> must be filled.</p>
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

  .rows-details {
    .code-wrapper {
      margin: 0;
    }

    .comment {
      color: green
    }
  }

  .bolded {
    // color: #366EF3;
    // cursor: pointer;
    font-weight: bold;

  }
}
</style>
