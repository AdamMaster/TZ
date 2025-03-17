import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import s from './payment-credits.module.css'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentCreditsFormValues, paymentCreditsSchema } from './payment-credits-schema'
import { Button, Field, GroupVariants, TextButton } from '@/components/ui'
import { Variant } from '@/components/ui/group-variants/group-variants'

interface Props {
  className?: string
}

export const PaymentCredits: React.FC<Props> = ({ className }) => {
  const [monthsValue, setMonthsValue] = useState('12')
  const [periodValue, setPeriodValue] = useState('в месяц')
  const [isShowResult, setIsShowResult] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const form = useForm<PaymentCreditsFormValues>({
    resolver: zodResolver(paymentCreditsSchema),
    defaultValues: {
      sum: ''
    }
  })

  const sumValue = form.watch('sum')

  const onSubmit = async (data: PaymentCreditsFormValues) => {}

  const MonthsData: Variant[] = [
    { id: 1, value: '12' },
    { id: 2, value: '24' },
    { id: 3, value: '36' },
    { id: 4, value: '48' }
  ]
  const PeriodData: Variant[] = [
    { id: 1, value: 'в год' },
    { id: 2, value: 'в месяц' }
  ]

  const onClickMonthItem = (value: string) => {
    setMonthsValue(value)
  }
  const onClickPeriodItem = (value: string) => {
    setPeriodValue(value)
  }

  const onClickCalculate = () => {
    const sum = Number(sumValue)
    const months = Number(monthsValue)

    if (!sum || !months) {
      setResult(null)
      return
    }

    const monthlyPayment = sum / months

    if (periodValue === 'в год') {
      setResult(monthlyPayment * 12)
    } else {
      setResult(monthlyPayment)
      console.log(monthlyPayment.toString().split('.')[0])
    }
  }

  useEffect(() => {
    if (!sumValue || !monthsValue) {
      setResult(null)
      return
    }

    const sum = Number(sumValue)
    const months = Number(monthsValue)
    const monthlyPayment = sum / months

    setResult(periodValue === 'в год' ? monthlyPayment * 12 : monthlyPayment)
  }, [monthsValue, periodValue])

  return (
    <div className={clsx(className, s.wrapper)}>
      <h2 className={s.title}>Платежи по кредиту</h2>
      <p className={s.text}>
        Введите сумму кредита и выберите срок, на который вы хотите его оформить. <br />
        Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы вы могли лучше спланировать свои финансы.
      </p>
      <FormProvider {...form}>
        <form className={s.form} onSubmit={form.handleSubmit(onSubmit)}>
          <div className={s.creditSum}>
            <div className={s.subtitle}>Ваша сумма кредита </div>
            <Field
              className={s.field}
              name='sum'
              placeholder='Введите данные'
              onInput={e => {
                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
              }}
            />
          </div>
          <TextButton className={s.calculate} onClick={() => onClickCalculate()} type='submit'>
            Рассчитать
          </TextButton>
          <div className={s.monthQuantity}>
            <div className={s.subtitle}>Количество месяцев?</div>
            <GroupVariants
              className={s.monthsButtons}
              items={MonthsData}
              mode='circle'
              value={monthsValue}
              onClick={value => onClickMonthItem(value)}
            />
          </div>
          {result && (
            <div className={s.result}>
              <div className={s.subtitle}>Итого ваш платеж по кредиту:</div>
              <GroupVariants
                className={s.periodButtons}
                items={PeriodData}
                mode='default'
                value={periodValue}
                onClick={value => onClickPeriodItem(value)}
              />
              <div className={s.resultSum}>{result.toString().split('.')[0]} рублей</div>
            </div>
          )}

          <Button className={s.button}>Добавить</Button>
        </form>
      </FormProvider>
    </div>
  )
}
