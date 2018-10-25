package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.web.rest

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper
import com.baomidou.mybatisplus.core.metadata.IPage
import com.baomidou.mybatisplus.extension.plugins.pagination.Page
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.model.<%= entityClass %>
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.service.<%= entityClass %>Service
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

import javax.validation.Valid

/**
 * Rest controller. <%= entityClass %>
 */
@RestController
@RequestMapping("/rpc")
class <%= entityClass %>Resource(private val service: <%= entityClass %>Service) {

    private val log = LoggerFactory.getLogger(javaClass)

    /**
     * Get /<%= tableName %> : Create a new <%= tableName %>
     *
     * @param <%= entityClassCamelCase %> the <%= tableName %> to create
     * @return the ResponseEntity with status 200 (OK) and with body the new <%= entityClassCamelCase %>
     */
    @PostMapping("/<%= tableName %>")
    fun create<%= entityClass %>(@Valid @RequestBody <%= entityClassCamelCase %>: <%= entityClass %>): ResponseEntity<<%= entityClass %>> {
        log.debug("REST request to save <%= entityClass %> : {}", <%= entityClassCamelCase %>)
        service.save(<%= entityClassCamelCase %>)
        return ResponseEntity.ok(<%= entityClassCamelCase %>)
    }

    /**
     * PUT /<%= tableName %> : Updates an existing <%= tableName %>
     *
     * @param <%= entityClassCamelCase %> the <%= tableName %> to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated <%= tableName %>
     */
    @PutMapping("/<%= tableName %>")
    fun update<%= entityClass %>(@Valid @RequestBody <%= entityClassCamelCase %>: <%= entityClass %>): ResponseEntity<<%= entityClass %>> {
        log.debug("REST request to update <%= entityClass %> : {}", <%= entityClassCamelCase %>)
        service.updateById(<%= entityClassCamelCase %>)
        return ResponseEntity.ok(<%= entityClassCamelCase %>)
    }

    /**
     * GET /<%= tableName %> : get all <%= tableName %>.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all <%= tableName %>
     */
    @SuppressWarnings("unchecked")
    @GetMapping("/<%= tableName %>")
    @ApiOperation(value = "get all <%= tableName %>.", response = Page::class)
    fun getAll<%= entityClass %>(@ApiParam pageable: Page<<%= entityClass %>>): ResponseEntity<IPage<<%= entityClass %>>> {
        val wrapper = QueryWrapper<<%= entityClass %>>()
        //TODO add query params or set to null
        val page = service.page(pageable, wrapper)
        return ResponseEntity.ok(page)
    }

    /**
     * GET /<%= tableName %>/info : get the "id" <%= tableName %>
     *
     * @param id the id of the <%= tableName %> to find
     * @return
     */
    @GetMapping("/<%= tableName %>/info")
    @ApiOperation(value = "get the \"id\" <%= tableName %>", response = <%= entityClass %>::class)
    fun get<%= entityClass %>(@RequestParam id: String?): ResponseEntity<<%= entityClass %>> {
        log.debug("REST request to get <%= entityClass %> : {}", id)
        val entity = service.getById(id)
        return ResponseEntity.ok(entity)
    }

    /**
     * DELETE /<%= tableName %> : delete the "id" <%= tableName %>.
     *
     * @param id the id of the <%= tableName %> to delete
     * @return
     */
    @DeleteMapping("/<%= tableName %>")
    fun delete<%= entityClass %>(@RequestParam id: String?) {
        log.debug("REST request to delete <%= entityClass %> : {}", id)
        service.removeById(id)
    }
}
