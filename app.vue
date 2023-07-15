<script setup lang="ts">
  import axios from 'axios'

  const appTitle = ref('Adobo Photoshop')

  useHead({
    title: appTitle.value
  })

  const userFile = ref<File>()

  const handleSelection = (e: Event) => {
    if (e.target) {
      userFile.value = (e.target as HTMLInputElement).files![0]
    } else {
      throw new Error('Target empty!')
    }
  }


  const imgContainer = ref('')
  const isUploading = ref(false)

  const handleFileUpload = async () => {
    try {
      isUploading.value = true
      imgContainer.value = ''

      if (userFile.value === undefined) {
        alert('Please select an image file to upload!')

        // 
      } else {

        const { data } = await axios.post('/api/uploadHandler', { image: userFile.value }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        imgContainer.value = data
      }
    } catch (error) {
      console.error(error)

    } finally {
      isUploading.value = false
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

            <button class="btn btn-primary" @click="handleFileUpload">
              <span class="loading loading-spinner" v-if="isUploading"></span>Upload
            </button>
          </div>

          <Transition>
            <div class="flex place-content-center" v-if="imgContainer">
              <img class="h-96 w-96 rounded shadow object-cover" :src="imgContainer" />
            </div>
          </Transition>
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
