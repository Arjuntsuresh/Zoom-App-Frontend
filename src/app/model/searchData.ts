
export interface searchData{
    date:String,
    time:String,
    topic?:String,
    duration?:String
}

export interface loginDetails {
    email:String,
    password:String
}

 export interface DataItem {
    date: string;
    meetingUrl: string;
    time: string;
    title: string;
    _id: string;
    duration:string;
    meetingId:string;
  }