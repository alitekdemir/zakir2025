<script>
export default {
  name: "ArdArda7Gun",
  props: {
    width: {
      type: [String, Number],
      default: 24,
    },
    height: {
      type: [String, Number],
      default: 24,
    },
    fill: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<template>
  <svg
    :width="width"
    :height="height"
    xmlns="http://www.w3.org/2000/svg"
    :fill="fill"
    viewBox="0 0 48 48"
  >
    <path d="M0 11C0 6.02944 4.02944 2 9 2H37C41.9706 2 46 6.02944 46 11V14H0V11Z" fill="#F4413D"/>
    <path d="M0 14H46V39C46 43.9706 41.9706 48 37 48H9C4.02944 48 0 43.9706 0 39V14Z" fill="#F5F5F5"/>
    <g style="mix-blend-mode:multiply">
    <rect x="0.5" y="2.5" width="45" height="45" rx="8.5" stroke="#CCCCCC"/>
    </g>
    <path d="M16.983 41L24.8052 24.6H16.2719V21H30.783L21.383 41H16.983Z" fill="#333333"/>
    <g style="mix-blend-mode:multiply">
    <circle cx="34" cy="8" r="3" fill="#CCCCCC"/>
    <circle cx="12" cy="8" r="3" fill="#CCCCCC"/>
    </g>
    <rect x="33" width="2" height="9" rx="1" fill="#F5F5F5"/>
    <rect x="11" width="2" height="9" rx="1" fill="#F5F5F5"/>
  </svg>
</template>
