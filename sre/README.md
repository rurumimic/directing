# SRE

안전하게 자주 배포하고, 실패하면 빨리 복구하고, 같은 실수를 반복하지 않는 운영 체계를 만든다.

## Why

장애 건수(raw incident count)를 지표로 삼으면 [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law)의 함정에 빠진다.
측정 자체가 목표가 되면, 장애를 숨기거나 분류 기준을 조작하게 된다.

대신 **배포 안정성**과 **복구 능력**을 다각도로 측정한다.

## Metrics

ref: [DORA Metrics](https://dora.dev/guides/dora-metrics/)

### Throughput

얼마나 빠르게 변경을 전달하는가.

| Metric | 설명 |
|---|---|
| Change Lead Time | 코드 커밋부터 프로덕션 배포까지 걸리는 시간 |
| Deployment Frequency | 얼마나 자주 프로덕션에 배포하는가 |
| Failed Deployment Recovery Time | 실패한 배포를 복구하는 데 걸리는 시간 |

### Instability

배포가 얼마나 불안정한가.

| Metric | 설명 |
|---|---|
| Change Failure Rate | 배포 중 장애를 유발한 비율 |
| Deployment Rework Rate | 배포 후 재작업이 필요한 비율 |
