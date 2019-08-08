<template>
  <accordion :items="tickets" class="tickets-accordion__accordion">
    <div slot="header" slot-scope="{ item }" class="tickets-accordion__header">
      <h4 class="tickets-accordion__title">
        <ticket-icon
          v-if="!isMobileDevice"
          class="tickets-accordion__ticket-icon"
        />
        {{ item.title }}
      </h4>
      <p
        :class="[
          'tickets-accordion__subtitle',
          {
            'text--small': isMobileDevice,
            'text--bold': !isMobileDevice,
          },
        ]"
      >
        {{ item.basePrice }}
      </p>
      <a
        :href="item.ticketUrl"
        v-if="!isMobileDevice"
        class="button tickets-accordion__cta"
      >
        Buy tickets
      </a>
    </div>
    <div slot-scope="{ item }" class="tickets-accordion__content-container">
      <section
        v-if="item.images"
        :class="[
          'tickets-accordion__image-gallery',
          {
            'tickets-accordion__image-gallery--empty': item.images.length === 0,
          },
        ]"
      >
        <div
          class="image-gallery__container image-gallery__container--mini"
          v-if="item.images.length > 1"
        >
          <swiper
            controls
            marker-type="dots"
            responsive-tile-width
            class-name="image-gallery__swiper image-gallery__swiper--mini"
          >
            <div
              v-if="!isMobileDevice"
              slot="left-control"
              class="carousel__control carousel__control--left carousel__control--v-middle image-gallery__controls image-gallery__controls--left image-gallery__controls--mini"
            >
              <arrow-icon show-border />
            </div>
            <template slot="swiper-container" class="image-gallery__list">
              <div
                class="image-gallery__item image-gallery__item--mini"
                v-for="(image, key) in item.images"
                :key="key"
                :src="image.image.thumbnailUrl"
                :alt="image.image.title"
              >
                <div class="image-gallery__image image-gallery__image--mini">
                  <cloudinary-picture
                    :image-url="image.image.templateUrl"
                    photo-set-name="TicketsImageCarousel"
                  />
                </div>
              </div>
            </template>
            <div
              v-if="!isMobileDevice"
              slot="right-control"
              class="carousel__control carousel__control--right carousel__control--v-middle image-gallery__controls image-gallery__controls--right image-gallery__controls--mini"
            >
              <arrow-icon show-border />
            </div>
          </swiper>
        </div>
        <div
          v-else-if="item.images.length === 1"
          class="tickets-accordion__single-ticket-image"
        >
          <cloudinary-picture
            :image-url="item.images[0].image.templateUrl"
            photo-set-name="TicketsImageCarousel"
          />
        </div>
      </section>
      <ul
        :class="[
          'tickets-accordion__ticket-details',
          {
            'tickets-accordion__ticket-details--only':
              !item.images || !item.images.length,
          },
        ]"
      >
        <li
          v-for="(point, key) in item.description
            .replace(/\\n\*|\*/g, '~')
            .split('~')
          .filter((p) => p)"
          :key="key"
          class="ticket-bullet-point"
        >
          {{ point }}
        </li>
      </ul>
    </div>
    <a
      :href="item.ticketUrl"
      v-if="isMobileDevice"
      slot="footer"
      slot-scope="{ item }"
      class="button tickets-accordion__cta tickets-accordion__cta--mobile"
    >
      Buy tickets
    </a>
  </accordion>
</template>

<script>
import Accordion from '@/components/Accordion.vue';
import { TicketIcon, ArrowIcon } from '@/components/icons';
import { mapGetters } from 'vuex';
import Swiper from '@/components/controls/Swiper.vue';
import CloudinaryPicture from '@/components/CloudinaryPicture.vue';

export default {
  name: 'TicketsAccordion',
  components: {
    Accordion,
    TicketIcon,
    ArrowIcon,
    Swiper,
    CloudinaryPicture,
  },

  props: {
    ticketsData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['isMobileDevice']),
    tickets() {
      return this.ticketsData ? this.ticketsData.list : [];
    },
  },
};
</script>
