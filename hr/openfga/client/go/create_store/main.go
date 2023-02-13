package main

import (
	"context"
	"fmt"
	"os"

	_ "github.com/joho/godotenv/autoload"
	openfga "github.com/openfga/go-sdk"
)

func main() {
	configuration, err := openfga.NewConfiguration(openfga.Configuration{
		ApiScheme: os.Getenv("FGA_API_SCHEME"), // optional, defaults to "https"
		ApiHost:   os.Getenv("FGA_API_HOST"),   // required, define without the scheme (e.g. api.openfga.example instead of https://api.openfga.example)
	})

	if err != nil {
		// .. Handle error
	}

	apiClient := openfga.NewAPIClient(configuration)

	store, _, err := apiClient.OpenFgaApi.CreateStore(context.Background()).Body(openfga.CreateStoreRequest{
		Name: "FGA Demo Store",
	}).Execute()
	if err != nil {
		// .. Handle error
	}

	fmt.Printf("storeId %s\n", *store.Id)
}
