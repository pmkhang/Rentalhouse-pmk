/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, memo } from 'react';
import Button from '../../components/Button';

const ListItem = lazy(() => import('../../components/ListItem'));

const List = ({ posts, sort, setSort }) => {
  return (
    <div className="w-full">
      {posts.length > 0 && (
        <>
          <div className="flex items-center justify-between mb:flex-col mb:items-start">
            <h3 className="text-xl font-semibold">Danh sách tin đăng</h3>
            <span>Cập nhật: 12:05 25/08/2023</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[13.3px]">Sắp xếp: </span>
            <Button
              text="Mặc định"
              className={`py-[3px] px-2 bg-gray-200 focus:ring-gray-100 ${sort === 0 && 'bg-slate-400 text-white'}`}
              textStyle={'text-[13.3px]'}
              onClick={() => setSort(0)}
            />
            <Button
              text="Mới nhất"
              className={`py-[3px] px-2 bg-gray-200 focus:ring-gray-100 ${sort === 1 && 'bg-slate-400 text-white'}`}
              textStyle={'text-[13.3px]'}
              onClick={() => setSort(1)}
            />
          </div>
        </>
      )}
      {posts.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <h3 className="text-lg font-semibold">Không có kết quả tìm kiếm !</h3>
        </div>
      )}
      {posts.length > 0 && (
        <div className="flex flex-col gap-1 mt-5">
          {posts?.map((item) => (
            <Suspense
              fallback={
                <div
                  role="status"
                  className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                >
                  <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4" />
                    <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full max-w-[360px]" />
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              }
              key={item?.id}
            >
              <ListItem
                id={item?.id}
                address={item?.labels.value}
                attributes={item?.attributes}
                desc={JSON.parse(item?.desc)}
                images={JSON.parse(item?.images?.image)}
                star={item?.star}
                title={item?.title}
                users={item?.users}
              />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(List);
