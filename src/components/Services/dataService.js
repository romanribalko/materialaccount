import axios from 'axios'
import moment from 'moment';

import httpTarasLine from "./http-commonTarasLine";

//-------------------------------------
  const getAllLogs = () => {
    //debugger
    return httpTarasLine.get("/logs");
  };

  const getLogsListByDate = (dateFrom, dateTo) => {
    //debugger
    let dateDateFrom = moment(dateFrom).format("YYYY/MM/DD")
    let dateDateTo = moment(dateTo).format("YYYY/MM/DD")

    return httpTarasLine.get(`/logs/byDate?datefrom=${dateDateFrom}&dateto=${dateDateTo}`);      
  };

  //for charts:
  const getVolumeByDay = (dateFrom, dateTo) => {
    //debugger
    let dateDateFrom = moment(dateFrom).format("YYYY/MM/DD")
    let dateDateTo = moment(dateTo).format("YYYY/MM/DD")

    return httpTarasLine.get(`/volumebyday/byDate?datefrom=${dateDateFrom}&dateto=${dateDateTo}`);      
  };
  
  const getLengthSumByHour = dateFrom => {
    let dateDateFrom = moment(dateFrom).format("YYYY/MM/DD")    
    return httpTarasLine.get(`/LengthSumByHour/byDate?date=${dateDateFrom}`);      
  }

  const getVolumeByHour = dateFrom => {
    let dateDateFrom = moment(dateFrom).format("YYYY/MM/DD")    
    return httpTarasLine.get(`/VolumeByHour/byDate?date=${dateDateFrom}`);      
  }
  
  const getLogCountByDiam = dateFrom => {
    let dateDateFrom = moment(dateFrom).format("YYYY/MM/DD")  
    return httpTarasLine.get(`/LogCountByDiamDay/byDate?date=${dateDateFrom}`);      
  }
  
  //for zaru atskaite
  //2021/01/07
  const getVolumePocketByDate = (dateFrom, dateTo) => {
    //debugger
    let dateDateFrom = moment(dateFrom).format("YYYY/MM/DD")
    let dateDateTo = moment(dateTo).format("YYYY/MM/DD")

    return httpTarasLine.get(`/VolumePocketByDate/byDate?datefrom=${dateDateFrom}&dateto=${dateDateTo}`);      
  };
  //2021/02/01
  const getLogPartsByDate = (dateFrom, dateTo) => {
    //debugger
    let dateDateFrom = moment(dateFrom).format("YYYY/MM/DD")
    let dateDateTo = moment(dateTo).format("YYYY/MM/DD")

    return httpTarasLine.get(`/LogParts/byDate?datefrom=${dateDateFrom}&dateto=${dateDateTo}`);      
  };
  

  //not need
  const getVolumeDiamByHour = date => {
    return httpTarasLine.get(`/VolumeByDiamByHour/byDate?date=${date}`);      
  }
  
  /*
    const get = id => {
    return http.get(`/tutorials/${id}`);
  };
 
 
  const update = (num, data) => {
    return http.put(`/Packs/${num}`, data);
  };
  

  const remove = id => {
    return http.delete(`/tutorials/${id}`);
  };
  
  const removeAll = () => {
    return http.delete(`/tutorials`);
  };
  
  const findByName = title => {
    return http.get(`/tutorials?title=${title}`);
  };

  */
 //-------------------------------------
  
  export default {
    getAllLogs,
    getVolumeByDay,
    getLengthSumByHour,
    getVolumeByHour,
    getLogCountByDiam,
    getVolumePocketByDate,
    getLogsListByDate,
    getLogPartsByDate,
    
  };
