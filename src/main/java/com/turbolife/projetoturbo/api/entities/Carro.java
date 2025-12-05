package com.turbolife.projetoturbo.api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "tb_carros")
public class Carro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O modelo é obrigatório")
    @Column(nullable = false)
    private String modelo;
    
    private String porte;

    @Min(value = 1886, message = "O ano deve ser posterior a 1886")
    private Integer anoLancamento;
    
    @NotBlank(message = "A descrição é obrigatória")
    @Column(nullable = false)
    private String descricao;
    
    @Column(name = "capa_url")
    private String capaUrl;
    
    // Relacionamento ManyToOne
    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;


    public Carro() {}

    public Carro(Long id, String modelo, String porte, Integer anoLancamento, String descricao, String capaUrl) {
        this.id = id;
        this.modelo = modelo;
        this.porte = porte;
        this.anoLancamento = anoLancamento;
        this.descricao = descricao;
        this.capaUrl = capaUrl;
 
    }

    // Getters e Setters
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}
	
	public String getPorte() {
		return porte;
	}
	
	public void setPorte(String porte) {
		this.porte = porte;
	}

	public Integer getAnoLancamento() {
		return anoLancamento;
	}

	public void setAnoLancamento(Integer anoLancamento) {
		this.anoLancamento = anoLancamento;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	public String getCapaUrl() {
		return capaUrl;
	}
	
	public void setCapaUrl(String capaUrl) {
		this.capaUrl = capaUrl;
	}
    
    
}
