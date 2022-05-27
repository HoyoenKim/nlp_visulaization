<template>
  <q-page>
    <div class="row q-pa-sm">
      <div
        class="col-12 text-h5 bg-white"
        style="
          padding: 10px 15px;
          border-top: 1px solid rgba(86, 61, 124, 0.2);
          border-left: 1px solid rgba(86, 61, 124, 0.2);
          border-right: 1px solid rgba(86, 61, 124, 0.2);
        "
      >
        <q-input
          outlined
          bottom-slots
          v-model="searchKey"
          label="검색어를 입력하세요."
          counter
          maxlength="20"
        >
          <template v-slot:before>
            <span class="material-icons"> music_note </span>
          </template>
          <template v-slot:hint>
            입력 후 오른쪽 검색 아이콘을 눌러주세요
          </template>
          <template v-slot:append>
            <q-btn @click="searchMusic()" round dense flat icon="search" />
            <q-btn @click="resetMusic()" dense flat icon="refresh" />
          </template>
        </q-input>
      </div>
      <div
        class="col-2 bg-white"
        style="
          border-top: 1px solid rgba(86, 61, 124, 0.2);
          border-bottom: 1px solid rgba(86, 61, 124, 0.2);
          border-left: 1px solid rgba(86, 61, 124, 0.2);
        "
      >
        <div class="q-gutter-sm">
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-checkbox
                  v-model="filterKeyList"
                  val="song_name"
                  color="blue"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>곡 정보</q-item-label>
                <q-item-label caption>곡, 아티스트, 앨범 이름</q-item-label>
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-checkbox v-model="filterKeyList" val="tag" color="cyan" />
              </q-item-section>
              <q-item-section>
                <q-item-label>태그</q-item-label>
                <q-item-label caption> 노래의 태그 </q-item-label>
              </q-item-section>
            </q-item>
            <q-item tag="label">
              <q-item-section avatar top>
                <q-checkbox
                  v-model="filterKeyList"
                  val="keyword"
                  color="teal"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>키워드</q-item-label>
                <q-item-label caption> 노래의 키워드 </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <!--<div class="q-px-sm q-mt-sm">
            Your selection is: <strong>{{ filterKeyList }}</strong>
          </div>-->
        </div>
      </div>
      <div
        class="col-10 bg-white"
        style="border: 1px solid rgba(86, 61, 124, 0.2)"
      >
        <q-table
          flat
          :columns="columns"
          :rows="raw_data"
          row-key="song_name"
          separator="cell"
          hide-pagination
          v-model:pagination="pagination"
          :filter="filter"
          :visible-columns="visibleColumns"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                <div v-if="col.name != 'tags'" class="text-subtitle1">
                  {{ col.label }}
                </div>
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="secondary"
                  :ripple="false"
                  outline
                  round
                  dense
                  no-ripple
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <div v-if="col.name == 'song_name'">
                  {{ col.value }}
                </div>
                <div v-else-if="col.name == 'artist_name_basket'">
                  {{ col.value.join(" , ") }}
                </div>
                <div v-else-if="col.name == 'album_name'">
                  {{ col.value }}
                </div>
                <div v-else-if="col.name == 'like_cnt'">
                  {{ col.value }}
                  <Bar-Chart2 :dataList="col.value"></Bar-Chart2>
                </div>
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td
                colspan="100%"
                style="border-bottom: 1px solid rgba(86, 61, 124, 0.2)"
              >
                <div class="text-left row">
                  <div class="col-12"></div>
                  <div class="col-6 q-pr-md q-py-sm">
                    <q-card flat bordered>
                      <q-card-section class="q-pt-xs">
                        <div class="text-overline">
                          {{ props.row.plylst_title }}
                        </div>
                        <q-btn
                          flat
                          class="text-subtitle1 q-mt-sm q-mb-xs"
                          tag="a"
                          target="_blank"
                          :href="props.row.url"
                        >
                          {{ props.row.song_name }}
                        </q-btn>
                        <div class="text-caption text-grey q-pb-sm">
                          By
                          {{ props.row.artist_name_basket.join(" , ") }}
                          {{ props.row.album_name }}
                        </div>
                        <q-scroll-area
                          style="
                            height: 210px;
                            border: 1px solid rgba(86, 61, 124, 0.2);
                          "
                          class="q-pa-sm"
                        >
                          <div
                            :key="index"
                            v-for="(lysics, index) in props.row.text.split(
                              '\n'
                            )"
                          >
                            {{ lysics }}
                          </div>
                        </q-scroll-area>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="col-6 q-py-sm">
                    <div class="row">
                      <q-card class="col-12" flat bordered>
                        <q-card-section class="q-pt-xs">
                          <div class="text-subtitle1 q-mt-sm q-mb-xs">
                            감정 분석 결과 Score
                          </div>
                          <div class="text-caption text-grey q-pb-sm">
                            Calculated By BERT
                          </div>
                        </q-card-section>
                        <q-card-section horizontal>
                          <div
                            class="col-6"
                            style="border-top: 1px solid rgba(86, 61, 124, 0.2)"
                          >
                            <div class="row">
                              <div class="col-12 col-md-2"></div>
                              <div calss="col-12 col-md-auto">
                                <div class="text-subtitle2 text-center q-py-sm">
                                  노래 가사에서 느껴지는 감정
                                </div>
                                <Bar-Chart
                                  :song_emotion="song_emotion"
                                  :backgroundColor="song_emotion_background"
                                  :borderColor="song_emotion_border"
                                ></Bar-Chart>
                              </div>
                              <div class="col-12 col-md-2"></div>
                            </div>
                          </div>
                          <div
                            class="col-6"
                            style="border-top: 1px solid rgba(86, 61, 124, 0.2)"
                          >
                            <div class="row">
                              <div class="col-12 col-md-2"></div>
                              <div calss="col-12 col-md-auto">
                                <div class="text-subtitle2 text-center q-py-sm">
                                  사용자의 감정
                                </div>
                                <Radar-Chart
                                  :emotion="emotion"
                                  :emotion_avg="emotion_avg"
                                ></Radar-Chart>
                              </div>
                              <div class="col-12 col-md-2"></div>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div class="row justify-center q-my-sm">
          <q-pagination v-model="pagination.page" :max="pagesNumber" input />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import BarChart from "components/BarChart";
