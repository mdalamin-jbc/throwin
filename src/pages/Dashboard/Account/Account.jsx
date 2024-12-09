const Account = () => {
  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">アカウント</h2>
      <div className="bg-white mt-[27px] rounded-xl">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px] ">
          チーム（店舗）リスト
        </h4>
        <div className="border-b-[4px] mx-5"></div>
        <div className="mt-[22px] mx-[33px]">
          <button className="bg-[#49BBDF] text-white">新規作成</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
