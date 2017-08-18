import { ChampionImage }	from "./champion-image"
import { ChampionInfo }		from "./champion-info"
import { ChampionStats }	from "./champion-stats"

export class Champion {
	version : string; 
	id : string;
	key : number;
	name : string;
	title : string;
	blurb : string;
	info : ChampionInfo;
	image : ChampionImage;
	tags : Array<string>;
	partype : string;
	stats : ChampionStats;
}