import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {shippingSchema, type ShippingFormValues} from "@/utils/validators";
import useAddressSearch from "@/hooks/useAddressSearch";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import styles from "./CheckoutForm.module.css";

interface CheckoutFormProps {
  onSubmit: (data: ShippingFormValues) => void;
  isLoading: boolean;
}

const CheckoutForm = ({onSubmit, isLoading}: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
  });

  const {openAddressSearch} = useAddressSearch((address) => {
    setValue("address", address, {shouldValidate: true});
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.sectionTitle}>배송 정보</h2>

      <div className={styles.fields}>
        <Input
          label="수령인"
          placeholder="홍길동"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="연락처"
          placeholder="010-1234-5678"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <div className={styles.addressRow}>
          <Input
            label="주소"
            placeholder="서울시 강남구 테헤란로 123"
            error={errors.address?.message}
            {...register("address")}
          />
          <Button label="주소 검색" type="button" onClick={openAddressSearch} />
        </div>
        <Input
          label="상세 주소"
          placeholder="101동 202호"
          error={errors.detailAddress?.message}
          {...register("detailAddress")}
        />
        <Input
          label="배송 메모 (선택)"
          placeholder="문 앞에 놓아주세요"
          error={errors.memo?.message}
          {...register("memo")}
        />
      </div>

      <Button
        label={isLoading ? "주문 처리 중..." : "주문하기"}
        type="submit"
        fullWidth
        isLoading={isLoading}
      />
    </form>
  );
};

export default CheckoutForm;
