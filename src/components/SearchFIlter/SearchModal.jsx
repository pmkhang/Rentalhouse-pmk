import React, { memo, useEffect, useMemo, useState } from 'react';
import icons from '../../utils/icons';
import Input from '../Input';
import Button from '../Button';

const { FaTimes } = icons;

const SearchModal = ({
  setShowModal,
  content,
  title,
  name,
  setTextBtn,
  setTextBtn1,
  setTextPrice,
  setTextAcreage,
  setQueries,
}) => {
  const [persent1, setPersent1] = useState(0);
  const [persent2, setPersent2] = useState(100);
  const [text, setText] = useState();

  useEffect(() => {
    if (name === 'priceCode' || name === 'acreageCode') {
      const activeTrack = document.getElementById('track-active');
      const leftPercent = Math.min(persent1, persent2);
      const rightPercent = Math.max(persent1, persent2);

      activeTrack.style.left = `${leftPercent}%`;
      activeTrack.style.right = `${100 - rightPercent}%`;
    }
  }, [name, persent1, persent2]);

  const handleClickStack = (e) => {
    e.stopPropagation();
    if (name === 'priceCode' || name === 'acreageCode') {
      const stack = document.getElementById('track');
      const stackRect = stack?.getBoundingClientRect();
      const percent = ((e.clientX - stackRect.left) * 100) / stackRect.width;
      if (Math.abs(percent - persent1) <= Math.abs(percent - persent2)) {
        setPersent1(percent);
      } else {
        setPersent2(percent);
      }
    }
  };

  const roundValue = useMemo(
    () => (value) => {
      const roundedValue = Math.floor(value);
      if (value - roundedValue >= 0.75) {
        return roundedValue + 1;
      } else if (value - roundedValue >= 0.25) {
        return roundedValue + 0.5;
      } else {
        return roundedValue;
      }
    },
    [],
  );

  const value1 = roundValue(Math.min(persent1, persent2));
  const value2 = roundValue(Math.max(persent1, persent2));

  const convert100toTarget = (number) => {
    const target = name === 'priceCode' ? 1.5 : name === 'acreageCode' ? 9 : 1;
    return Math.floor((Math.ceil(Math.round(number * target) / 5) * 5) / 10);
  };

  const convertTargetto100 = (number) => {
    const target = name === 'priceCode' ? 15 : name === 'acreageCode' ? 90 : 1;
    return (number * 100) / target;
  };

  const getNumbers = (string) => {
    return string
      .split(' ')
      .map((item) => parseFloat(item))
      .filter((value) => !isNaN(value));
  };

  const handlePrice = (value) => {
    const numbers = getNumbers(value);
    const [convertedValue1, convertedValue2] = [convertTargetto100(numbers[0]), convertTargetto100(numbers[1])];
    if (convertTargetto100(numbers[0]) === 100) {
      setPersent1(convertTargetto100(numbers[0]));
      setPersent2(convertTargetto100(numbers[0]));
    } else {
      setPersent1(isNaN(convertedValue1) ? 0 : convertedValue1);
      setPersent2(isNaN(convertedValue2) ? 0 : convertedValue2);
    }
  };
  const handleSubmit = (e, code) => {
    e.stopPropagation();
    if (name === 'categoryCode' || name === 'provinceCode') {
      if (name === 'categoryCode') {
        setTextBtn(text);
      } else {
        setTextBtn1(text);
      }
    } else {
      if (name === 'priceCode') {
        if (convert100toTarget(value1) === 15 && convert100toTarget(value2) === 15) {
          setTextPrice('Giá trên 15 triệu');
        } else if (convert100toTarget(value1) === 0 && convert100toTarget(value2) === 1) {
          setTextPrice('Giá dưới 1 triệu');
        } else {
          setTextPrice(`Giá từ ${convert100toTarget(persent1)} - ${convert100toTarget(persent2)} triệu`);
        }
      } else {
        if (convert100toTarget(value1) === 90 && convert100toTarget(value2) === 90) {
          setTextAcreage('Diện tích trên 90 m²');
        } else if (convert100toTarget(value1) === 0 && convert100toTarget(value2) === 20) {
          setTextAcreage('Diện tích dưới 20 m²');
        } else {
          setTextAcreage(`Diện tích từ ${convert100toTarget(persent1)} - ${convert100toTarget(persent2)} m²`);
        }
      }
    }
    setShowModal(false);
  };

  return (
    <div
      onClick={(e) => {
        setShowModal(false);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        className="max-w-[700px] w-full px-5"
      >
        <div className="w-full h-fit flex flex-col bg-white p-5  rounded-lg shadow-lg">
          <div className="h-[45px] w-full flex items-center justify-between border-b border-gray-300 pb-4">
            <span></span>
            <h3 className="ml-4 text-lg font-semibold">{title}</h3>
            <FaTimes
              size={24}
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
              className="cursor-pointer"
            />
          </div>
          {(name === 'categoryCode' || name === 'provinceCode') && (
            <div className="p-4 flex flex-col w-full gap-4">
              {content?.map((i) => (
                <Input
                  className={'w-full border-b border-gray-300 pb-3 cursor-pointer'}
                  key={i?.code}
                  value={i?.code}
                  type="radio"
                  label={i?.value}
                  id={i?.code}
                  name={name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setText(i?.value);
                    setQueries((prev) => ({ ...prev, [name]: i?.code }));
                  }}
                />
              ))}
              <Button
                text="Áp dụng"
                className={'bg-orange-500 hover:bg-orange-400 focus:ring-orange-200'}
                textStyle={'text-white'}
                onClick={handleSubmit}
              />
            </div>
          )}
          {(name === 'priceCode' || name === 'acreageCode') && (
            <div className="w-full p-4">
              <div className="w-full flex items-center gap-3 justify-center text-xl font-medium text-orange-600">
                {name === 'priceCode' && (
                  <>
                    {convert100toTarget(value1) === 15 && convert100toTarget(value2) === 15 ? (
                      <span className="">Trên 15 triệu</span>
                    ) : (
                      <>
                        <span className="flex w-[80px] mr-[-30px]"> {`Từ ${convert100toTarget(value1)}`}</span> -
                        <span className="flex w-[100px] mr-[-50px]">{`${convert100toTarget(value2)} triệu`}</span>
                      </>
                    )}
                  </>
                )}
                {name === 'acreageCode' && (
                  <>
                    {convert100toTarget(value1) === 90 && convert100toTarget(value2) === 90 ? (
                      <span className="">Trên 90 m²</span>
                    ) : (
                      <>
                        <span className="flex w-[80px] mr-[-30px]"> {`Từ ${convert100toTarget(value1)}`}</span> -
                        <span className="flex w-[100px] mr-[-50px]">{`${convert100toTarget(value2)} m²`}</span>
                      </>
                    )}
                  </>
                )}
              </div>
              {name === 'priceCode' && (
                <>
                  <div className="w-full relative flex flex-col items-center justify-center mt-4">
                    <input
                      type="range"
                      max="100"
                      min="0"
                      step="1"
                      value={persent1}
                      onChange={(e) => {
                        e.stopPropagation();
                        setPersent1(e.target.value);
                      }}
                      className={'w-full appearance-none pointer-events-none absolute top-0 bottom-0 z-20 '}
                    />
                    <input
                      type="range"
                      max="100"
                      min="0"
                      step="1"
                      value={persent2}
                      onChange={(e) => {
                        e.stopPropagation();
                        setPersent2(e.target.value);
                      }}
                      className={'w-full appearance-none pointer-events-none absolute top-0 bottom-0 z-20'}
                    />
                    <div
                      className="slider-track h-[5px] rounded-lg bg-gray-200 w-full absolute top-0 bottom-0 z-10 py-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickStack(e);
                      }}
                      id="track"
                    ></div>
                    <div
                      id="track-active"
                      className="slider-track-active h-[5px] rounded-lg bg-orange-400 absolute top-0 bottom-0 z-10 py-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickStack(e);
                      }}
                    ></div>
                  </div>
                  <div className="w-full mt-6 flex items-center justify-between px-1">
                    <span className="cursor-pointer" onClick={() => setPersent1(0)}>
                      0
                    </span>
                    <span className="cursor-pointer" onClick={() => setPersent2(100)}>
                      15 triệu +
                    </span>
                  </div>
                </>
              )}
              {name === 'acreageCode' && (
                <>
                  <div className="w-full relative flex flex-col items-center justify-center mt-4">
                    <input
                      type="range"
                      max="100"
                      min="0"
                      step="1"
                      value={persent1}
                      onChange={(e) => {
                        e.stopPropagation();
                        setPersent1(e.target.value);
                      }}
                      className={'w-full appearance-none pointer-events-none absolute top-0 bottom-0 z-20 '}
                    />
                    <input
                      type="range"
                      max="100"
                      min="0"
                      step="1"
                      value={persent2}
                      onChange={(e) => {
                        e.stopPropagation();
                        setPersent2(e.target.value);
                      }}
                      className={'w-full appearance-none pointer-events-none absolute top-0 bottom-0 z-20'}
                    />
                    <div
                      className="slider-track h-[5px] rounded-lg bg-gray-200 w-full absolute top-0 bottom-0 z-10 py-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickStack(e);
                      }}
                      id="track"
                    ></div>
                    <div
                      id="track-active"
                      className="slider-track-active h-[5px] rounded-lg bg-orange-400 absolute top-0 bottom-0 z-10 py-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickStack(e);
                      }}
                    ></div>
                  </div>
                  <div className="w-full mt-6 flex items-center justify-between px-1">
                    <span className="cursor-pointer" onClick={() => setPersent1(0)}>
                      0 m²
                    </span>
                    <span className="cursor-pointer" onClick={() => setPersent2(100)}>
                      90 m²
                    </span>
                  </div>
                </>
              )}
              <div className="w-full flex flex-col gap-3 mt-5">
                <h3 className="text-lg font-medium">Chọn nhanh :</h3>
                <div className="w-full flex flex-wrap gap-1">
                  {content?.map((i) => (
                    <button
                      key={i?.code}
                      className="bg-blue-500 px-4 py-1 text-white text-md rounded-md cursor-pointer hover:bg-blue-400 focus:bg-orange-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrice(i?.value);
                        setQueries((prev) => ({ ...prev, [name]: i?.code }));
                      }}
                    >
                      {i?.value}
                    </button>
                  ))}
                </div>
                <Button
                  text="Áp dụng"
                  fullWidth
                  className="mt-8 bg-orange-500 hover:bg-orange-400 focus:ring-orange-300"
                  textStyle={'text-white uppercase'}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SearchModal);
