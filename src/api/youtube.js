export default class Youtube{
  constructor(apiClient){
    this.apiClient = apiClient;
  }
  async search (keyword){
    return keyword? this.#searchByKeyword(keyword) : this.#mostPopular();
  }
  async channelImageURL(id){
    return this.apiClient.channels({params: {part: 'snippet',id}})
    .then((res)=>res.data.items[0].snippet.thumbnails.default.url);
  }

  async relatedVideos(channelId){
    return this.apiClient.search({  // ✅ `search` 엔드포인트로 변경
      params:{
        part: 'snippet',
        channelId,  // ✅ 특정 채널 ID의 영상만 가져옴
        maxResults: 25,
        order: 'date',  // 최신순 정렬
        type: 'video',
      }
    }).then((res) => 
      res.data.items.map((item) => ({ ...item, id: item.id.videoId }))  // ✅ videoId 변환
    );
  }
  
  
  
  async #searchByKeyword(keyword){
    return this.apiClient.search({
        params:{
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: keyword
      }}

    )
      .then((res)=>res.data.items)
      .then(items=>items.map(item=>({...item, id: item.id.videoId})));
    }
    async #mostPopular(){
        return this.apiClient.videos(
            {params:{
                part: 'snippet',
                maxResults: 25,
                chart: 'mostPopular',
              }}
        )
        .then((res)=>res.data.items);
      }
  }
