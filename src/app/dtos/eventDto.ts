import {FestivalDto} from "./festivalDto";
import {LocationDto} from "./locationDto";

export class EventDto {
  id: number = null;
  name: string = null;
  startDate: Date = null;
  festivalDto: FestivalDto = null;
  roomDto: LocationDto = null;
};

// export interface PagableEventDto{
//   content: EventDto[]
// }

export class PageableEventDto {
  eventDtoList: EventDto[]=null;
  first: boolean=null;
  last: boolean=null;
};
  // private List<EventDto> eventDtoList;
  // private boolean last;
  // private boolean first;
