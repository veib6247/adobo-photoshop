<script setup lang="ts">
  import imgAdobo from './assets/img/adobo.png'

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

  const cookFile = () => {
    if (userFile.value === undefined) {
      alert('Please select an image file to upload!')

      // 
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(userFile.value)

      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      const ctx = canvas.getContext('2d')

      reader.onload = () => {
        const image = new Image()

        image.onload = () => {
          canvas.height = image.height
          canvas.width = image.width
          ctx!.drawImage(image, 0, 0)
        }

        image.src = reader.result as string

        const adobo = new Image()

        adobo.onload = () => {
          // center the damn thing
          const x = (canvas.width - adobo.width) * 0.5
          const y = (canvas.height - adobo.height) * 0.5

          ctx!.drawImage(adobo, x, y)
        }

        adobo.src = imgAdobo
      }
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
              Upload your photo, I'll add adobo!
            </p>
          </div>

          <div class="flex place-content-center gap-2">
            <input type="file" class="file-input file-input-bordered file-input-secondary w-full max-w-xl" ref="file"
              accept="image/jpeg, image/png" @change="handleSelection" />

            <button class="btn btn-primary" @click="cookFile">
              Cook
            </button>
          </div>

          <div class="object-none flex place-content-center">
            <canvas id="canvas" class="rounded shadow" height="500" width="500"></canvas>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
