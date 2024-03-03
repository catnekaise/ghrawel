FROM public.ecr.aws/sam/build-go1.x:latest

ARG GIT_CHECKOUT="main"
ARG GIT_REPO="https://github.com/catnekaise/ghrawel-tokenprovider-lambda-go.git"

RUN git clone $GIT_REPO repo

WORKDIR /var/task/repo

RUN cd repo && git checkout $GIT_CHECKOUT

COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
ENV GOCACHE=/root/.cache/go-build
RUN --mount=type=cache,target="/root/.cache/go-build" go build -o /asset/bootstrap ./cmd/default
