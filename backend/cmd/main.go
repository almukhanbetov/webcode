package main

import (
	"webcode/internal/db"
	"webcode/internal/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load() // Загрузит .env файл
	db.Connect()    // <-- обязательно ПЕРЕД использованием db.DB
	router := gin.Default()
	router.Use(cors.Default())

	api := router.Group("/api")
	{
		api.GET("/categories/tree", handlers.GetCategoriesTree)
		api.GET("/categories/:id/details", handlers.GetCategoryDetails)
	}

	router.Run(":8080")
}
