import PartnershipSection from '@/components/partnership/PartnershipSection';
import img from '@/utils/img';
import Image from 'next/image';

type Props = {};

const lis_1 = [
  '일회성 거래관계보다는 장기적인 파트너십을 원합니다. 역자를 구하기 어려운 흔치 않은 분야의 책이 있을 경우에만 연락을 하신다든지, 급한 일정의 책, 혹은 대역이나 리뷰만 맡기시려는 편집자 분들은 정중히 사양합니다. 바른번역 회원들에게 개별 연락해서 개인적인 계약체결을 제안하신다든지, 다른 계약 건을 당근으로 제시하면서 추가 요구를 하시는 행동도 바른번역의 운영을 어렵게 합니다.',
  '바른번역이 번역의 질을 계속 높여나가고 책임 있는 관리와 운영을 해나가기 위해서는 편집자분들의 협력이 필수적입니다. 그리고 그것이 협소한 국내시장에서 출판사와 번역가가 모두 살 수 있는 길이라 생각합니다.',
  '바른번역은 거래 출판사의 성공을 위해서 좋은 번역과 리뷰, 그리고 성실한 납기관리로 보답하겠습니다. 편집자 여러분께서도 단기적인 이해관계를 떠나서 장기적인 협력을 해 나가는 파트너가 되어 주십시오.',
];

const lis_2 = [
  '바른번역은 출판사와 마찬가지로 회원 번역가분들께도 장기적인 파트너십을 원합니다. 단기간 거쳐 갈 곳으로 여기신다든지, 작은 이익에 몰두해 조직 전체의 운영에 도움이 되지 않는 행동을 하시는 분은 정중히 사양합니다. 장기적인 파트너십을 위해 회원들의 가입년수와 공헌에 따라 회원 번역가분들이 누릴 수 있는 권리와 혜택이 차등 적용되고 있습니다.',
  '대한민국에서 번역가로 산다는 일, 결코 만만하지 않습니다. 때로는 부당한 요구에 낙담할 때도 있고, 을의 입장에서 속상한 일도 있습니다. 때문에 번역가의 정당한 권리를 찾기 위해 싸워야 하고, 바른번역에서도 함께 노력하고 있습니다. 하지만 다른 한편으로 출판번역의 수준 향상을 위해 부단히 노력해야 합니다. 편집자는 까다로운 적이 아니라 함께 잘되어야 할 공동운명체입니다. 번역의 품질과 납기 등 기본적인 의무를 철저히 이행하는 동시에 자기계발에도 힘써 주시기 바랍니다.',
  '바른번역도 열심히 돕겠습니다.',
];
export default function page({}: Props) {
  return (
    <section className='w-full flex flex-col items-center justify-center bg-slate-100 pb-20'>
      <div className='flex items-center justify-center mb-10'>
        <Image src={img.bgPatter} alt='bgImage' />
        <h1 className='absolute text-white text-4xl'>
          바른번역이 원하는 파트너십
        </h1>
      </div>

      <PartnershipSection
        title='바른번역이 원하는 파트너십'
        to='편집자님께'
        lis={lis_1}
      />
      <div className='h-[1px] w-full max-w-6xl bg-slate-300 my-10' />
      <PartnershipSection
        title='바른번역이 원하는 파트너십'
        to='번역가님께'
        lis={lis_2}
      />
    </section>
  );
}
