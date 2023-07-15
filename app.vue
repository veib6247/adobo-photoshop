<script setup lang="ts">
  const appTitle = ref('Adobo Photoshop')

  useHead({
    title: appTitle.value,
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  })

  const userFile = ref<File>()

  const handleSelection = (e: Event) => {
    if (e.target) {
      userFile.value = (e.target as HTMLInputElement).files![0]
    } else {
      throw new Error('Target empty!')
    }
  }

  const canvasHeight = ref(0)
  const canvasWidth = ref(0)

  const cookFile = () => {
    try {
      if (userFile.value === undefined) {
        alert('Please select an image file to upload!')
      } else {
        const reader = new FileReader()

        reader.readAsDataURL(userFile.value)

        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')

        const image = new Image()


        reader.onload = () => {
          image.src = reader.result as string
          canvasHeight.value = image.height
          canvasWidth.value = image.width
        }


        image.onload = () => {
          ctx!.drawImage(image, 0, 0)
        }

      }
    } catch (error) {
      console.error(error)
    }
  }
</script>

<template>
  <section class="h-screen  bg-base-100">
    <div class="container mx-auto p-8">

      <div class="card bg-base-200 shadow-xl">
        <div class="card-body flex flex-col gap-8">
          <div class="text-center">
            <h1 class="text-gray-300 font-medium text-3xl">
              {{ appTitle }}
            </h1>
            <p class="text-gray-400 text-sm">
              Upload your photo, I'll add some spice to it!
            </p>
          </div>

          <div class="flex place-content-center gap-2">
            <input type="file" class="file-input w-full max-w-xl" ref="file" accept="image/jpeg, image/png"
              @change="handleSelection" />

            <button class="btn btn-primary" @click="cookFile">
              Cook
            </button>
          </div>

          <div class="object-none flex place-content-center">
            <canvas id="canvas" class="bg-zinc-400 rounded shadow" :height="canvasHeight" :width="canvasWidth"></canvas>
          </div>


        </div>
      </div>

    </div>
  </section>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
