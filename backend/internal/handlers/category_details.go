package handlers

import (
	"context"
	"net/http"
	"webcode/internal/db"

	"github.com/gin-gonic/gin"
)

func GetCategoryDetails(c *gin.Context) {
	id := c.Param("id")

	// Получаем курсы
	coursesRows, err := db.DB.Query(context.Background(),
		"SELECT id, title, description, level, price FROM courses WHERE category_id = $1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения курсов"})
		return
	}
	defer coursesRows.Close()

	courses := []map[string]interface{}{}
	for coursesRows.Next() {
		var course map[string]interface{} = make(map[string]interface{})
		var title, description, level string
		var id int
		var price float64
		coursesRows.Scan(&id, &title, &description, &level, &price)
		course["id"] = id
		course["title"] = title
		course["description"] = description
		course["level"] = level
		course["price"] = price
		courses = append(courses, course)
	}

	// Получаем услуги
	servicesRows, err := db.DB.Query(context.Background(),
		"SELECT id, title, description FROM services WHERE category_id = $1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения услуг"})
		return
	}
	defer servicesRows.Close()

	services := []map[string]interface{}{}
	for servicesRows.Next() {
		var service map[string]interface{} = make(map[string]interface{})
		var id int
		var title, description string
		servicesRows.Scan(&id, &title, &description)
		service["id"] = id
		service["title"] = title
		service["description"] = description
		services = append(services, service)
	}

	c.JSON(http.StatusOK, gin.H{
		"courses":  courses,
		"services": services,
	})
}
