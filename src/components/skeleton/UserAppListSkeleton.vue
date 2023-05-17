<template>
  <div id="userHTMLLoading" class="loading">
    <div class="d-inline-flex position-relative p-2">
      <div class="load avatar rounded-9 shadow-4 appsImage userAppStyle" style="width: 100px; height: 100px;"></div>
    </div>
    <div class="d-inline-flex position-relative p-2">
      <div class="load avatar rounded-9 shadow-4 appsImage userAppStyle" style="width: 100px; height: 100px;"></div>
    </div>
    <div class="d-inline-flex position-relative p-2">
      <div class="load avatar rounded-9 shadow-4 appsImage userAppStyle" style="width: 100px; height: 100px;"></div>
    </div>
    <div class="d-inline-flex position-relative p-2">
      <div class="load avatar rounded-9 shadow-4 appsImage userAppStyle" style="width: 100px; height: 100px;"></div>
    </div>
    <div class="d-inline-flex position-relative p-2">
      <div class="load avatar rounded-9 shadow-4 appsImage userAppStyle" style="width: 100px; height: 100px;"></div>
    </div>
    <div class="d-inline-flex position-relative p-2">
      <div class="load avatar rounded-9 shadow-4 appsImage userAppStyle" style="width: 100px; height: 100px;"></div>
    </div>
    <div class="d-inline-flex position-relative p-2">
      <div class="load avatar rounded-9 shadow-4 appsImage userAppStyle" style="width: 100px; height: 100px;"></div>
    </div>
    <div class="d-inline-flex position-relative p-2">
      <div class="load avatar rounded-9 shadow-4 appsImage userAppStyle" style="width: 100px; height: 100px;"></div>
    </div>
    <div class="d-inline-flex position-relative p-2">
      <div class="load avatar rounded-9 shadow-4 appsImage userAppStyle" style="width: 100px; height: 100px;"></div>
    </div>
  </div>
</template>

<style>
#userHTMLLoading {
  margin-top: 50px;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 900px;
}

.load {
  position: relative;
  background-color: #CBD5DC;
  width: 100%;
  height: 155px;
  border-radius: 38px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.11);
}
.load::after {
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  -webkit-animation: loading 1.5s infinite;
  animation: loading 1.5s infinite;
}
@-webkit-keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

</style>