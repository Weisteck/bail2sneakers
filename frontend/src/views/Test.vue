<template>
  <h1>grid & flexbox tailwind</h1>




  <div class="flex flex-row ...">
    <div class="bg-blue-400 m-3 w-40">
      1
      <br>
      2
      <br>
      3
    </div>
    <div class="bg-blue-400 m-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ducimus earum eligendi iste iure magni nemo nobis nulla officiis, perferendis placeat repudiandae saepe sed sequi similique sunt temporibus veritatis voluptatem.</div>
  </div>



  <div class="grid grid-cols-4 gap-4">
    <div class="mygrid col-span-1">1</div>
    <div class="mygrid col-span-3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, dolorem eligendi error eum facere id illum
      laudantium nam nisi placeat quidem repudiandae sed sint tempore ut veniam vero voluptas voluptatibus?
    </div>
    <div class="mygrid col-span-1">3</div>
    <div class="mygrid col-span-3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet asperiores aut consequuntur dolores
      dolorum error hic inventore molestiae nemo, nisi, officia provident quo recusandae repellendus saepe sapiente
      temporibus vitae!
    </div>
    <div class="mygrid col-span-1">5</div>
    <div class="mygrid col-span-3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores blanditiis corporis cum debitis esse
      harum hic inventore ipsa ipsum libero maiores, nihil odio quia reiciendis sint ullam velit voluptatibus?
    </div>
  </div>

  <br>
  <br>
  <br>

  <div class="grid grid-cols-12 gap-4">
    <div class="mygrid col-span-3">1</div>
    <div class="mygrid col-span-9">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, dolorem eligendi error eum facere id illum
      laudantium nam nisi placeat quidem repudiandae sed sint tempore ut veniam vero voluptas voluptatibus?
    </div>
    <div class="mygrid col-span-3">3</div>
    <div class="mygrid col-span-9">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet asperiores aut consequuntur dolores
      dolorum error hic inventore molestiae nemo, nisi, officia provident quo recusandae repellendus saepe sapiente
      temporibus vitae!
    </div>
    <div class="mygrid col-span-1">5</div>
    <div class="mygrid col-span-3">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores blanditiis corporis cum debitis esse
      harum hic inventore ipsa ipsum libero maiores, nihil odio quia reiciendis sint ullam velit voluptatibus?
    </div>
  </div>

  <br><br><br><br>

  <div class="grid grid-cols-10 gap-4">
    <div class=" col-span-4">
      <div class="mygrid mb-3">
        content
      </div>
      <div class="mygrid mb-3">
        content
      </div>
      <div class="mygrid mb-3">
        content
      </div>
    </div>
    <div class=" col-span-6">
      <div class="mygrid mb-3">
        content long
        <br>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, asperiores, consectetur debitis, dignissimos
        doloremque dolores eos laboriosam maxime nihil numquam perferendis perspiciatis possimus provident quaerat quia
        quod soluta veniam voluptatum.
      </div>
      <div class="mygrid mb-3">
        content long
        <br>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, asperiores, consectetur debitis, dignissimos
        doloremque dolores eos laboriosam maxime nihil numquam perferendis perspiciatis possimus provident quaerat quia
        quod soluta veniam voluptatum.
      </div>
      <div class="mygrid mb-3">
        content long
        <br>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, asperiores, consectetur debitis, dignissimos
        doloremque dolores eos laboriosam maxime nihil numquam perferendis perspiciatis possimus provident quaerat quia
        quod soluta veniam voluptatum.
      </div>
    </div>
  </div>
</template>

<style>
.mygrid {
  background-color: deeppink;
}
</style>
