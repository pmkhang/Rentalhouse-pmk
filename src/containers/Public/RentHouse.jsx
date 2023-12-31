
import { useEffect } from 'react';
import Rental from './Rental';

const RentHouse = () => {
  useEffect(() => {
    document.title = 'Cho thuê nhà';
  }, []);
  return (
    <Rental
      // rentPosts
      // count
      title={'Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2023'}
      desc={
        'Cho thuê nhà nguyên căn - Kênh đăng tin cho thuê nhà số 1: giá rẻ, chính chủ, miễn trung gian, đầy đủ tiện nghi, mức giá, diện tích cho thuê khác nhau.'
      }
      
    />
  );
};

export default RentHouse;