import BarChart2 from "components/BarChart2";
import RadarChart from "components/RadarChart";
const columns = [
  {
    name: "song_name",
    align: "left",
    label: "곡",
    field: "song_name",
    headerClasses: "text-h5",
  },
  {
    name: "artist_name_basket",
    align: "left",
    label: "아티스트",
    field: "artist_name_basket",
  },
  {
    name: "album_name",
    align: "left",
    label: "앨범",
    field: "album_name",
  },
  {
    name: "tags",
    align: "left",
    label: "태그",
    field: "tags",
  },
  {
    name: "like_cnt",
    align: "left",
    label: "좋아요 수",
    field: "like_cnt",
  },
];

export default defineComponent({
  name: "PageIndex",
  components: {
    "Bar-Chart": BarChart,
    "Radar-Chart": RadarChart,
    "Bar-Chart2": BarChart2,
  },
  computed: {
    raw_data: {
      get() {
        const $store = useStore();
        return $store.state.csv_data.csv_data;
      },
      set(val) {
        const $store = useStore();
        $store.commit("csv_data/set_csv_data", val);
      },
    },
    pagesNumber: {
      get() {
        return 10;
        //return Math.ceil(this.raw_data.length / this.pagination.rowsPerPage);
      },
      set() {},
    },
    emotion: {
      get() {
        const $store = useStore();
        return $store.state.csv_data.emotion;
      },
      set(val) {
        //const $store = useStore();
        this.$store.commit("csv_data/set_emotion", val);
      },
    },
    emotion_avg: {
      get() {
        const $store = useStore();
        return $store.state.csv_data.emotion_avg;
      },
      set(val) {
        //const $store = useStore();
        this.$store.commit("csv_data/set_emotion_avg", val);
      },
    },
    song_emotion: {
      get() {
        const $store = useStore();
        return $store.state.csv_data.song_emotion;
      },
      set(val) {
        //const $store = useStore();
        this.$store.commit("csv_data/set_song_emotion", val);
      },
    },
    song_emotion_background: {
      get() {
        const $store = useStore();
        var bgc = [];
        var maxV = 0;
        var maxI = 0;
        for (var i = 0; i < this.song_emotion.length; i++) {
          if (this.song_emotion[i] > maxV) {
            maxV = this.song_emotion[i];
            maxI = i;
          }
        }
        var smaxV = 0;
        var smaxI = 0;
        for (var i = 0; i < this.song_emotion.length; i++) {
          if (this.song_emotion[i] > smaxV && i != maxI) {
            smaxV = this.song_emotion[i];
            smaxI = i;
          }
        }
        for (var i = 0; i < this.song_emotion.length; i++) {
          if (i == maxI || i == smaxI) {
            bgc.push("rgba(255, 99, 132, 1)");
          } else {
            bgc.push("rgba(255, 99, 132, 0.5)");
          }
        }
        return bgc;
      },
      set(val) {},
    },
    song_emotion_border: {
      get() {
        var bc = [];
        for (var i = 0; i < this.song_emotion_background.length; i++) {
          if (this.song_emotion_background[i] == "rgba(255, 99, 132, 0.7)") {
            bc.push("rgb(255, 99, 132)");
          } else {
            bc.push("rgb(255, 99, 132)");
          }
        }
        return bc;
      },
      set(val) {},
    },
  },
  methods: {
    searchMusic() {
      if (typeof this.searchKey == "string") {
        this.filter = this.searchKey;
        window.api.receive("send_searchkeyword_finish", (data) => {
          //console.log(`Received [${data}] from main process`);
          var parsed = data[0].slice(1, -1).split(",").map(Number);
          var sum = 0;
          for (var i = 0; i < parsed.length; i++) {
            sum += parsed[i];
          }

          sum = sum / parsed.length;
          var parsed_avg = [];
          for (var i = 0; i < parsed.length; i++) {
            parsed_avg.push(parseInt(sum));
          }
          this.emotion = parsed;
          this.emotion_avg = parsed_avg;
        });
        window.api.send("send_searchkeyword", this.searchKey);
      }
    },
    resetMusic() {
      this.searchKey = "";
      this.filter = "";
      this.emotion = [20, 20, 20, 20, 20, 20];
      this.emotion_avg = [20, 20, 20, 20, 20, 20];
    },
  },
  data() {
    return {
      filter: "",
      pagination: {
        sortBy: "like_cnt",
        descending: true,
        page: 1,
        rowsPerPage: 5,
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "song_name",
          align: "left",
          label: "곡",
          field: "song_name",
          headerClasses: "text-h5",
        },
        {
          name: "artist_name_basket",
          align: "left",
          label: "아티스트",
          field: "artist_name_basket",
        },
        {
          name: "album_name",
          align: "left",
          label: "앨범",
          field: "album_name",
        },
        {
          name: "tags",
          align: "left",
          label: "태그",
          field: "tags",
        },
        {
          name: "like_cnt",
          align: "left",
          label: "좋아요 수",
          field: "like_cnt",
        },
      ],
      filterKeyList: ["song_name", "tag"],
      searchKey: "",
      visibleColumns: [
        "song_name",
        "artist_name_basket",
        "album_name",
        "like_cnt",
      ],
    };
  },
  /*
  setup() {
    const $store = useStore();
    const raw_data = computed({
      get: () => $store.state.csv_data.csv_data,
      set: (val) => {
        $store.commit("csv_data/set_csv_data", val);
      },
    });
    const pagination = ref({
      sortBy: "like_cnt",
      descending: true,
      page: 1,
      rowsPerPage: 5,
      // rowsNumber: xx if getting data from a server
    });
    const emotion = computed({
      get: () => $store.state.csv_data.emotion,
      set: (val) => {
        $store.commit("csv_data/set_emotion", val);
      },
    });

    const emotion_avg = computed({
      get: () => $store.state.csv_data.emotion_avg,
      set: (val) => {
        $store.commit("csv_data/set_emotion_avg", val);
      },
    });

    return {
      searchMusic,
      resetMusic,
      filter: ref(""),
      pagination,
      raw_data,
      columns,
      filterKeyList: ref(["song_name", "tag"]),
      searchKey: ref([""]),
      pagesNumber: computed(() =>
        Math.ceil(raw_data.value.length / pagination.value.rowsPerPage)
      ),
      visibleColumns: ref([
        "song_name",
        "artist_name_basket",
        "album_name",
        "like_cnt",
      ]),
      emotion,
      emotion_avg,
    };
  },
  */
});
</script>

<style lang="sass" scoped></style>
