
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
  export interface MeetingData {
    _id: string;
    date: string;
    time: string;
    meetingUrl: string;
    title: string;
    duration: number;
    meetingId: string;
    email: string[]; // Array of emails
    __v: number;
  }

  export interface MeetingData {
    title: string;
    date: string;
    time: string;
    duration: number;
    meetingUrl: string;
  }
  