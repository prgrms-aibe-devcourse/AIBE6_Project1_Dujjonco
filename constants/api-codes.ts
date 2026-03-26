export enum AreaCode {
    SEOUL = '1',
    INCHEON = '2',
    DAEJEON = '3',
    DAEGU = '4',
    GWANGJU = '5',
    BUSAN = '6',
    ULSAN = '7',
    SEJONG = '8',
    GYEONGGI = '31',
    GANGWON = '32',
    CHUNGBUK = '33',
    CHUNGNAM = '34',
    GYEONGBUK = '35',
    GYEONGNAM = '36',
    JEONBUK = '37',
    JEONNAM = '38',
    JEJU = '39',
}

export enum ContentType {
    TOURISM = '12',
    LODGING = '32',
    RESTAURANT = '39',
}

/* 
   import { AreaCode, ContentType } from '../constants/api-codes';

    const areaCodes = [AreaCode.SEOUL, AreaCode.GYEONGGI];
    const contentTypes = [ContentType.TOURISM, ContentType.LODGING, ContentType.RESTAURANT];

    // 사용 예시
    const url = `...&areaCode=${AreaCode.SEOUL}&contentTypeId=${ContentType.TOURISM}`;
*/
