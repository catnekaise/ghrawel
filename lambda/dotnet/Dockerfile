ARG IMAGE_TAG="latest-x86_64"

FROM public.ecr.aws/sam/build-dotnet8:${IMAGE_TAG}

ARG ARCH="linux-x64"
ARG GIT_REPO="https://github.com/catnekaise/ghrawel-tokenprovider-lambda-dotnet.git"
ARG GIT_CHECKOUT="main"

WORKDIR /var/task

RUN git clone $GIT_REPO repo && cd ./repo && git checkout $GIT_CHECKOUT

WORKDIR /var/task/build

RUN mkdir -p ./Catnekaise.Ghrawel.TokenProvider
RUN cp ../repo/Catnekaise.Ghrawel.TokenProvider/Catnekaise.Ghrawel.TokenProvider.csproj ./Catnekaise.Ghrawel.TokenProvider/
RUN dotnet restore --runtime ${ARCH} ./Catnekaise.Ghrawel.TokenProvider/

RUN cp -r ../repo/Catnekaise.Ghrawel.TokenProvider/. ./Catnekaise.Ghrawel.TokenProvider/

RUN dotnet publish ./Catnekaise.Ghrawel.TokenProvider/ \
    --no-restore --configuration Release --framework net8.0 \
    --runtime ${ARCH} \
    -o /asset /p:SelfContained=true /p:GenerateRuntimeConfigurationFiles=true
