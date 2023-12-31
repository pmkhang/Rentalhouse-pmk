
import { useEffect } from 'react';
import Rental from './Rental';

const RentMotel = () => {
  useEffect(() => {
    document.title = 'Cho thuê phòng trọ';
  }, []);
  return (
    <Rental
      // rentPosts
      // count
      title={'Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2023'}
      desc={
        'Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2023. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.'
      }
    />
  );
};

export default RentMotel;
