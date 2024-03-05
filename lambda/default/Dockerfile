FROM public.ecr.aws/sam/build-go1.x:latest

ARG GIT_REPO="https://github.com/catnekaise/ghrawel-tokenprovider-lambda-go.git"
ARG GIT_CHECKOUT="main"

WORKDIR /var/task

RUN git clone $GIT_REPO repo && cd ./repo && git checkout $GIT_CHECKOUT

WORKDIR /var/task/build

RUN cp ./../repo/go.* .
RUN go mod download

RUN cp -r ./../repo/* .

ARG ARCH="amd64"

ENV GOCACHE=/root/.cache/go-build
RUN --mount=type=cache,target="/root/.cache/go-build" GOOS=linux GOARCH=$ARCH CGO_ENABLED=0 go build -o /asset/bootstrap ./cmd/default
